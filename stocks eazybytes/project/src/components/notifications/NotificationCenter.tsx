import React from 'react';
import { Bell, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'price' | 'news';
  message: string;
  timestamp: Date;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications,
  onDismiss 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <Bell className="text-blue-500" size={20} />
      </div>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className="flex items-start p-3 bg-gray-50 rounded-md"
          >
            {notification.type === 'alert' && (
              <AlertTriangle className="text-yellow-500 mr-2 flex-shrink-0" size={18} />
            )}
            {notification.type === 'price' && (
              <TrendingUp className="text-green-500 mr-2 flex-shrink-0" size={18} />
            )}
            <div className="flex-grow">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <button 
              onClick={() => onDismiss(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};