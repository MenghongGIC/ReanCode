import { X, Clock, Star, Play, Award, CheckCircle, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Course } from './CourseCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Quiz, type Question } from './Quiz';
import { OnlineCompiler } from './OnlineCompiler';

interface CourseDetailProps {
  course: Course;
  onClose: () => void;
}

export function CourseDetail({ course, onClose }: CourseDetailProps) {
  const { t } = useTranslation();
  const [showTest, setShowTest] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(1);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const modules = [
    { id: 1, title: 'Introduction and Setup', lessons: 5, duration: '45 min', completed: course.progress ? course.progress > 0 : false, videoUrl: 'https://www.youtube.com/embed/23HFxAPyJ9U?list=PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc' },
    { id: 2, title: 'Core Concepts', lessons: 8, duration: '2h 15min', completed: course.progress ? course.progress > 25 : false, videoUrl: 'https://www.youtube.com/embed/23HFxAPyJ9U?list=PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc' },
    { id: 3, title: 'Advanced Techniques', lessons: 10, duration: '3h 30min', completed: course.progress ? course.progress > 50 : false, videoUrl: 'https://www.youtube.com/embed/23HFxAPyJ9U?list=PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc' },
    { id: 4, title: 'Real-World Projects', lessons: 6, duration: '2h', completed: course.progress ? course.progress > 75 : false, videoUrl: 'https://www.youtube.com/embed/23HFxAPyJ9U?list=PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc' },
    { id: 5, title: 'Best Practices', lessons: 4, duration: '1h 20min', completed: course.progress ? course.progress === 100 : false, videoUrl: 'https://www.youtube.com/embed/23HFxAPyJ9U?list=PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc' },
  ];

  const learningOutcomes = [
    'Master the fundamentals and advanced concepts',
    'Build real-world projects from scratch',
    'Understand industry best practices',
    'Gain hands-on experience with practical exercises',
    'Learn debugging and problem-solving techniques',
  ];

  const testQuestions: Question[] = [
    {
      id: 1,
      text: 'What is the primary objective of this course?',
      options: [
        'To teach basic syntax',
        'To build a comprehensive understanding of concepts and applications',
        'To provide certifications',
        'To teach only theory'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: 'Which module covers advanced concepts?',
      options: [
        'Introduction and Setup',
        'Core Concepts',
        'Advanced Techniques',
        'Real-World Projects'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: 'What is emphasized in this course?',
      options: [
        'Theory only',
        'Memorization',
        'Hands-on experience and practical exercises',
        'Speed of learning'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: 'How many modules are in this course?',
      options: [
        '3 modules',
        '4 modules',
        '5 modules',
        '6 modules'
      ],
      correctAnswer: 2
    }
  ];

  const quizQuestions: Question[] = [
    {
      id: 1,
      text: 'What is the foundation of this course?',
      options: [
        'Advanced topics',
        'Fundamentals and concepts',
        'Projects only',
        'Certifications'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: 'How many lessons are in the Introduction and Setup module?',
      options: [
        '3 lessons',
        '5 lessons',
        '7 lessons',
        '10 lessons'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      text: 'What is the purpose of the Real-World Projects module?',
      options: [
        'To test theory knowledge',
        'To apply learned concepts in practical scenarios',
        'To earn certificates',
        'To memorize code'
      ],
      correctAnswer: 1
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white dark:bg-gray-900 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-6 pr-8">
            {/* Two Column Layout: Video + Info */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Left: Video Player */}
              <div className="col-span-2">
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-black mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={modules.find(m => m.id === selectedModuleId)?.videoUrl}
                    title="Course Lesson"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Module Selector */}
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Select a Module to Watch:</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => setSelectedModuleId(module.id)}
                        className={`p-3 rounded-lg text-left transition-colors text-sm ${
                          selectedModuleId === module.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="font-medium">{module.title}</div>
                        <div className="text-xs opacity-75">{module.lessons} lessons</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Course Info */}
              <div className="col-span-1 space-y-4">
                <div>
                  <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">{course.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Play className="w-4 h-4 flex-shrink-0" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 flex-shrink-0 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating} ({course.enrolled})</span>
                  </div>
                </div>

                {course.progress !== undefined && (
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                )}
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="lesson" className="text-xs sm:text-sm">Online Lesson</TabsTrigger>
                <TabsTrigger value="curriculum" className="text-xs sm:text-sm">{t('test.curriculum')}</TabsTrigger>
                <TabsTrigger value="outcomes" className="text-xs sm:text-sm">{t('test.whatYouLearn')}</TabsTrigger>
                <TabsTrigger value="requirements" className="text-xs sm:text-sm">{t('test.requirements')}</TabsTrigger>
              </TabsList>

              <TabsContent value="lesson" className="space-y-3 mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Select a module from the list above to change the video.</p>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-3 mt-4">
                {modules.map((module, index) => (
                  <div 
                    key={module.id} 
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                    onClick={() => setSelectedModuleId(module.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {module.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{module.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <span>{module.lessons} lessons</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="outcomes" className="space-y-3 mt-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="requirements" className="space-y-3 mt-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic understanding of computer fundamentals</span>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Access to a computer with internet connection</span>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Willingness to learn and practice regularly</span>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Bottom Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-3 flex-shrink-0">
          <Button className="w-full" size="lg">
            {course.progress !== undefined ? t('buttons.continueLearning') : t('buttons.enroll')}
          </Button>
          <div className="grid grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowTest(true)}
              className="gap-1"
            >
              📝 Test
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowQuiz(true)}
              className="gap-1"
            >
              ❓ Quiz
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCompiler(true)}
              className="gap-1"
            >
              💻 Code
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>

      {showTest && (
        <Quiz 
          title={t('test.testTitle')}
          questions={testQuestions}
          onClose={() => setShowTest(false)}
        />
      )}

      {showQuiz && (
        <Quiz 
          title={t('test.quizTitle')}
          questions={quizQuestions}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {showCompiler && (
        <OnlineCompiler onClose={() => setShowCompiler(false)} />
      )}
    </div>
  );
}
