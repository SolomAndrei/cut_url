require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const indexRoutes = require('./routes/index');
const linksRoutes = require('./routes/links');

const PORT = process.env.PORT || 3000;

let APP_LINK = `http://localhost:${PORT}`;
if (process.env.NODE_ENV === 'production') {
    APP_LINK = process.env.BASE_URL;
}

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
            console.log(`🚀 Express server running on ${APP_LINK}`);
        });
    } catch (e) {
        console.log(e);
    }
}
startServer();
