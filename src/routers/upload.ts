import express from "express";
import { promises as fs } from "fs";

const uploadR = express.Router();

uploadR.post("/", async (req, res) => {                                         // Simple way to catch any errors on the file not being found
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    const tempFile = req.files.files;
    const tempPath = Object.values(tempFile)[4];

    const img = await fs.readFile(tempPath);                                          // after reading the path of the file from the encoded url here we retrieve the image.

    await fs.writeFile(`./src/images/full/${req.body.name}.jpg`, img);               // Next the file is saved to the images folder
    console.log("new image was uploaded");
    res.send("Uploaded");
});

export default uploadR;