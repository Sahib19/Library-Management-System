# Library Management System

A full-stack web application for managing a library's books, users, authors, and categories. Built with React for the frontend and Node.js/Express for the backend, using MongoDB for data storage.

## Features

- User registration and authentication
- Admin dashboard for managing books, authors, categories, and users
- User dashboard for browsing and issuing books
- Book issuing and returning system
- Image uploads for book covers via Cloudinary
- Responsive design

## Technologies Used

### Frontend

- React 19
- React Router DOM
- Vite (build tool)
- CSS for styling

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- Cloudinary for image uploads
- Multer for file handling
- CORS for cross-origin requests

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- Cloudinary account for image uploads

### Backend Setup

1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the server in development mode:
   ```
   npm run dev
   ```
   Or for production:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (default Vite port).

## Usage

- Register as a new user or log in with existing credentials.
- Admins can manage books, authors, categories, and view users.
- Users can browse books, view their issued books, and return them.
- Issue books from the browse section.

## API Endpoints

Refer to the [server README](server/README.md) for detailed API documentation.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and test them.
4. Submit a pull request.

## License

This project is licensed under the ISC License.
