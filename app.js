var express=require('express'),
path=require('path'),
bodyParser=require('body-parser'),
cons=require('consolidate'),
dust=require('dustjs-helpers'),
pg=require('pg'),
app=express();

const {Pool,Client}=require('pg');


const connectionString="postgresql://postgres:ish@localhost/colgdb";
const client=new Client({

  connectionString:connectionString
});




app.engine('dust',cons.dust);

app.set('view engine','dust');
app.set('views', __dirname+'/views');

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
    
  client.connect();
  client.query('select * from colgdata',(err,result)=>{

    res.render('index',{colgdata:result.rows})


    //client.end();

  })

   
    

});

app.post('/add',(req,res)=>{

client.connect();
client.query('INSERT INTO colgdata(name,location,details) VALUES($1,$2,$3)',[req.body.name,req.body.location,req.body.details],(err,result)=>{

console.log("Values inserted");



res.redirect('/');

//client.end();

})



});


app.delete('/DELETE/:id',function(req,res){

  client.connect();
client.query('DELETE FROM colgdata where id=$1',[req.params.id],function(err, result) {
  
  if (err) {
    return console.error('error running query', err);
  }
  res.send(result);
});

});

app.get('/delete/:id', function(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
     //console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM colgdata WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});



app.post('/edit',function(req,res){

  client.connect();
  client.query('UPDATE colgdata set name=$1,location=$2,details=$3 where id=$4',[req.body.name,req.body.location,req.body.details,req.body.id],(err,result)=>{
  
  console.log("Values Updated");
  
  
  
  res.redirect('/');
  
  //client.end();
  
  })
  
  



});




app.listen(3000,function(){
    console.log('Server is running on 3000 port');
})



