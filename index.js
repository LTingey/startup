const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { PeerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Create user
apiRouter.post('/auth/create', async (req,res) => {
  console.log("POST user request: ", req.body);
  if (await DB.getUser(req.body.email)) {
    console.log("Email is already being used");
    res.status(409).send({msg: 'Existing user'})
  }
  else {
    const user = await DB.createUser(req.body.email, req.body.name, req.body.password);
    setAuthCookie(res, user.token);
    res.send({id: user._id})
  }
})

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Check credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Create new states object
apiRouter.post('/newList', async (req, res) => {
  console.log("POST states request: ", req.body);
  const result = await DB.createList(req.body);
  res.send(result);
})

// Get states list
apiRouter.get('/userList/:id', async (req, res) => {
  console.log("GET states");
  const id = req.params.id;
  const result = await DB.getList(id);
  if (!result) {
    console.log("nothing came back after calling DB.getList");
  }
  console.log("result: ", result);
  res.send(result);
})

// Update states list
apiRouter.put('/updateList/:email', async (req) => {
  console.log("PUT states request: ", req.body);
  const result = await DB.updateList(req.params.email, req.body);
})


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
  
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

new PeerProxy(httpService);