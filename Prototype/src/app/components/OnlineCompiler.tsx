import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { X, Play, Copy, Check } from 'lucide-react';

// Extend window to include Pyodide and sql.js
declare global {
  interface Window {
    loadPyodide?: () => Promise<any>;
    pyodide?: any;
    initSqlJs?: (config: any) => Promise<any>;
  }
}

interface Language {
  id: number;
  name: string;
  value: string;
}

const LANGUAGES: Language[] = [
  { id: 54, name: 'C++', value: 'cpp' },
  { id: 50, name: 'C', value: 'c' },
  { id: 62, name: 'Java', value: 'java' },
  { id: 71, name: 'Python', value: 'python' },
  { id: 72, name: 'Bash', value: 'bash' },
  { id: 73, name: 'SQL', value: 'sql' },
  { id: 81, name: 'TypeScript', value: 'typescript' },
];

interface OnlineCompilerProps {
  onClose: () => void;
}

export function OnlineCompiler({ onClose }: OnlineCompilerProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState(`print("Hello, World!")\nprint("2 + 2 = ", 2 + 2)`);
  const [selectedLanguage, setSelectedLanguage] = useState('71'); // Python by default
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const getDefaultCode = (langId: string) => {
    const codeExamples: { [key: string]: string } = {
      '54': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      '50': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      '62': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      '71': 'print("Hello, World!")\nprint("2 + 2 = ", 2 + 2)',
      '72': 'echo "Hello, World!"',
      '73': 'CREATE TABLE users (id INTEGER, name TEXT);\nINSERT INTO users VALUES (1, "Alice");\nINSERT INTO users VALUES (2, "Bob");\nSELECT * FROM users;',
      '81': 'console.log("Hello, World!");\nconsole.log("2 + 2 =", 2 + 2);',
    };
    return codeExamples[langId] || code;
  };

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId);
    setCode(getDefaultCode(langId));
    setOutput('');
    setError('');
  };

  const executeCode = async () => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      // For JavaScript/TypeScript, execute directly in browser
      if (selectedLanguage === '81') {
        // TypeScript/JavaScript
        try {
          const logs: string[] = [];
          const originalLog = console.log;
          const originalError = console.error;
          
          console.log = (...args: any[]) => {
            logs.push(args.map(arg => {
              if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
              }
              return String(arg);
            }).join(' '));
            originalLog(...args);
          };
          
          console.error = (...args: any[]) => {
            logs.push('ERROR: ' + args.join(' '));
            originalError(...args);
          };
          
          try {
            // Create an async function and execute the user code
            const fn = new Function('return (async () => { ' + code + ' })()');
            await fn();
            
            if (logs.length === 0) {
              setOutput('(Code executed successfully with no output)');
            } else {
              setOutput(logs.join('\n'));
            }
          } finally {
            console.log = originalLog;
            console.error = originalError;
          }
        } catch (err) {
          setError((err instanceof Error ? err.message : String(err)));
        }
      } else if (selectedLanguage === '71') {
        // Python - execute using Pyodide
        try {
          setOutput('Loading Python environment...');
          
          // Load Pyodide dynamically
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.0/full/pyodide.js';
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Pyodide'));
            document.head.appendChild(script);
          });

          // Initialize Pyodide
          const pyodide = await (window as any).loadPyodide();
          
          // Capture output
          const pythonCode = `
import sys
from io import StringIO

_output = StringIO()
sys.stdout = _output

${code}

output_value = _output.getvalue()
`;

          try {
            await pyodide.runPythonAsync(pythonCode);
            const output = pyodide.globals.get('output_value');
            
            if (output && output.trim()) {
              setOutput(output);
            } else {
              setOutput('(Code executed successfully with no output)');
            }
          } catch (pyErr) {
            throw pyErr;
          }
        } catch (err) {
          setError((err instanceof Error ? err.message : String(err)));
        }
      } else if (selectedLanguage === '73') {
        // SQL - execute using sql.js
        try {
          setOutput('Loading SQL environment...');
          
          // Load sql.js dynamically
          const response = await fetch('https://sql.js.org/dist/sql-wasm.wasm');
          const wasmBinary = await response.arrayBuffer();
          const SQL = await (window as any).initSqlJs({ wasmBinary });
          
          const db = new SQL.Database();
          
          try {
            const statements = code.split(';').filter(s => s.trim());
            const results: string[] = [];
            
            for (const statement of statements) {
              const trimmed = statement.trim();
              if (!trimmed) continue;
              
              try {
                const result = db.exec(trimmed);
                if (result.length > 0) {
                  const columns = result[0].columns;
                  const values = result[0].values;
                  
                  results.push(columns.join(' | '));
                  results.push('-'.repeat(40));
                  values.forEach(row => {
                    results.push(row.join(' | '));
                  });
                  results.push('');
                } else {
                  results.push('Query executed successfully.');
                }
              } catch (sqlErr) {
                results.push(`Error: ${(sqlErr as any).message}`);
              }
            }
            
            if (results.length === 0) {
              setOutput('(No results)');
            } else {
              setOutput(results.join('\n'));
            }
          } finally {
            db.close();
          }
        } catch (err) {
          setError((err instanceof Error ? err.message : String(err)));
        }
      } else {
        // For other languages, show helpful message
        const langName = LANGUAGES.find(l => l.id.toString() === selectedLanguage)?.name || 'This language';
        setError(
          `${langName} requires an API key to run.\n\n` +
          'Supported without API key:\n' +
          '• TypeScript/JavaScript (runs instantly)\n' +
          '• Python (with Pyodide)\n' +
          '• SQL (with sql.js)\n\n' +
          'To run other languages (Java, C++, C, Bash):\n' +
          '1. Get free API key: https://rapidapi.com/judge0-official/api/judge0-ce\n' +
          '2. Create .env.local in Prototype folder\n' +
          '3. Add: VITE_JUDGE0_API_KEY=your_key_here\n' +
          '4. Restart dev server'
        );
      }
    } catch (err) {
      setError('Failed to execute code. ' + (err instanceof Error ? err.message : 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start">
      {/* Left Sidebar - Full Height */}
      <div className="bg-white dark:bg-gray-950 h-full w-full md:w-2/3 lg:w-1/2 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <h2 className="text-2xl font-bold">Online Compiler</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex h-full gap-4 p-6">
            {/* Left: Editor */}
            <div className="flex-1 flex flex-col gap-3 min-h-0">
              <div className="flex items-center gap-2 flex-shrink-0">
                <label className="font-semibold">Language:</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 font-mono text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 resize-none overflow-y-auto"
                placeholder="Enter your code here..."
              />

              <div className="flex gap-2 flex-shrink-0">
                <Button
                  onClick={executeCode}
                  disabled={loading}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <Play className="w-4 h-4" />
                  {loading ? 'Running...' : 'Run Code'}
                </Button>
                <Button
                  onClick={copyCode}
                  variant="outline"
                  className="gap-2"
                  size="lg"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Right: Output */}
            <div className="flex-1 flex flex-col gap-2 min-h-0">
              <label className="font-semibold flex-shrink-0">Output:</label>
              <div
                className={`flex-1 p-4 font-mono text-sm rounded-lg border overflow-y-auto ${
                  error
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
                } whitespace-pre-wrap break-words`}
              >
                {loading && (
                  <div className="text-blue-600 dark:text-blue-400">Compiling and running...</div>
                )}
                {!loading && error && <div>{error}</div>}
                {!loading && !error && output && <div>{output}</div>}
                {!loading && !error && !output && (
                  <div className="text-gray-400">Output will appear here...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
          <Button onClick={onClose} variant="outline" className="w-full" size="lg">
            Close Compiler
          </Button>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="flex-1 h-full cursor-pointer" onClick={onClose} />
    </div>
  );
}
