const express = require('express');

const app = express();

app.use('/api', require('./app/routes/api')(__dirname));

app.all('*', (req, res) => {
	res.status(404).send({ status: res.statusCode, message: "Not Found" });
})

const listener = app.listen(process.env.EXPOSPORT || 3030, () => console.log(`Server listening on ${listener.address().port}`));