 require('dotenv').config();

 const path = require('path');
 const expres = require('express');
 const morgan = require('morgan');
 const mongoose = require('mongoose');



 const app = expres(); 

 //connecting to db
 console.log(process.env.MONGODB_URI)
 mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(db => console.log("DB connected..."))
.catch(err => console.log(err));

 // importing routes
 const indexRoutes = require('./routes/index'); // enrutador


 // settings
 app.set('port', process.env.PORT || 3001)
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 // middlewares
 app.use(morgan('dev'));
 app.use(expres.urlencoded({extended: false}));//entender los datos que llegan desde un formulario html-texto

 // routes
 app.use('/', indexRoutes);

 // starting the server

 app.listen(app.get('port'), () => {
     console.log(`Server on port ${app.get('port')}`)
 });