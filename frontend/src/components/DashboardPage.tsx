import { FileCheck, Shield, Clock, TrendingUp } from "lucide-react";

export function DashboardPage() {
  const stats = [
    {
      label: "Files Registered",
      value: "24",
      icon: <FileCheck className="w-6 h-6" />,
      color: "blue"
    },
    {
      label: "Verifications",
      value: "156",
      icon: <Shield className="w-6 h-6" />,
      color: "cyan"
    },
    {
      label: "Success Rate",
      value: "98.7%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "green"
    },
    {
      label: "Last Activity",
      value: "2h ago",
      icon: <Clock className="w-6 h-6" />,
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-['Poppins'] text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
            Overview of your file integrity verification activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Inter'] text-gray-600 dark:text-gray-400 mb-2">
                    {stat.label}
                  </p>
                  <p className="font-['Poppins'] text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-950/50 rounded-lg text-blue-600 dark:text-cyan-400">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center">
          <Shield className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="font-['Poppins'] text-gray-900 dark:text-white mb-2">
            Dashboard Coming Soon
          </h2>
          <p className="font-['Inter'] text-gray-600 dark:text-gray-400">
            Advanced analytics and file management features are under development
          </p>
        </div>
      </div>
    </div>
  );
}
