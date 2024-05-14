/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

//parser
app.use(express.json());
app.use(cors());
//application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send('Hello World');
};
app.get('/', test);

app.use(globalErrorHandler);
// Not found
app.use(notFound);
export default app;
