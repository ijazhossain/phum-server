import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

//parser
app.use(express.json());
app.use(cors());
const getHelloController = (req: Request, res: Response) => {
  res.send('Hello World');
};
app.get('/', getHelloController);
export default app;
