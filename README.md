# Pulse Intelligence Test Task

## Overview

This project is a React application developed for managing subscriptions to Companies and Mines. It includes authentication with JWT, and allows users to easily manage their subscriptions.

## Features

- User Authentication with JWT.
- Subscription management for Companies and Mines.
- Responsive 2-column Multiselect component.
- Toast notifications for user feedback.
- Filtering and sorting capabilities.

## Tech Stack

- React
- Redux Toolkit
- Material-UI
- Axios

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/NVyrsta/react-subscriptions-manager.git
   cd react-subscriptions-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm start
   ```

### API Endpoints

- /auth/token/: Obtain access and refresh tokens.
- /auth/token/refresh/: Refresh expired access tokens.
- /companies/: Fetch all companies.
- /subscriptions/companies/: Manage company subscriptions.
- /mines/: Fetch all mines.
- /subscriptions/mines/: Manage mine subscriptions.

### Authentication Flow

1. Log in with credentials to receive tokens.
2. Use access token for authenticated requests.
3. Refresh tokens when expired.
4. Redirect to login on failure.
