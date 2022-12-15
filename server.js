const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());

// Connecting with the database atlas
let orderList = [];

// Get call to fetch all the students
app.get('/register', async (req, res) => {
    try {
        await res.render('register');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', async (req, res) => {
    res.redirect('/register');
});


// Creating student record
app.post('/register', async (req, res) => {
    try {
        await orderList.push(req.body);
        await res.redirect('/search');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Render edit page
app.get('/search', async (req, res) => {
    try {
        res.render('search', { orderList });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get call to fetch one students
app.post("/display", async (req, res) => {
    try {
        const orders = await orderList.find(element => element.orderId.toLowerCase() == req.body.orderId.toLowerCase())
        await res.render('display', { orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listening port on 8080
app.listen(3000, () => {
    console.log("Server is running on port 8080");
});

module.exports = app;