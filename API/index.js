const express=require("express");
const app= express();
const cors=require("cors");
const bcrypt=require("bcryptjs")
const mongoose = require("mongoose");
const User= require('./models/user.js')
const cookieParser= require("cookie-parser");
const jwt=require("jsonwebtoken");
const place=require('./models/place.js');
const booking=require('./models/booking.js');
const imageDownloader=require("image-downloader");
const multer= require('multer');
const fs=require('fs');
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='gasgck';
require('dotenv').config();
app.use(express.json());//json parser
app.use(cookieParser());//cookie parser
app.use('/uploads',express.static(__dirname+ '/Uploads'));
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173'
}));

mongoose.connect(process.env.MONGO_URL);

function getDataFromToken(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token , jwtSecret , {} , async(err,user)=>{
            if(err) throw err;
            resolve(user);
        });
    });
};

app.get('/test',(req,res)=>{
res.json('test ok');
});


//dwUjjh7QODTN244w
app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),//encryption
        });
        res.json(userDoc);
    } catch(e){
        res.status(422).json(e);
    }
   
    
});

app.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc){
        const passOK=bcrypt.compareSync(password,userDoc.password);
        if(passOK){
            jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},jwtSecret,{},(err,token)=>{
                if(err)throw(err);
                res.cookie('token',token).json(userDoc);
            });

        }else{
            res.status(422).json("Password Not Matched");
        }
    }else{
        res.json("Not Found");
    }

});

app.get('/profile',(req,res)=>{
 const {token}=req.cookies;
 if(token){
    jwt.verify(token , jwtSecret , {} , async (err,user)=>{
        if(err) throw err;
        const{name,email,_id}=await User.findById(user.id);
        res.json({name,email,_id});
    });
 }else{
    res.json(null);
 }
});

app.post('/logout',(req,res)=>{
    res.cookie('token', '' ).json(true);
});

app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body;
    const newName='photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest:__dirname + '/Uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware=multer({dest:'Uploads/'})
app.post('/uploads',photosMiddleware.array('photos', 100),(req,res)=>{
const uploadedFiles=[];
for (let i = 0; i < req.files.length; i++) {
    const {path,originalname}=req.files[i];
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path + '.' + ext;
    fs.renameSync(path,newPath)
    uploadedFiles.push(newPath.replace('Uploads\\','') );
}
res.json(uploadedFiles);
});

app.post('/places',(req,res)=>{
    const {token}=req.cookies;
    const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuest,price}=req.body;
    jwt.verify(token , jwtSecret , {} , async (err,user)=>{
        if(err) throw err;
        const placeDoc=await place.create({
            owner:user.id,
            title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuest,price
        });
        res.json(placeDoc)
    });
});

app.get('/user-places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token , jwtSecret , {} , async(err,user)=>{
    const {id}=user;
    res.json( await place.find({owner:id}))
    });
});

app.get('/places/:id',async (req,res)=>{
const {id}=req.params;
res.json(await place.findById(id));
});

app.put('/places', async (req,res)=>{
    const {token}=req.cookies;
    const {id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuest,price}=req.body;
    jwt.verify(token , jwtSecret , {} , async(err,user)=>{
        if(err) throw err;
        const placeDoc= await place.findById(id);
        if(user.id===placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuest,price
            });
            placeDoc.save();
            res.json("ok");
        }

    });
});


app.get('/places', async (req,res)=>{
res.json(await place.find());
});

app.post('/bookings', async (req,res)=>{
    const user=await getDataFromToken(req);
    const {place,checkIn,checkOut,maxGuest,name,mobile,price}=req.body;
    booking.create({
        place,checkIn,checkOut,maxGuest,name,mobile,price,user:user.id
    }).then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
throw err;
    });
});

function getDataFromToken(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token , jwtSecret , {} , async(err,user)=>{
            if(err) throw err;
            resolve(user);
        });
    });
};

app.get('/bookings', async (req,res )=>{
   const user=await getDataFromToken(req);
   res.json( await booking.find({user:user.id}).populate('place'))
})



app.listen(4000);