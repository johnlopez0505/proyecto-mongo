const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get("/", (req, res) =>{
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    //console.log(user);

    if (user && bcrypt.compareSync(password, user.password)) {
        user.password = "pepito perez"; 
        req.session.user = user;
        //res.send('Inicio de sesión exitoso');
        //res.render('mensaje',{mensaje:'Inicio correcto'});
        res.redirect('/auth');
    } else {
        //res.send('Credenciales incorrectas');
        res.render('mensaje',{mensaje:'error al iniciar session'});
    }
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });

    try {
        await newUser.save();
        //res.send('Usuario registrado exitosamente');
        res.redirect("login");
    } catch (error) {
        res.send('Error al registrar el usuario');
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth');
  });

module.exports = router;
