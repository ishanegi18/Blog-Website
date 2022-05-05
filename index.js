
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const validationMiddleware = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash');

app.use(expressSession({
  resave : true,
  saveUninitialized : true,
  secret : 'keyboard cat'
}))

global.loggedIn = null;

app.use("*",(req,res,next)=>{
  loggedIn = req.session.userId;
  next()
})

app.set('view engine', 'ejs') 
app.use(fileUpload())
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(3000,()=>{
    console.log("App is listening to port 3000")
})


mongoose.connect('mongodb+srv://isha:Isha%40123@cluster0.q8cds.mongodb.net', {useNewUrlParser: true})

const customeMiddleware = (req,res,next)=>{
  console.log("This is my custom Middleware");
  next();
}
app.use(flash());
app.use(customeMiddleware);
app.use('/posts/store',validationMiddleware);

app.get('/',homeController)

// app.get('/about',(req,res)=>{
//         res.render('about')
//       })
// app.get('/contact',(req,res)=>{
//         res.render('contact')
//       })

// app.get('/post',(req,res)=>{
//         res.render('post')
//       })

app.get('/posts/new',newPostController)
      
app.get('/post/:id',getPostController)

app.get('/auth/register',newUserController)

app.post('/posts/store',storePostController)

app.get('/auth/login',loginController)



app.post('/users/register',storeUserController)




app.get('/posts/new',authMiddleware,newPostController)

app.post('/posts/store',authMiddleware,storePostController)

app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)

app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)

app.post('/auth/login',redirectIfAuthenticatedMiddleware,loginUserController)

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)

app.get('/auth/login',loginController)

app.get('/auth/logout',logoutController)

app.use((req,res)=> res.render('notfound'))



  

  