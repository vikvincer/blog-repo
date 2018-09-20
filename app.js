const path = require('path');
const jsonServer = require('json-server');
const crypto = require('crypto'),algorithm = 'aes-256-ctr', password = 'akjdfojcmc03DFITR304mcsadfJdads';
const bodyParser = require('body-parser');
const fs = require('fs');
const hash = require('object-hash');
const express = require('express');

const server = jsonServer.create();

const router = jsonServer.router('data/db.json');

const middlewares = jsonServer.defaults();

const port =  process.env.PORT || 8080;

server.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var encrypt = (text)=>{
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

var decrypt = (text)=>{
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

var fetchData = () => {
    try {
        return  JSON.parse(fs.readFileSync('./data/userdb.json'));
    } catch (error) {
        return [];
    }
};

var saveData = (data) => {
    fs.writeFileSync('./data/userdb.json',JSON.stringify(data),function(err){
        if(err){
            return false;
        }else {
            return true;
        }
    });
};

server.use(bodyParser());

server.use('/registration',(req,res,next)=>{
    if (req.method === 'POST') {
        console.log(req.body);
        if(req.body.username !== '' && req.body.password !== '') {
            var usersData = fetchData();
            var duplicate = usersData.users.filter((data)=>data.username === req.body.username);
            if(duplicate.length === 0) {
                usersData.users.push(
                    {
                        id: hash({username: req.body.username}),
                        username: req.body.username,
                        password: encrypt(req.body.password)
                    }
                )
                saveData(usersData);
                res.json({success:true,message:'User successfully registered!'})
            }else {
                res.json({success:false,message:'Username already exists!'})
            }
        } else {
            res.json({"success":false,message:"Invalid request"});
        }
    } else {
        res.json({"success":false,message:"Invalid request"});
    }
});

// server.use(bodyParser());
server.use('/loginuser',(req,res,next)=>{
    if (req.method === 'POST') {
        console.log(req.body);
        if(req.body.username !== '' && req.body.password !== '') {
            var usersData = fetchData();
            var userIndex =  usersData.users.findIndex(data=>data.username == req.body.username);
            console.log('userinedex',req.body.username)
            if(userIndex !== -1) {
                if( usersData.users[userIndex].password === encrypt(req.body.password)) {
                    res.json({success:true,message:'Authentication success.',token:`${usersData.users[userIndex].id}`})
                } else {
                    res.json({success:false,message:'Invalid password!'})
                }
            } else {
                res.json({success:false,message:`Username does not exist!`})
            }
        }
    } else {
        res.json({success:false,message:'Invalid request'})
    }
})



server.use(middlewares);

server.use('/api',router);


server.use(express.static(path.join(__dirname,'public')));

server.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

server.listen(port,()=>{
    console.log('Server started on port: '+port)
});