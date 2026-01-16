import { X, TrendingUp, Calendar, Clock, Award, Target, BookOpen } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface StudyProgressProps {
  onClose: () => void;
  userName: string;
}

export function StudyProgress({ onClose, userName }: StudyProgressProps) {
  // Weekly study data
  const weeklyData = [
    { day: 'Mon', hours: 2.5, completed: 3 },
    { day: 'Tue', hours: 3.2, completed: 4 },
    { day: 'Wed', hours: 1.8, completed: 2 },
    { day: 'Thu', hours: 4.1, completed: 5 },
    { day: 'Fri', hours: 2.9, completed: 3 },
    { day: 'Sat', hours: 5.5, completed: 7 },
    { day: 'Sun', hours: 3.8, completed: 4 },
  ];

  // Monthly progress data
  const monthlyData = [
    { month: 'Jul', courses: 2, hours: 45 },
    { month: 'Aug', courses: 3, hours: 68 },
    { month: 'Sep', courses: 2, hours: 52 },
    { month: 'Oct', courses: 4, hours: 89 },
    { month: 'Nov', courses: 3, hours: 71 },
    { month: 'Dec', courses: 5, hours: 95 },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Programming', value: 35, color: '#3b82f6' },
    { name: 'Database', value: 20, color: '#8b5cf6' },
    { name: 'Frontend', value: 25, color: '#10b981' },
    { name: 'Backend', value: 15, color: '#f59e0b' },
    { name: 'Design', value: 5, color: '#ec4899' },
  ];

  // Current courses progress
  const currentCourses = [
    { title: 'Java Programming', progress: 35, hours: 14, total: 40 },
    { title: 'Database Design', progress: 60, hours: 15, total: 25 },
    { title: 'React Development', progress: 20, hours: 9, total: 45 },
  ];

  const stats = [
    { label: 'Total Learning Hours', value: '124', icon: Clock, color: 'text-blue-600' },
    { label: 'Courses Completed', value: '8', icon: Award, color: 'text-green-600' },
    { label: 'Current Streak', value: '12 days', icon: Target, color: 'text-orange-600' },
    { label: 'Lessons Finished', value: '156', icon: BookOpen, color: 'text-purple-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2>Study Progress Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your learning journey</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-2xl">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Course Progress</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>Hours spent learning this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Distribution</CardTitle>
                    <CardDescription>Time spent by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>6-Month Learning Trend</CardTitle>
                  <CardDescription>Your progress over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Learning Hours"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="courses" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Courses Started"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Courses</CardTitle>
                  <CardDescription>Your active learning paths</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentCourses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4>{course.title}</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {course.hours}h / {course.total}h
                        </span>
                      </div>
                      <Progress value={course.progress} />
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{course.progress}% Complete</span>
                        <span>{course.total - course.hours}h remaining</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your learning milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="bg-blue-600 p-3 rounded-full">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4>Fast Learner</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed 5 lessons in one day</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="bg-green-600 p-3 rounded-full">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4>Consistent Student</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">12 day learning streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="bg-purple-600 p-3 rounded-full">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4>Progress Master</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed 50% of Database Design</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Completion Rate */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Lesson Completion</CardTitle>
                    <CardDescription>Lessons completed each day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Learning Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Insights</CardTitle>
                    <CardDescription>Your study patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm">Most Active Day: <span className="font-medium">Saturday</span></p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">You learn best on weekends</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm">Avg. Session: <span className="font-medium">45 minutes</span></p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Optimal learning duration</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                        <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm">Favorite Topic: <span className="font-medium">Programming</span></p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">35% of total study time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded">
                        <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm">This Month: <span className="font-medium">28 hours</span></p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">On track to meet your goal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <Button onClick={onClose} variant="outline" className="w-full">
            Close Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
