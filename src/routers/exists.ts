import express from 'express';                            // Importing the necessary packages
import fs from 'fs';

const router1 = express.Router();                         // Create express router object

router1.get('/',  async (req: express.Request, res: express.Response) => {
      fs.readdir('./src/images/full', (err, files) => {       // Creating the array that will house all the images so the 
                                                         // ones that have been processed do not have to take up resouces again.
      const img_arr = files.map((file) => file.split('.')[0]);
      res.send(JSON.stringify(img_arr));
    });
  }
);

export default router1;                                   // So  we can import the router as an obj in the main file
