const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/api/items', async (req, res) => {
    console.log("Items requested");
    const items = await prisma.item.findMany();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const { text, isRead } = req.body;
    const item = await prisma.item.create({
        data: {
            text,
            isRead
        }
    });
    console.log("Item added: ", item);
    res.json(item);
});

app.put('/api/items/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const item = await prisma.item.update({
            where: { id },
            data: req.body
        });
        console.log("Item updated: ", item);
        res.json(item);
    } catch (error) {
        res.status(404).send('Not found');
    }
});

app.delete('/api/items/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        await prisma.item.delete({
            where: { id }
        });
        console.log("Item deleted: ", id);
        res.status(204).send();
    } catch (error) {
        res.status(404).send('Not found');
    }
});

app.put('/api/items/toggle/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { done } = req.body;

    try {
        const updatedItem = await prisma.item.update({
            where: { id },
            data: { isRead: done }  // Cambia 'done' por 'isRead'
        });
        res.json(updatedItem);
    } catch (error) {
        res.status(404).send('Item not found');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
