# Short-URL

Short-URL is a simple URL shortener application that allows users to shorten long links, track analytics such as click count, and manage their shortened URLs. The application includes user authentication with JWT, providing a secure environment for managing URLs.

## Features

- **User Authentication:** Users can sign up, log in, and securely manage their URLs using JWT authentication.
- **URL Shortening:** Converts long URLs into short, shareable links.
- **Analytics Dashboard:** Displays short ID, original URL, and the number of times the link has been clicked.
- **EJS-Based UI:** Server-side rendering using EJS for a smooth and interactive user experience.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **UI Rendering:** EJS (Embedded JavaScript)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Shubbu-07/short-url.git
   cd short-url
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=8001
     ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- `POST /user` - Register a new user
- `POST /user/login` - Login and receive JWT token

### URL Management
- `POST /url/` - Shorten a new URL
- `GET /url/:shortId` - Redirect to the original URL
- `GET /analytics` - View analytics of shortened URLs

## Usage
1. **Sign up or log in** to access the URL shortener.
2. **Enter a long URL** in the provided form to generate a short link.
3. **View analytics** to track the number of clicks on your shortened URL.

## Screenshots
(Include relevant screenshots of your application here)