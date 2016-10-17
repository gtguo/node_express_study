var express = require('express');
var app = express();
var fortunes = [
    "Conquer your fears or they will Conquer you.",
    "Rivers need spring.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
]
//设置视图模板引擎
var handlebars = require('express3-handlebars')
                 .create({ defaultLayout:'main' } );
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');                 

// 可以通过设置环境变量PORT来覆盖3000端口
app.set('port',process.env.PORT || 3000);
//static 中间件,为静态文件创建一个路由，渲染文件并发送给客户端
app.use(express.static('./public'));
//add router info
app.get('/',function(req,res){
    res.render('home');
    //res.type('text/plain');
    //res.status(200); status 200 is default, it's ignore'
    //res.send('Meadowlark Travel');
})

app.get('/about',function(req,res){
    //math.randm产生一个0～1之间端随机数，math.floor产生一个最接近浮点数的整数，值小于等于浮点数
    var randonFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about',{fortuneggt:randonFortune});
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
})
//404 response
app.use(function(req,res){    
    //res.type('text/plain');
    res.status(404);//status number set
    res.render('404');
    //res.send('404 -NOT FOUND');
})
//500 server error
app.use(function(req,res){
    //res.type('text/plain');
    res.status(500);//status number set
    res.render('500');    
    //res.send('500 - Server Error');
})

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' +
      app.get('port') + '; press Ctrl-C to terminate');
})

