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



async function run() {
    try {
        const phoneCategoryCollection = client.db('phoneService').collection('phoneCategory');
        const productsCollection = client.db('phoneService').collection('products');
        const bookingsCollection = client.db('phoneService').collection('bookings');
        const usersCollection = client.db('phoneService').collection('users');

        // all category api
        app.get('/phoneCategory', async (req, res) => {
            const query = {};
            const categories = await phoneCategoryCollection.find(query).toArray();
            res.send(categories)
        });

        // product api loaded
        
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })

        // booking api 

        app.post('/bookings', async(req, res) => {
            const booking = req.body;
            console.log(booking)
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        

        // user put to db

        app.put('/user/:email', async(req, res) => {
            const email = req.params.email;
            console.log(email);
            const filter = {email: email};
            const options = {upsert: true};
            const updateDoc = {
                $set: {
                    role: 'buyer'
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send({
                status: "success",
                message: "user added to db",
                data: result
            })
        })

        // user api created

        app.get('/users/:email', async(req, res) => {
            const email = req.params.email;
            const user = await usersCollection.findOne(email)
            res.send(user)
        })

    }
    finally {

    }
}
run().catch(console.log)



app.get('/', (req, res) => {
    res.send('assignement 12 server is running')
})

app.listen(port, () => console.log(`Assignment 12 running on ${port}`))