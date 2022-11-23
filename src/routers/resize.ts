import express from 'express';
import path from 'path';
import fs from 'fs';
import jimp from 'jimp';


const resizeR = express.Router();          //Creating an express router obj

resizeR.get(
  '/resize/:imgname/:width?/:height?',     // Here we are retreveing our image name, and dimensions from the encoded url, alternatively the default dimentions if not places are 1280*720
    async (req: express.Request, res: express.Response) => {
    const imgName: string = req.params.imgname;
    const newWidth: number = parseInt(req.params.width) || 720;
    const newHeight: number = parseInt(req.params.height) || 1280;
    

    if (!(fs.existsSync(`./src/images/${imgName}.jpg`))) {  // just to check if the file exists
      console.log(`no image with name: '${imgName}' was found`);
      res
        .status(404)
        .send('No image with this name was found, Please enter a valid filename in the URL')
      
    } else if (
      !(fs.existsSync(`images_out/${imgName}_${newWidth}_${newHeight}.png`))) 
        {
          console.log('Now resizing...');
          //await resizeImg(imgName, newWidth, newHeight);
          const img = await jimp.read(`./src/images/full/${imgName}.jpg`);     // First we retrieve the image
          img.resize(newWidth, newHeight);                         // Next we resize the image based on the recieved dimentions
          await img.writeAsync(`images_out/${imgName}_${newWidth}_${newHeight}.png`);      // Finally the file is saved to an image_out dir
          res.sendFile(`${imgName}_${newWidth}_${newHeight}.png`, {                 // Finally the image is displayed and saved.
          root: path.join(__dirname, '../../images_out'),
      });
    } else {                                                // If all other conditions have not been met then the image must have been processed previously and hence must be saved. 
          console.log('This image with this size already existed');
          res.sendFile(`${imgName}_${newWidth}_${newHeight}.png`, {
          root: path.join(__dirname, '../../images_out'),
      });
    }
  }
);

export default resizeR;