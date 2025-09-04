import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import patientsRouter from './routes/patients';
import facilitiesRouter from './routes/facilities';
import facilityGroupsRouter from './routes/facilityGroups';
import usersRouter from './routes/users';
import appointmentsRouter from './routes/appointments';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/patients', patientsRouter);
app.use('/api/facilities', facilitiesRouter);
app.use('/api/facility-groups', facilityGroupsRouter);
app.use('/api/users', usersRouter);
app.use('/api/appointments', appointmentsRouter);

app.use(errorHandler);

export default app;


