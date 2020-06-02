const express=require('express')
const app=express()
const path =require('path');


app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.post("/alert",(req,res)=>{
    let data=req.body;
    if(data.status=='active'){
        console.log('ACTIVANDO PROTOCOLOS DE SEGURIDAD')
    }
    res.sendStatus(200)
})

app.get("/*",(req,res)=>{
	res.sendFile(path.join(__dirname+"/public/index.html"))
})

app.listen(process.env.PORT || 8080,()=>{
	console.log("SERVER 200OK")
})
