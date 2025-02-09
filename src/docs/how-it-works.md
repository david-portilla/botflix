# How it Works

## 1. Architecture and Base Technologies

- React with TypeScript as the main framework
- TanStack Query for data management and caching
- Styled Components and Tailwind CSS for styling
- React Router for navigation
- Jest for testing

## 2. Main Components

### Movie Search

- Implements a traditional search bar that allows searching movies by text
- Uses a custom `useGlobal` hook for global state management

### Chat System

- Integrates Landbot Core for chatbot functionality
- Handles real-time user interactions
- Processes different types of messages (text, buttons, images)

### Movie Management

- Uses TanStack Query for data fetching and caching
- Connects with the TMDB API to obtain movie information

## 3. Global State

Implements a global context to handle:

- Chat state (open/closed)
- Selected emotions
- User input

## 4. Emotion Mapping

- System for mapping between emotions and movie genres
- Converts user emotional responses into specific movie genres

## 5. Styles and UI

- CSS variables system to maintain design consistency
- Dark and light themes
- Responsive design

## 6. Testing

- Unit tests with Jest and Testing Library
- Coverage of main components and utilities

## 7. Project Structure

- Modular organization by features
- Clear separation of shared components
- Reusable utilities and hooks

This architecture allows for a scalable, maintainable application with a clear separation of component responsibilities.
