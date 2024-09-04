require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const flash = require('connect-flash');

// Import route files
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth'); // auth route for signup/login

// Import Message model
const Message = require('./models/Message');

// Passport config
require('./config/passport')(passport); // Import passport configuration

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/profile', profileRouter);
app.use('/auth', authRouter); // Add auth routes for signup/login

// Socket.IO
io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('message', async (data) => {
    try {
      const message = new Message({
        sender: data.sender,
        recipient: data.recipient,
        content: data.message
      });
      await message.save();
      io.emit('message', { type: 'received', message: data.message });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
