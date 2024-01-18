const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

const session = require('express-session');

// para cargar configuración de la APP desde .env
const dotenv = require('dotenv');

//motor de html es pug
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

//la carpeta public tiene contenido estatico
app.use(express.static('public'));

// cargamos configuración desde .env
dotenv.config();

// Configuración middleware express-session
app.use(session({
    secret: 'unsupersecretoinconfesable',
    resave: true,
    saveUninitialized: false
  }));

// Middleware para pasar información de sesión a las vistas
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  if (!req.session.user){
    if(req.path.startsWith("/auth/login") || req.path.startsWith("/auth/register")){
      // Si el usuario está intentando acceder a la página de login o registro, permitir el acceso.
      return next();
    }else{
      // Si el usuario no está autenticado y no está intentando acceder a las páginas de login o registro,
      // redirigir a la página de login.
      return res.redirect("/auth/login");
    }
  }
  next();
});

// nos conectamos a la base de datos 
mongoose.connect(process.env.MONGO_URI);

const authRouter = require('./routes/auth');

app.use('/auth',authRouter);

app.get('/', (req,res)=>{
    res.redirect('/auth');
})

const alumnoRouter = require('./routes/alumnos');

app.use('/alumno',alumnoRouter)

app.get('/', (req,res)=>{
  res.redirect('/alumnos');
})


app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${process.env.BACKEND_PORT}`);
});