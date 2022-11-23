import express, { json, urlencoded } from 'express';
import cors from 'cors';                     // simple Cross-origin resource sharing middleware for both express & connect (which is a middleware for an extendable http server framework)
import fileUpload from 'express-fileupload'  // Simple express middleware to help with file uploads
import resizeR from './routers/resize';
import Router1 from './routers/exists';      //this is the router to check for availability
import uploadR from './routers/upload';

const app = express();                       // Creating an express object
const port = 3000;                           // Variable port number makes testing or changing the port easier  

                                             // Next we will configure somethings into our express object
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: './temp'
}))

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send(('Home Page -> Please add the following to the url: /exists or /upload <br> If no dimensions are specified then the default till be 1024 * 1024'));                        
});

app.use('/', resizeR);                             // Next the routes are created to created a structured and organized app.
                                                  // the paths we will use are: /home, /exists, /upload. 
app.use('/exists', Router1);

app.use("/upload", uploadR);
                                                  // Simple ways to ensure nonvalid url errors are handled.
app.get('/resize', (req: express.Request, res: express.Response): void => {
  res.status(404).send('Please include a valid filename in the URL');
});

app.get('/*', (req: express.Request, res: express.Response): void => {
  res.status(404).send('404 ERROR');              
});

app.listen(port, (): void => {                    // Finally we establish our server on the assigned port number on http://localhost:{port}
  `Server started on localhost:${port}`;
});

export default app;