var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

var product=require('./product');

mongoose.connect('mongodb://localhost/products',{
    //useMongoClient:true
});
var app=express();
app.listen(3000,listener)

function listener(){
    console.log('Server has started successfully');
    
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//REST api routes

app.get('/read/:id',read);
app.post('/create',create);
app.put('/update/:id',update);
app.delete('/delete/:id',del);
app.get('/home',readall);

function create(req,res){
    let prod=new product({
        name:req.body.name,
        price:req.body.price
    });

    prod.save(function(err){
        if(!err)
        res.send('product created succesfully');
    }
    )
}

function read(request,response){
    
    product.findById(request.params.id,function(err,data){
        response.send(data);
    });
   
}
function readall(req,res){
    product.find({},function(err,data){
        if(!err)
        res.send(data);
    })
}
function update(req,res){

    product.findByIdAndUpdate(req.params.id,{$set:req.body},function(err,data){
        res.send('product updated');
    }
        );

}
function del(req,res){

    product.findByIdAndDelete(req.params.id,function(err,date){
        if(!err)
        res.send('product deleted');
    });
}
app.use(express.static('website'));