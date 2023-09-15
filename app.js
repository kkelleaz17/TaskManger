const express = require('express')
const bodyParser = require('body-parser');
const app = express();


var tasks = [];


app.set('view engine','ejs')
app.set('views','./Views')
app.use(express.static(__dirname+'/Views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('home',{List:tasks})
})

app.post('/MakeNewTask',(req,res)=>{
    var task = req.body.task
    tasks.push({task:task,timestamp:new Date(),id:tasks.length})
    res.redirect('/');
})


app.get('/delete/:id',(req,res)=>{
    var nodeid = Number(req.params.id);
       tasks = tasks.filter(e=>{
        console.log(e.id, nodeid)
        return e.id != nodeid
       })
    res.redirect('/');
})

app.get('/edit/:id',(req,res)=>{
   /// console.log
    var nodeid = Number(req.params.id);

    var editing = tasks.find(t=>nodeid === t.id)
    console.log(editing)
    if(!editing){
        res.redirect('/')
    }
    res.render('edit',{EditTask:editing})
})

app.listen(4000,()=>{
    console.log('Up on 4000')
})
