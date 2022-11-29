const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // specific category wise product loaded api
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { brandName: id };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        });

        // all product api loaded

        app.get('/products', async (req, res) => {
            const query = {};
            const product = await productsCollection.find(query).toArray();
            res.send(product);
        })

        // product post api
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        // get all bookings

        app.get('/bookings', async (req, res) => {
            const query = {};
            const booking = await bookingsCollection.find(query).toArray();
            res.send(booking);
        })

        // booking post database 

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking)
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        // all user loaded api
        app.get('/users', async (req, res) => {
            const query = {};
            const user = await usersCollection.find(query).toArray();
            res.send(user)
        });

        // admin data loaded

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'admin' });
        });

        // specific seller route check

        app.get('/users/seller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isSeller: user?.role === 'seller' });
        });

        // specific buyer route check
        app.get('/users/buyer/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isBuyer: user?.role === 'buyer' });
        });


        // all user loaded

        app.get('/alluser', async (req, res) => {
            const query = {};
            const user = await usersCollection.find(query).toArray();
            res.send(user)
        })

        // all sellers data loaded
        app.get('/sellers', async (req, res) => {
            const query = {
                role: 'seller'
            };
            const allSeller = await usersCollection.find(query).toArray();
            res.send(allSeller);
        });

        // seller deleted

        app.delete('/seller/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })

        // all buyers data loaded
        app.get('/buyers', async (req, res) => {
            const query = {
                role: 'buyer'
            };
            const allBuyer = await usersCollection.find(query).toArray();
            res.send(allBuyer);
        });

        // all phone category name api
        app.get('/categoryItem', async (req, res) => {
            const query = {};
            const result = await phoneCategoryCollection.find(query).project({ brandName: 1 }).toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // user put to db

        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const filter = { email: email };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'buyer'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send({
                status: "success",
                message: "user added to db",
                data: result
            })
        })

        // user api created

        app.get('/users/:email', async (req, res) => {
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