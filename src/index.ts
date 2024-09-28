import express ,{ Request, Response } from 'express';
import { handleScheduleRequest } from './routes/scheduler';
import { completeRequest, createNewRequests, deleteRequest, getRequests, getRequestsById, updateRequest } from './routes/requestHandler';

const app = express();
app.use(express.json());

app.get('/schedule', (req: Request, res: Response) => {
    handleScheduleRequest(req, res);
  });

app.post('/requests', (req: Request, res: Response) => {
    createNewRequests(req,res);
  });

app.get('/requests', (req: Request, res: Response) => {
    getRequests(req,res)
  });

app.get('/requests/:id', (req: Request, res: Response) => {
    getRequestsById(req, res);
  });

app.put('/requests/:id', (req: Request, res: Response) => {
    updateRequest(req, res);
  });

app.delete('/requests/:id', (req: Request, res: Response) => {
    deleteRequest(req, res);
  });

app.post('/requests/:id/complete', (req: Request, res: Response) => {
    completeRequest(req, res);
  });


app.listen(3000, () => console.log(`Server running on port http://localhost:3000`));