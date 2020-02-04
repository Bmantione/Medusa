const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/save', (req, res) => {
    const content = JSON.stringify(req.body, null, 4);
    fs.writeFileSync('./public/config.json', content);
});

app.listen(port, () => console.log(`Listening on port ${port}`));