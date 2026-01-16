import { GraduationCap, Code, Database, Palette, Monitor, Server, Award, Users, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  const features = [
    {
      icon: Code,
      title: 'Programming Languages',
      description: 'Master Java, C/C++, JavaScript, Python and more with hands-on projects'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'Learn SQL, NoSQL, database design and optimization techniques'
    },
    {
      icon: Palette,
      title: 'UX/UI Design',
      description: 'Create beautiful interfaces and exceptional user experiences'
    },
    {
      icon: Monitor,
      title: 'Frontend Development',
      description: 'Build modern web apps with React, Vue.js and latest frameworks'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Develop robust server-side applications and RESTful APIs'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized certificates to boost your career'
    }
  ];

  const stats = [
    { value: '15+', label: 'Expert Courses' },
    { value: '150K+', label: 'Active Students' },
    { value: '85K+', label: 'Certificates' },
    { value: '4.8/5', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">Rean Code</h1>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-gray-900 dark:text-white max-w-3xl mx-auto">
            Learning Computer Science & IT Skills
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of students learning programming, databases, design, and development. 
            Start your journey to becoming an IT professional today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={onSignUp} className="w-full sm:w-auto text-lg px-8 py-6">
              Get Started - Sign Up
            </Button>
            <Button size="lg" variant="outline" onClick={onSignIn} className="w-full sm:w-auto text-lg px-8 py-6">
              Sign In
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-2 text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-center mb-12">What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="mb-2">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h3 className="mb-4 text-white">Ready to Start Your IT Journey?</h3>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join our community of learners and get access to comprehensive courses, 
            expert instructors, and industry-recognized certifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" onClick={onSignUp} className="w-full sm:w-auto text-lg px-8 py-6">
              Create Free Account
            </Button>
            <Button size="lg" variant="outline" onClick={onSignIn} className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              Already have an account?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
