const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));

// Connect to mongoose
const mongoDB = 'mongodb://localhost/ideasdb';
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// MLab
/*async function loadIdeas() {
  const client = await mongodb.MongoClient.Connect
  ('mongodb://iefosa:ideapad1@ds211774.mlab.com:11774/ideapad', {
    useNewUrlParser: true
  });
  return client.db('ideapad').collection('ideas');
}
*/

// Process form
app.post('/ideas', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Express Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Add Ideas Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});
