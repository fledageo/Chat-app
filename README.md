# HI! (chat-app)

## Project Description
"HI!" is a real-time chat application where users can communicate with other registered users. It allows users to see who is currently online and access the history of their conversations.

## Features
- Real-time chat with users.
- Users can sign up and log in using a username and password.
- Authentication is managed through the backend and a database, with a web token stored in cookies.
- Display a list of currently active users.
- Save messages in the database to retain chat history.
- Display messages in chronological order.

## Tech Stack
- TypeScript
- React
- React Hook Form
- React Router
- Redux Toolkit
- Node.js
- Express
- WebSockets
- MongoDB
- Sass

## Setup Instructions

### Prerequisites
- Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) on your machine.

### Installation Steps
1. Navigate to the server folder and install dependencies: cd server , npm install, npm run dev
2. Navigate to the client folder and install dependencies:  cd client , npm install, npm run dev

## Usage
- **User Sign-Up and Log-In**:
- A new user registers with a username and password.
- Logs in with the same credentials to access the chat app.
- **Real-Time Messaging**:
- User1 sends a message: "Hello, User2!"
- User2 immediately sees the message in their chat interface.
- **Active User List**:
- A user logs in and appears in the "Active Users" list.
- When the user logs out, their name disappears from the list.
- **Chat History**:
- Messages persist in the database.
- When a user logs back in, they see previous chat messages.
