import express from 'express';
import http from 'http';

import routes from './routes';

const app = express();
const server = http.createServer(app);

app.use('/api/', routes);

server
    .listen(80)
    .then(() => console.log('Server is running'));