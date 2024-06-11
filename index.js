import express from 'express';

import connectToDb from './database.js';

import checkAuth from './utils/checkAuth.js';

import { registerValidator, loginValidator } from './validations/auth.js'

import * as UserController from './controllers/UserController.js'

import { filterRouter } from './controllers/items.js';  

const app = express();
app.use(express.json());

const collection = 'Users';

app.post('/auth/login', loginValidator, UserController.login);

app.post('/auth/register', registerValidator, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.use('/api/items', filterRouter); 

app.get('/', (req, res) => {
  res.send('Hello bro');
});

async function main() {
  await connectToDb();
  console.log('DB OK');
}

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
  main().catch(console.error);
});
