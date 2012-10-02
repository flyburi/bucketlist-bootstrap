
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //브라우저가 DELETE 같은 메소드는 이해하지 못하기 때문입니다만, 관례적인 방식으로 이런 문제를 회피할 수 있습니다. 
  //폼의 히든(hidden) 태그 변수를 사용하면 Express는 DELETE같은 메소드를 ‘실제’ HTTP 메소드처럼 해석합니다.
  //이런 식의 RESTful API사용 접근은 우아하지 못한 듯 보일 수 있지만, 이런 관례적 처리방식은 많은 웹 애플리케이션에서 장점을 가집니다.
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions : true, showStack : true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

var api = require('./routes/api.js');
app.get('/', api.index);
app.post('/create', api.create);
app.get('/list', api.list);
app.del('/del/:id', api.del);
app.put('/update/:id', api.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
