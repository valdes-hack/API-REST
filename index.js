require('dotenv').config();

const express = require('express')
const app = express()

// Allow Express to use data from JSON payloads
app.use(express.json());
// Allow Express to use data from HTML forms
app.use(express.urlencoded({ extended: true }));

// Routes
// Authentication routes
app.use('/api/v1/auth', require('./routes/auth.route'));
// Tasks routes
app.use('/api/v1/tasks', require('./routes/tasks.route'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})