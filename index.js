import express from 'express';
import registerRoute from './register.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/register', registerRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
