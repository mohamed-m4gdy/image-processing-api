import express from 'express';
import routes from './routes';
import { validate } from './utils/utils';

const PORT = 3000;
// create an instance server
const app = express();

app.use('/api', routes);

// start express server
app.listen(PORT, () => {
  validate();
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;
