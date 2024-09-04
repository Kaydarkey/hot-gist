Hot Gist
Hot Gist is a real-time chat application where users can sign up, activate their accounts, and log in to chat with other registered users. The app features real-time messaging, media sharing, and a modern UI inspired by popular chat apps.

Key Features
User Authentication

Signup with email and password.
Login with email and password.
Account activation via email link.
Real-Time Messaging

Real-time communication using Socket.IO.
Send and receive messages instantly.
Messages are stored in MongoDB.
Media Sharing

Send images, videos, and other media files.
Media files can be stored in the cloud (e.g., AWS S3) or locally, based on setup.
Chat Interface

Display recent chats similar to WhatsApp Web.
Open chats and view message history.
Modernized CSS design for enhanced user experience.
User-to-User Messaging

Search for other users and start chatting with them if they have an account.
Status Indicators

Show online or offline status.
Indicate if a message has been read.
Tech Stack
Back-end: Node.js, Express.js
Real-Time Communication: Socket.IO
Database: MongoDB (with Mongoose for object modeling)
Authentication: Passport.js or JWT (JSON Web Tokens)
Front-end: EJS (for templating), modernized CSS (using frameworks like Bootstrap, or custom CSS)
File Storage: Cloud storage (e.g., AWS S3) or local storage
Deployment: Heroku, Vercel, or other cloud platforms
Instructions
Setup

Clone the repository:

git clone <repository-url>
Navigate into the project directory:

cd hot-gist
Install dependencies:

npm install
Configuration

Create a .env file in the root directory and configure environment variables. Example:
makefile
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUD_STORAGE_KEY=<your-cloud-storage-key>
CLOUD_STORAGE_SECRET=<your-cloud-storage-secret>
Run the Application

Start the server:

npm start
Development

Modify the CSS and JavaScript files in the public directory to customize the user interface and real-time functionality.
Update routes and views in the routes and views directories respectively.
Add or modify models in the models directory as needed.
Update configuration settings in the config directory.
File Structure


hot-gist/
|-- node_modules/
|-- public/
|   |-- css/
|   |   |-- style.css
|   |-- uploads/
|   |-- js/
|       |-- socket.js
|-- views/
|   |-- chat.ejs
|   |-- group.ejs
|   |-- profile.ejs
|   |-- login.ejs
|   |-- signup.ejs
|-- models/
|   |-- User.js
|   |-- Message.js
|   |-- Group.js
|-- routes/
|   |-- chat.js
|   |-- profile.js
|   |-- index.js
|-- config/
|   |-- auth.js
|-- utils/
|   |-- cryptoUtil.js
|-- .env
|-- app.js
|-- package.json
Deployment

Deploy your application to Heroku, Vercel, or any other preferred cloud platform.
Contributing
Contributions are welcome! Please submit a pull request or open an issue if you have suggestions or improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or feedback, please reach out to darkeykafui@gmail.com.
