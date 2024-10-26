import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import LoginPage from '@/pages/LoginPage';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import NotAuthorizedPage from '@/pages/NotAuthorizedPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import NotificationsProvider from '@/components/NotificationsProvider';
import store from '@/app/store';
import '@/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationsProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index element={<LoginPage />} />
              <Route
                path="subscriptions"
                element={<ProtectedRoute element={<SubscriptionsPage />} />}
              />
              <Route path="not-authorized" element={<NotAuthorizedPage />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </NotificationsProvider>
  </React.StrictMode>,
);
