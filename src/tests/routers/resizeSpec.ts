import supertest from 'supertest';
import express from 'express';
import resizeR from '../../routers/resize';
import fs from 'fs';

const app = express();
app.use('/', resizeR);

const request = supertest(app);

describe('Resize - Endpoint Tests', () => {
  it('should return status 200 when resizing an image from the list', async () => {
    const response = await request.get('/resize/fjord');
    expect(response.status).toBe(200);
  });

  it('should return status 404 when trying to resize an image not from the list', async () => {
    const response = await request.get('/resize/life');
    expect(response.status).toBe(404);
  });

  it('should return true if a certain file exists in a directory', () => {
    //const filePath = '../../images/full/fjord.jpg';
    let fileExists = fs.existsSync(`./src/images/full/fjord.jpg`)
    expect(fileExists).toBe(true);
  });

  it('should place the resized image in images_out dir', async (): Promise<void> => {
    await request.get('/resize/fjord/320/320');
    const isResized = fs.existsSync('images_out/fjord_320_320.png');
    expect(isResized).toBe(true);
  });
});
