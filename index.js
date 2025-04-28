// Import dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
// Initialize Express app
const app = express();
app.use(express.json());
// app.use('/uploads', express.static('uploads')); // to serve images
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Origin', '*')
    }
}))

app.use(cors());
require('./Utils/MongooseConnection');
const { AdminRoutes } = require("./Routes/AdminRoutes/AdminRoutes");
const { WebsiteRoutes } = require("./Routes/WebsiteRoutes/WebsiteRoutes");

app.use('/admin', AdminRoutes);
app.use('/website', WebsiteRoutes);

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
