import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Code, Database, Palette, Monitor, Server, GraduationCap, Trophy, Award, LogOut, X, Settings, ChartBar } from 'lucide-react';
import { CourseCard, Course } from './components/CourseCard';
import { CourseDetail } from './components/CourseDetail';
import { LandingPage } from './components/LandingPage';
import { AuthDialog } from './components/AuthDialog';
import { AccountSettings } from './components/AccountSettings';
import { StudyProgress } from './components/StudyProgress';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { OnlineCompiler } from './components/OnlineCompiler';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

const courses: Course[] = [
  {
    id: '1',
    title: 'Java Programming Masterclass',
    description: 'Master Java from basics to advanced concepts. Learn OOP, data structures, and build real applications.',
    category: 'programming',
    level: 'Beginner',
    duration: '40 hours',
    lessons: 250,
    rating: 4.8,
    enrolled: 15420,
    progress: 35,
    image: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBsYXB0b3B8ZW58MXx8fHwxNzY2MjA0MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'C/C++ Complete Course',
    description: 'Learn C and C++ programming from scratch. Understand memory management, pointers, and system programming.',
    category: 'programming',
    level: 'Intermediate',
    duration: '35 hours',
    lessons: 180,
    rating: 4.7,
    enrolled: 12300,
    image: 'https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjBjb2Rpbmd8ZW58MXx8fHwxNzY2MzAwNzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Database Design & SQL',
    description: 'Master relational databases, SQL queries, normalization, and database optimization techniques.',
    category: 'database',
    level: 'Beginner',
    duration: '25 hours',
    lessons: 120,
    rating: 4.9,
    enrolled: 18500,
    progress: 60,
    image: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHNlcnZlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2MzI4MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'UX/UI Design Fundamentals',
    description: 'Learn user experience and interface design principles. Master Figma and design thinking methodologies.',
    category: 'design',
    level: 'Beginner',
    duration: '30 hours',
    lessons: 150,
    rating: 4.8,
    enrolled: 21000,
    image: 'https://images.unsplash.com/photo-1624225322963-a453470735c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB1aSUyMHV4fGVufDF8fHx8MTc2NjMyODIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Frontend Development with React',
    description: 'Build modern web applications with React, hooks, state management, and component architecture.',
    category: 'frontend',
    level: 'Intermediate',
    duration: '45 hours',
    lessons: 200,
    rating: 4.9,
    enrolled: 25600,
    progress: 20,
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9udGVuZCUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc2NjMyODIwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Backend Development with Node.js',
    description: 'Learn server-side development with Node.js, Express, RESTful APIs, and authentication.',
    category: 'backend',
    level: 'Intermediate',
    duration: '38 hours',
    lessons: 175,
    rating: 4.7,
    enrolled: 19800,
    image: 'https://images.unsplash.com/photo-1641156803026-0b819059b04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyfGVufDF8fHx8MTc2NjMyODIwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'JavaScript ES6+ Modern Development',
    description: 'Master modern JavaScript features, async programming, modules, and best practices.',
    category: 'programming',
    level: 'Intermediate',
    duration: '28 hours',
    lessons: 140,
    rating: 4.8,
    enrolled: 22500,
    image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzY2MzI4MjEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: 'MongoDB & NoSQL Databases',
    description: 'Learn NoSQL database concepts, MongoDB operations, aggregation, and scaling strategies.',
    category: 'database',
    level: 'Intermediate',
    duration: '22 hours',
    lessons: 95,
    rating: 4.6,
    enrolled: 14200,
    image: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHNlcnZlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2MzI4MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    title: 'Vue.js Framework Essentials',
    description: 'Build interactive web apps with Vue.js. Learn components, Vuex, and the Composition API.',
    category: 'frontend',
    level: 'Beginner',
    duration: '32 hours',
    lessons: 160,
    rating: 4.7,
    enrolled: 16700,
    image: 'https://images.unsplash.com/photo-1610986602726-19f650133f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGZyYW1ld29ya3xlbnwxfHx8fDE3NjYzMjgyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '10',
    title: 'Python Backend Development',
    description: 'Learn backend development with Python, Django, Flask, and RESTful API design patterns.',
    category: 'backend',
    level: 'Beginner',
    duration: '42 hours',
    lessons: 210,
    rating: 4.9,
    enrolled: 28900,
    image: 'https://images.unsplash.com/photo-1641156803026-0b819059b04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwc2VydmVyfGVufDF8fHx8MTc2NjMyODIwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '11',
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile apps with React Native. Learn iOS and Android development.',
    category: 'frontend',
    level: 'Advanced',
    duration: '50 hours',
    lessons: 230,
    rating: 4.8,
    enrolled: 17800,
    image: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzMDE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '12',
    title: 'Cloud Computing & AWS',
    description: 'Master cloud infrastructure with AWS. Learn EC2, S3, Lambda, and serverless architecture.',
    category: 'backend',
    level: 'Advanced',
    duration: '48 hours',
    lessons: 195,
    rating: 4.9,
    enrolled: 20500,
    image: 'https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NjYyNTg1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '13',
    title: 'Data Structures & Algorithms',
    description: 'Master essential DSA concepts for coding interviews and efficient problem-solving.',
    category: 'programming',
    level: 'Advanced',
    duration: '55 hours',
    lessons: 280,
    rating: 4.9,
    enrolled: 32100,
    image: 'https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc3RydWN0dXJlcyUyMGFsZ29yaXRobXN8ZW58MXx8fHwxNzY2MjMxMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '14',
    title: 'Software Testing & QA',
    description: 'Learn testing methodologies, automation, unit testing, integration testing, and CI/CD.',
    category: 'programming',
    level: 'Intermediate',
    duration: '26 hours',
    lessons: 115,
    rating: 4.7,
    enrolled: 13400,
    image: 'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMHRlc3Rpbmd8ZW58MXx8fHwxNzY2MzI4MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '15',
    title: 'Advanced UI Design Systems',
    description: 'Create scalable design systems, component libraries, and design tokens for large applications.',
    category: 'design',
    level: 'Advanced',
    duration: '35 hours',
    lessons: 145,
    rating: 4.8,
    enrolled: 15600,
    image: 'https://images.unsplash.com/photo-1624225322963-a453470735c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB1aSUyMHV4fGVufDF8fHx8MTc2NjMyODIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '16',
    title: 'Microsoft Office & Productivity Tools',
    description: 'Master Microsoft Office suite including Excel, Word, PowerPoint, and advanced data analysis.',
    category: 'computer-skill',
    level: 'Beginner',
    duration: '28 hours',
    lessons: 140,
    rating: 4.7,
    enrolled: 24500,
    progress: 45,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNlbCUyMHRhYmxlfGVufDF8fHx8fDE3NjYzMjgyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '17',
    title: 'Digital Marketing & SEO',
    description: 'Learn digital marketing strategies, SEO optimization, social media marketing, and analytics.',
    category: 'computer-skill',
    level: 'Beginner',
    duration: '32 hours',
    lessons: 160,
    rating: 4.8,
    enrolled: 19800,
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2NjMyODIxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '18',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn cybersecurity concepts, threat analysis, encryption, and secure coding practices.',
    category: 'computer-skill',
    level: 'Intermediate',
    duration: '40 hours',
    lessons: 195,
    rating: 4.9,
    enrolled: 18200,
    image: '/images/courses/cyber.jpg',
  },
  {
    id: '19',
    title: 'Network Fundamentals & TCP/IP',
    description: 'Understand networking basics, OSI model, TCP/IP protocols, and network architecture.',
    category: 'network',
    level: 'Beginner',
    duration: '35 hours',
    lessons: 175,
    rating: 4.8,
    enrolled: 16400,
    progress: 22,
    image: '/images/courses/network.jpg',
  },
  {
    id: '20',
    title: 'Cisco CCNA Certification Prep',
    description: 'Prepare for Cisco CCNA exam. Learn routing, switching, network configuration, and troubleshooting.',
    category: 'network',
    level: 'Intermediate',
    duration: '60 hours',
    lessons: 280,
    rating: 4.9,
    enrolled: 12800,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3V0ZXIlMjBuZXR3b3JrfGVufDF8fHx8fDE3NjYzMjgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '21',
    title: 'Network Security & Firewalls',
    description: 'Master network security, firewall configuration, intrusion detection, and security protocols.',
    category: 'network',
    level: 'Advanced',
    duration: '45 hours',
    lessons: 210,
    rating: 4.8,
    enrolled: 11500,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld2FsbCUyMHNoaWVsZHxlbnwxfHx8fDE3NjYzMjgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '22',
    title: 'Linux System Administration',
    description: 'Learn Linux command line, system administration, user management, and server configuration.',
    category: 'computer-skill',
    level: 'Intermediate',
    duration: '38 hours',
    lessons: 185,
    rating: 4.7,
    enrolled: 14300,
    image: 'https://images.unsplash.com/photo-1629654291263-c8255a25f839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW51eCUyMHN5c3RlbXxlbnwxfHx8fDE3NjYzMjgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function App() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showSettings, setShowSettings] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: GraduationCap },
    { id: 'programming', name: 'Programming', icon: Code },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'frontend', name: 'Frontend', icon: Monitor },
    { id: 'backend', name: 'Backend', icon: Server },
    { id: 'computer-skill', name: 'Computer Skill', icon: Monitor },
    { id: 'network', name: 'Network', icon: Server },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const inProgressCourses = courses.filter(course => course.progress !== undefined);

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: GraduationCap },
    { label: 'Active Students', value: '150K+', icon: Trophy },
    { label: 'Certificates Issued', value: '85K+', icon: Award },
  ];

  const handleAuthSuccess = (name: string) => {
    setUserName(name);
    setUserEmail('user@example.com'); // In a real app, this would come from the auth system
    setIsAuthenticated(true);
    setShowAuthDialog(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserName('');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthDialog(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthDialog(true);
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const handleUpdateProfile = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onSignIn={handleSignIn} onSignUp={handleSignUp} />
        {showAuthDialog && (
          <AuthDialog
            mode={authMode}
            onClose={() => setShowAuthDialog(false)}
            onSuccess={handleAuthSuccess}
            onSwitchMode={handleSwitchAuthMode}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                ITLearn Academy
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Master Computer Science & IT Skills</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back,</p>
                <p>{userName}</p>
              </div>
              <ThemeSwitcher />
              <LanguageSwitcher />
              <Button variant="outline" size="icon" onClick={() => setShowCompiler(true)} title="Online Compiler">
                <Code className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setShowProgress(true)} title="Study Progress">
                <ChartBar className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setShowSettings(true)} title="Settings">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t('labels.searchCourses')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <div className="mb-6">
            <h3 className="mb-4">Browse by Category</h3>
            <TabsList className="w-full justify-start flex-wrap h-auto gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="gap-2">
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            {selectedCategory === 'all' && inProgressCourses.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3>Continue Learning</h3>
                  <Badge variant="secondary">{inProgressCourses.length} courses</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onCourseClick={setSelectedCourse} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4 flex items-center justify-between">
              <h3>
                {selectedCategory === 'all' ? 'All Courses' : categories.find(c => c.id === selectedCategory)?.name}
              </h3>
              <Badge variant="secondary">{filteredCourses.length} courses</Badge>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No courses found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} onCourseClick={setSelectedCourse} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {selectedCourse && (
        <CourseDetail course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}

      {showSettings && (
        <AccountSettings
          userName={userName}
          userEmail={userEmail}
          onClose={() => setShowSettings(false)}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {showProgress && (
        <StudyProgress
          onClose={() => setShowProgress(false)}
          userName={userName}
        />
      )}

      {showCompiler && (
        <OnlineCompiler onClose={() => setShowCompiler(false)} />
      )}
    </div>
  );
}