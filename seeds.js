const mongoose = require('mongoose');
const Product = require('./models/product');
const product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/FarmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongo connection open !");
})
.catch(err =>{
    console.log(" OH No Mongo error !");
    console.log(err);
})

const seedProducts  = [
    {
        name : 'Fairy Eggplant',
        price : 1.00,
        category :'vegetable'
    },
    {
        name : 'Organic Goddess Melon',
        price : 4.99,
        category :'fruit'
    },
    {
        name : 'Organic Mini Seedless Watermelon',
        price : 3.99,
        category :'fruit'
    },
    {
        name : 'Organic Celery',
        price : 1.50,
        category :'vegetable'
    },
    {
        name : 'Chocolate Whole Milk',
        price : 2.69,
        category :'dairy'
    } 
]
Product.insertMany(seedProducts).then( res => {
    console.log(res)
})
.catch(err =>{
    console.log(err)
})