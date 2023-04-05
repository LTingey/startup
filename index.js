const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the application is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the application's static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Create new states object
apiRouter.post('/newList', async (req,res) => {
  console.log("POST request: ", req.body);
  DB.createList(req.body);
})

// Get states list
apiRouter.get('/userList/:id', async (req, res) => {
  console.log("GET");
  const id = req.params.id;
  const result = await DB.getList(id);
  if (!result) {
    console.log("nothing came back after calling DB.getList");
  }
  console.log("result: ", result);
  res.send(result);
})

// Update states list
apiRouter.put('/updateList/:email', async (req, res) => {
  console.log("PUT request: ", req.body);
  DB.updateList(req.params.email, req.body);
})


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});