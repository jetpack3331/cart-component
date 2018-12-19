const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const HttpStatus = require('http-status');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const server = http.createServer(app);

const PORT = 80;

// Logger setup
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../../build')));

// CORS setup
app.use((req, res, next) => {
    // if we have an options request (preflight), send 200 and set some headers
    if (req.method === 'OPTIONS') {
        const headers = {};
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Methods'] = 'POST, PATCH, PUT, GET, PUT, DELETE, OPTIONS';
        headers['Access-Control-Allow-Credentials'] = false;
        headers['Access-Control-Max-Age'] = '86400'; // 24 hours
        headers['Access-Control-Allow-Headers'] = 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
        res.writeHead(HttpStatus.OK, headers);
        res.end();
    } else {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        next();
    }
});

const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin (origin, callback) {
        // Allow all origins
        callback(null, true);
    }
};

app.use(cors(corsOptions));

// Parser for JSON body
app.use(bodyParser.json({
    limit: '5mb'
}));

// Routes setup
app.use('/api/', routes);

server
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })    