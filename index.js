const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f7wnwq6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);





app.get('/', (req, res) => {
    res.send('assingnment 12 server is running');
});

app.listen(port, () => {
    console.log(`Assignment 12 server running on ${port}`);
})