const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Import security-related middleware
const helmet = require('helmet'); // Helps secure HTTP headers
const xss = require('xss-clean'); // Helps prevent Cross-Site Scripting (XSS) attacks
const mongoSanitize = require('express-mongo-sanitize'); // Helps prevent MongoDB Injection attacks

// Import database connection setup
const DbConnect = require('./config/db');

// Import route handlers for users and jobs
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const employerRoutes = require('./routes/employerRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const messageRoutes =  require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Import error handling middleware
const errorMiddleware = require('./middlewares/errorMiddleware');

const initializeSocket = require('./socket');

// Load environment variables from the .env file
dotenv.config();

// Connect to the database
DbConnect();

// Create an Express application
const app = express();

// Use Helmet middleware to secure HTTP headers
app.use(helmet());

// Use xss-clean middleware to prevent XSS attacks
app.use(xss());

// Use express-mongo-sanitize middleware to prevent MongoDB Injection attacks
app.use(mongoSanitize());

// Parse incoming JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Log HTTP requests during development using Morgan
app.use(morgan('dev'));

// Define routes for handling user-related and job-related requests
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobapplication', jobApplicationRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/chat', chatRoutes);
 
// Use custom error handling middleware
app.use(errorMiddleware);

// Define the Port variable after loading environment variables
const Port = process.env.PORT || 5000;

// Start the server
const server  = app.listen(Port, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} mode on ${Port}`);
});

// const io = socketIO(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

const io = initializeSocket(server);
