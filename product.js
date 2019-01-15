var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var productschema=new Schema({
    name:{type:String, required:true},
    price:{type:Number,required:true}
});

var product=mongoose.model('product',productschema);

module.exports=product;