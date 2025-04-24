# Task Management Application

A modern task management application built with React, TypeScript, and Express.js.

## Features

- Dashboard with task analytics and charts
- Task list with infinite scrolling
- Create, edit, and delete tasks
- Filter and sort tasks
- Dark/Light mode theme
- Toast notifications
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- Recharts for data visualization
- React Router for navigation

### Backend
- Express.js with TypeScript
- RESTful API endpoints
- Mock data for development

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:3001

### Frontend Setup

1. From the project root directory, install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will start on http://localhost:3000

## Project Structure

```
task-management-comet/
├── server/                    # Backend server
│   ├── data/                 # Mock data
│   ├── routes/               # API routes
│   ├── types/                # TypeScript types
│   └── index.ts              # Server entry point
├── src/
│   ├── app/                  # App configuration
│   ├── components/           # React components
│   ├── features/             # Redux slices
│   ├── pages/                # Page components
│   ├── services/             # API services
│   ├── styles/               # Global styles
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions
```

## Available Scripts

In the project directory:

### Frontend Scripts
```bash
npm start          # Start development server
npm test          # Run tests
npm run build     # Build for production
```

### Backend Scripts
```bash
cd server
npm run dev       # Start development server
npm run build     # Build TypeScript
npm start         # Start production server
```

## API Endpoints

- `GET /api/tasks` - Get all tasks (supports pagination)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Features

### Task Management
- Create and manage tasks
- Set priority levels
- Track status
- Assign due dates
- Add estimated hours
- Mark tasks as complete

### Dashboard
- Task completion trends
- Due tasks overview
- Estimation distribution
- Real-time updates

### UI Features
- Dark/Light mode toggle
- Infinite scrolling
- Toast notifications
- Confirmation dialogs
- Loading states
- Error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
