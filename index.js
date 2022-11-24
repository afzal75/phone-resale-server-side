const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();


// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f7wnwq6.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        const phoneCategoryCollection = client.db('phoneService').collection('phoneCategory');

        app.get('/phoneCategory', async(req, res) => {
            const query = {};
            const categories = await phoneCategoryCollection.find(query).toArray();
            res.send(categories)
        })
    }
    finally{

    }
}
run().catch(console.log)



app.get('/', (req, res) => {
    res.send('assignement 12 server is running')
})

app.listen(port, () => console.log(`Assignment 12 running on ${port}`))