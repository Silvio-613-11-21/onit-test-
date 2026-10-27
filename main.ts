import express, { type Express, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' with {type: 'json'}

import blockroute from './src/routes/block.route.ts' 
import noteroute from './src/routes/note.route.ts'
import taskroute from './src/routes/task.route.ts'
import subtaskroute from './src/routes/subtask.route.ts'

const app: Express = express();
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/block', blockroute)
app.use('/note', noteroute)
app.use('/task', taskroute)
app.use('/subtask', subtaskroute)

app.listen(3000);