
import express from 'express'
import cors from 'cors';
import { routes } from './routes';

const app = express();

/* Indicates which front-end application can access this back-end app*/
app.use(cors());

/* Indicate the body resquest is as json */
app.use(express.json());

/* Use routes */
app.use(routes);

//Let server running listening port 3333
app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP server running!')
});