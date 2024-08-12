const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const items = [];

app.get('/api/items', (req, res) => {
    console.log("Items requested");
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const item = req.body;
    items.push(item);
    console.log("Item added: ", item);
    res.json(item);
});

app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).send('Not found');
    } else {
        items[index] = req.body;
        console.log("Item updated: ", items[index]);
        res.json(items[index]);
    }
});

app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        res.status(404).send('Not found');
    } else {
        items.splice(index, 1);
        console.log("Item deleted: ", id);
        res.status(204).send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});