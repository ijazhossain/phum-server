import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';

//parser
app.use(express.json());
app.use(cors());
//application routes
app.use('/api/v1/students', StudentRoutes);
const getHelloController = (req: Request, res: Response) => {
  res.send('Hello World');
};
app.get('/', getHelloController);
export default app;
