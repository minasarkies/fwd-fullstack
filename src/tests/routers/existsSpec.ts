import supertest from 'supertest'; // We import supertest to test if the endpoint is working correctly
import express from 'express';    // We are simply creating a sort of dummy server in order to test the app 
import router1 from '../../routers/exists'; //Importing router1 here from the exists.ts file

const app = express();
app.use('/resizeavailable', router1);

const request = supertest(app);

describe('Available - Endpoint Tests', () => {
  it('should return an array containing available images', async () => {
    const response = await request.get('/resizeavailable');
    // const data = await response.json()
    const data = JSON.parse(response.text);
    expect(data).toContain('icelandwaterfall');
  });
});