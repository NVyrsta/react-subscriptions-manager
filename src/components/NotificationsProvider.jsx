import React from 'react';
import { NotificationsProvider as ToolpadNotificationsProvider } from '@toolpad/core/useNotifications';

const NotificationsProvider = ({ children }) => {
  return (
    <ToolpadNotificationsProvider>{children}</ToolpadNotificationsProvider>
  );
};

export default NotificationsProvider;
