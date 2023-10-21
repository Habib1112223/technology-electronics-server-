const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://alamin:${process.env.DB_PASS}@cluster0.j9gyaso.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});

async function run() {
      try {
            const productCollection = client.db('productDB').collection('products');
            const categoriesCollection = client.db('productDB').collection('categories');
            const cartCollection = client.db('productDB').collection('carts');



            // Products
            // start
            

            // end

            // Carts
            // app.get('/carts/user/:userId', async (req, res) => {
            //       let userId = req.params.userId;
            //       let cartQuery = { "userId": userId }
            //       let cartsResult = await cartCollection.find(cartQuery).toArray()
            //       res.send(cartsResult)
            //       console.log(cartsResult)
            // })

            app.get('/carts', async (req, res) => {
                  let query = {}
                  let cartsResult = await cartCollection.find(query).toArray()
                  res.send(cartsResult)
                  console.log(cartsResult)
            })

            app.post('/carts', async (req, res) => {
                  let cartData = req.body;
                  let insertCart = await cartCollection.insertOne({ ...cartData });
                  res.send(insertCart);
                  console.log(insertCart)
            })

            app.delete('/carts/:id', async (req, res) => {
                  const query = req.params.id;
                  if (query) {
                        const category = { _id: new ObjectId(query) }
                        const result = await cartCollection.deleteOne(category);
                        console.log(result)
                  } else {
                        res.status(401).send('Category not found')
                  }
            })



            console.log("connected to MongoDB!");
      } finally {

      }
}
run().catch(console.dir);



app.get('/', (req, res) => {
      res.send('Brand Shop are running in the server side');
})

app.listen(port, () => {
      console.log(`Brand server is running in the local server:${port}`);
})