const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/static`)); // static files
app.use('/api', require('./app/routes/api')(__dirname)); // API routes

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache'); // for development purposes
	next();
});

app.get('/', (req, res) => res.render('home', {
	title: "Home"
}));

// 404 route (not found)
app.all('*', (req, res) => {
	res.status(404).send({ status: res.statusCode, message: "Not Found" });
});

const listener = app.listen(process.env.EXPOSPORT || 3030, () => console.log(`Server listening on ${listener.address().port}`));