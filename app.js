// Entry point for the application
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});