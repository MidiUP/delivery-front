const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '/dist/Thelivery'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/Thelivery/index.html');
});

app.listen(PORT, () => {
    console.log('servidor inciado na porta' + PORT);
})
