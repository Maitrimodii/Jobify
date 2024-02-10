import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../actions/notificationActions';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  // Function to handle click on the bell icon and clear notifications
  const handleNotificationClick = () => {
    dispatch(clearNotifications()); // Dispatch an action to clear notifications when the bell icon is clicked
  };

  return (
    <div className="relative group">
      {/* Bell Icon */}
      <div className="flex items-center cursor-pointer" onClick={handleNotificationClick}>
        <div className="bell-icon text-white">
          🔔
          {/* Display notification count if there are notifications */}
          {notifications.length > 0 && (
            <span className="notification-count bg-red-500 text-xs text-white px-2 py-1 rounded-full ml-1">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Display Notifications Dropdown if there are notifications */}
      {notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg group-hover:block hidden">
          {/* Mapping through notifications to display each notification */}
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item p-2">
              {notification.message}
              {/* Additional details or actions related to the notification can be added here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
