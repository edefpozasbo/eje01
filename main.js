const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/u3",{useNewUrlParser:true});
const productSchema=new mongoose.Schema({
	code:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	prize:{
		type:Number,
		required:true
	}
});
const userSchema=new mongoose.Schema({
	firstName:{
		type:String,
		required:true
	},
	lastName:{
		type:String,
		required:true
	},
	email:{
		type:Number,
		required:true
	},
	password:{
		type:Number,
		required:true
	}
});

const Product=mongoose.model("Product",productSchema,"products");
const User=mongoose.model("User",productSchema,"users");

const routerProducts= express.Router();
const routerUsers= express.Router();
const routerLogin= express.Router();

routerProducts.post("/",(req,res)=>{
	let product=req.body;
	console.log(product);
	Product.create(product).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Saved!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened!",
			detail:err
		});
	});
});

routerProducts.get("/",(req,res)=>{
	Product.find({}).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Query succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the query!",
			detail:err
		});
	});
});

routerProducts.get("/:id",(req,res)=>{
	Product.find({_id:req.params.id}).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Query with id $(req.params.id) succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the query!",
			detail:err
		});
	});
});

routerProducts.delete("/:id",(req,res)=>{
	let {id}=req.params;
	Product.remove({_id:id}).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Product with id '$(id)' was deleted succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the delete!",
			detail:err
		});
	});
});

routerProducts.put("/:id/:code/:name/:prize",(req,res)=>{
	let {id}=req.params;
	let {code}=req.params;
	let {name}=req.params;
	let {prize}=req.params;
	Product.update(
		{
			_id:id
		},
		{
			$set:{
				code:code,
				name:name,
				prize:prize,
			}
		}
	).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Product with id '$(req.params.id)' was updated succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the update!",
			detail:err
		});
	});
});


routerUsers.post("/",(req,res)=>{
	let user=req.body;
	user.password=crypt(user.password);
	User.create(user).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Saved!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened!",
			detail:err
		});
	});
});

routerUsers.get("/",(req,res)=>{
	User.find({}).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Query succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the query!",
			detail:err
		});
	});
});

routerUsers.get("/:id",(req,res)=>{
	User.find({_id:req.params.id}).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"Query with id $(req.params.id) succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the query!",
			detail:err
		});
	});
});

routerUsers.delete("/:id",(req,res)=>{
	let {id}=req.params;
	User.remove({_id:id}).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"User with id '$(id)' was deleted succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the delete!",
			detail:err
		});
	});
});

routerUsers.put("/:id/:firstName/:lastName/:email/:password",(req,res)=>{
	let {id}=req.params;
	let {firstName}=req.params;
	let {lastName}=req.params;
	let {email}=req.params;
	let {password}=req.params;
	User.update(
		{
			_id:id
		},
		{
			$set:{
				firstName:firstName,
				lastName:lastName,
				email:email,
				password:crypt(password)
			}
		}
	).then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:"User with id '$(id)' was updated succesfully!",
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the update!",
			detail:err
		});
	});
});


routerLogin.post("/",(req,res)=>{
	let {email}=req.body;
	let {password}=req.body;
	User.findOne(
		{
			email:email,
			password:crypt(password)
		}
	).then(data=>{
		console.log(data);
		res.status(200);
		let msg="Login correct!";
		if(!data)
			msg="Login invalid!";
		res.json({
			code:200,
			msg:msg,
			detail:data
		});
	}).catch(err=>{
		console.log(err);
		res.status(400);
		res.json({
			code:400,
			msg:"Something wrong had happened in the login!",
			detail:err
		});
	});
});

function crypt(string){
	var mykey = crypto.createCipher('aes-128-cbc', 'password_encryption');
	var mystr = mykey.update(string, 'utf8', 'hex')
	mystr += mykey.update.final('hex');
	return mystr;
}
function decrypt(string){
	var mykey = crypto.createDecipher('aes-128-cbc', 'password_encryption');
	var mystr = mykey.update(string, 'hex', 'utf8')
	mystr += mykey.update.final('utf8');
	return mystr;
}


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/product",routerProducts);
app.use("/user",routerUsers);
app.use("/login",routerLogin);


const server=require("http").Server(app);
const port=3002;

server.listen(port,()=>{
	console.log("Running on port $(port)");
});


