import { useNotifications } from '@toolpad/core/useNotifications';

const useSaveNotification = () => {
  const notifications = useNotifications();

  const showNotification = (status) => {
    if (status === 'fulfilled') {
      notifications.show('Saved successfully!', {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } else {
      notifications.show('Failed to save. Please try again.', {
        severity: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return showNotification;
};

export default useSaveNotification;
