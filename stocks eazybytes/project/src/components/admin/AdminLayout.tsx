import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Users, LineChart, Bell } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentSection: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentSection }) => {
  const { signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', icon: LineChart, href: '/admin' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Stocks', icon: Bell, href: '/admin/stocks' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LineChart className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)]">
          <nav className="mt-5 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${currentSection === item.name.toLowerCase()
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    currentSection === item.name.toLowerCase()
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};