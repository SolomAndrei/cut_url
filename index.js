const express = require('express');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();

const indexRoutes = require('./routes/index');
const linksRoutes = require('./routes/links');

const PORT = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(indexRoutes);
app.use('/links', linksRoutes);

async function startServer() {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`🚀 Express server running on ${baseUrl}`);
        });
    } catch (e) {
        console.log(e);
    }
}
startServer();
