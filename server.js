const express=require('express')
const app=express()
const request=require('request') 

//Middlewares  ejs is a templating language
app.set("view engine","ejs")

app.get("/", (req, res) => {  //response and request //request is sending some id and getting access
    
 
  res.render("home") // to display html page we use render
  
})

app.get("/student", (req, res) => {
    res.send('kill')
   })
 
app.get("/student/:rollno", (req, res) => {
    console.log(req.params)
    //template string in js
     res.send(`You are viewing profile of student with rollno ${req.params.rollno}`)
    })
     
app.get("/result", (req, res) => {
    console.log(req.query)
    // res.send(`you searched for ${req.query.Moviename}`)
   const url=`http://www.omdbapi.com/?apikey=cfd672ef&s=${req.query.Moviename}` 
   request(url,function(error,response,body){

       if(!error && response.statusCode===200)
       {
           const data=JSON.parse(body)
          // res.send(data)
          res.render('result',{moviesDump:data})
       }
       else{
        res.send('something went wrong')
       }
    })
})

/*app.get('/result/:id', (req, res)=>{ 
    const url=`http://www.omdbapi.com/?apikey=cfd672ef&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body) 
            res.render('detail', {data: data})
        }else{
            res.send('Something went wrong')
        }
    })
})
*/
app.get('/result/:id/info', (req, res)=>{ 
    const url=`http://www.omdbapi.com/?apikey=cfd672ef&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body) 
            res.render('info', {movie: data})
        }else{
            res.send('Something went wrong')
        }
    })
})

app.get('*',(req,res)=>{
    res.send('Invalid Route')
})

app.listen(5000,()=>{

    console.log('server has started')
})