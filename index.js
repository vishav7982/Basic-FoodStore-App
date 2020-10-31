const  express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const MethodOverride = require('method-override');
const BodyParser = require('body-parser');


const product = require('./models/product');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/FarmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongo connection open !");
})
.catch(err =>{
    console.log(" OH No Mongo error !");
    console.log(err);
})
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(BodyParser.urlencoded({ extended: true }));
app.use(MethodOverride('_method'));
///routing goes here 

app.get('/products',async(req,res) =>{
    const {category} = req.query;
    if(category)
    {
        const products = await Product.find({category});
        res.render('products/index',{products,category});
    }
    else
    {
        const products = await Product.find({});
        res.render('products/index',{products,category:'All'});
    }
    
})

app.get('/products/new', (req,res) =>{
    res.render('products/new');
})
app.post('/products',async  (req,res)=>{
    const NewProduct = new Product(req.body);
    await NewProduct.save();
    res.redirect('/products')
})
app.get('/products/:id',async (req,res) =>{
    const {id} = req.params;
    const findProduct = await Product.findById(id)
    console.log(findProduct);
    res.render('products/details',{findProduct});
    res.send('No data Found!');
})

app.get('/products/:id/edit',async (req,res) =>{
      const {id} = req.params;
      const product = await Product.findById(id);
      res.render('products/edit',{product});
})
app.put('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators : true, new : true});
    res.redirect(`/products/${product._id}`);
})
app.delete('/products/:id', async (req,res) =>{
    const {id} = req.params;
    const deletedP = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000, () =>{
    console.log("Listening on Port 3000");
})