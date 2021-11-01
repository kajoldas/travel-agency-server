const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


//------Middleware--------
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.60qwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run(){
     try{
        await client.connect();
        // console.log('database connected successfully');

        const database = client.db('travelAgency');
        const servicesCollection = database.collection('services');
    
        //-------------GET Products API
        // app.get('/places', async (req, res) => {
        //     const cursor = servicesCollection.find({});
        //     const places = await cursor.toArray();
        //     // const count = await cursor.count();
        //     res.send({places});
        // })


        //--------------POST API-------------
        app.post('/services', async(req, res) => {
      
            
            const services = req.body;
            console.log('hit the post api', services);
           
            const result = await servicesCollection.insertOne(services);
            console.log(result);
            res.json(result);
        });



     }
     finally{
        //  await client.close();
     }
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log('Server running on port', port)
})