import express ,{ Request, Response } from 'express';
import { handleScheduleRequest } from './routes/scheduler';

const app = express();
app.use(express.json());

app.get('/schedule', (req: Request, res: Response) => {
    handleScheduleRequest(req, res);
  });

app.listen(3000, () => console.log(`Server running on port http://localhost:3000`));