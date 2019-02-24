import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import db from 'src/models/';
import routes from 'src/modules';
import authMiddleware from 'src/middlewares/authentication';
const app = express();
app.use(express.static(path.join(__dirname, './')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Test DB connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.get('/', (req, res, next) => {
	res.send('Hello word!');
});

app.all('/api/*', authMiddleware);
app.use('/api', routes);

app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		console.log('error: ', err);
	}

	res.status(500);
	let errorMsg = 'general server error!';
	if (
		err.status === 401
		|| err.status === 400
		|| err.status === 409
	) {
		res.status(err.status);
		errorMsg = err.message;
	}

	res.json({
		error: errorMsg,
	});
});

module.exports = app;
