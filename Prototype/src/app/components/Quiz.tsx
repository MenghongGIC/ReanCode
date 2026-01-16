import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  title: string;
  questions: Question[];
  onClose: () => void;
}

export function Quiz({ title, questions, onClose }: QuizProps) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, answerIndex]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setAnswered(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl w-full max-w-2xl">
          <div className="relative flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold">{t('test.viewResults')}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>
                {percentage}%
              </div>
              <h3 className="text-2xl font-semibold">
                {passed ? t('test.resultsPassed') : t('test.resultsFailed')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('test.yourScore')}: {score}/{questions.length}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold mb-4">{t('test.correctAnswers')}</h4>
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded flex items-center justify-center text-white text-sm ${
                      answers[idx] === q.correctAnswer ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {answers[idx] === q.correctAnswer ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{q.text}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Your answer: <span className="font-semibold">{q.options[answers[idx]]}</span>
                      </p>
                      {answers[idx] !== q.correctAnswer && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Correct answer: <span className="font-semibold">{q.options[q.correctAnswer]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRetake} className="flex-1" size="lg">
                {t('buttons.retake')}
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1" size="lg">
                {t('buttons.close')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="relative flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('test.question')} {currentQuestion + 1} {t('test.of')} {questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : answered && index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                  } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : answered && index === question.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedAnswer === index && (
                        <span className="text-white text-sm">
                          {index === question.correctAnswer ? '✓' : '✗'}
                        </span>
                      )}
                      {answered && index === question.correctAnswer && selectedAnswer !== index && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {answered && (
            <div className={`p-3 rounded-lg ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              <p className="text-sm font-medium">
                {selectedAnswer === question.correctAnswer ? '✓ ' + t('test.correct') : '✗ ' + t('test.incorrect')}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            {answered && (
              <Button onClick={handleNext} className="flex-1" size="lg">
                {currentQuestion === questions.length - 1 ? t('test.viewResults') : t('buttons.nextQuestion')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
