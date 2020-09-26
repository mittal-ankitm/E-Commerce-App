const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {pagesize}=require('../config')
const Products = require('../models/product');
var authenticate = require('../authenticate');
const Category=require('../models/category');
const SystemInfo = require('../models/system');

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route('/')
.all((req, res, next) => {
    SystemInfo.find({})
    .then((data) => {
        if(data[0].shop != true) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json('Shop operation is temporarily disabled by admin.');
        }
    })
});

productRouter.route('/getcategory')
.get(authenticate.verifyUser,(req,res,next) => {
    console.log("getcategory route")
    Category.find({})
    .then((cat) => {
        console.log(cat)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({category:cat});
    })
    .catch((err) => res.json({err}));
})

productRouter.route('/search')
.post((req,res,next) => {
    const query=req.body.query
    const pgnum=req.body.pgnum
    const p=new RegExp(query,"i")
    Products.find({name:{$regex:p}})
    .limit(pagesize)
    .skip(pagesize*(pgnum-1))
    .then(product=>{
        Products.count({name:{$regex:p}})
        .exec((err,c)=>{
       let pages=Math.ceil(c/pagesize)
        res.json({products:product,pages:pages})
        })
    }).catch(err=>res.json({err}))
})
productRouter.route('/category')
.post((req,res,next) => {
    const query=req.body.query
    const pgnum=req.body.pgnum
    Products.find({category:query})
    .limit(pagesize)
    .skip(pagesize*(pgnum-1))
    .then(product=>{
        console.log(product)
       Products.count({category:query})
       .exec((err,c)=>{
       let pages=Math.ceil(c/pagesize)
        res.json({products:product,pages:pages})
        })
    }).catch(err=>res.json({err}))
})
productRouter.route('/allproducts')
.post((req,res,next) => {
    const pgnum=req.body.pgnum
    Products.find({})
    .limit(pagesize)
    .skip(pagesize*(pgnum-1))
    .then(product=>{
        console.log(product)
       Products.count({})
       .exec((err,c)=>{
       let pages=Math.ceil(c/pagesize)
        res.json({products:product,pages:pages})
        })
    }).catch(err=>res.json({err}))
})

// Methods for http://localhost:3000/products/ API end point
productRouter.route('/')
.get((req,res,next) => {
    Products.find({})
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch((err) => res.json({err}));
})
.post(authenticate.verifyUser, (req, res, next) => {
    console.log(req.body)
    let p=Products(req.body)
    p.save()
    .then((product) => {
        console.log('Product Created ', product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => console.log(err))
    .catch((err) =>res.json({err}));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /products');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Products.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/products/:productId API end point
productRouter.route('/:productId')
.get((req,res,next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => res.json({err}));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /products/'+ req.params.productId);
})
.put(authenticate.verifyUser, (req, res, next) => {

    Products.findById(req.params.productId)
    .then((prod) => {
        if(prod != null) {
            prod.name=req.body.name;
            prod.quantity=req.body.quantity;
            prod.maxQuantity=req.body.maxQuantity;
            prod.price=req.body.price;
            prod.image=req.body.image;
            prod.onlinePercent=req.body.onlinePercent;
            prod.size=req.body.size;
            prod.category=req.body.category;


            prod.save()
            .then((prod) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(prod);              
            }, (err) => res.json({err}));
        }
        else {
            err = new Error('product not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch((err) => res.json({err}));


    /*Products.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, { new: true })
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => res.json({err}));

    */
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Products.findByIdAndRemove(req.params.productId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

productRouter.route('/percent/update')
.put(authenticate.verifyUser, (req, res, next) => {
    console.log("eg4rh")
  Products.updateMany({}, {onlinePercent:req.body.percent}, 
    function(err, num) {
        if(err){
            res.json({error:err})
        }
        console.log("updated "+num);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(num);
    }
);
})

productRouter.route('/productvalues/update')
.put(authenticate.verifyUser, (req, res, next) => {
    const {id,quantity,price,maxquantity}=req.body
  Products.updateOne({_id:id}, {quantity:quantity,price:price,maxQuantity:maxquantity}, 
    function(err, ress) {
        if(err){
            res.json({error:err})
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ress);
    }
);
})

module.exports = productRouter;