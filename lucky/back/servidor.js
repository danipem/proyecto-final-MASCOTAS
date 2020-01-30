const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./modelos/usuarios');
const cors = require('cors'); // es una libreria
const app = express();
const PORT = 4000; //las constantes que no van a variar nunca se ponen en mayusc
const Protectoras = require('./modelos/protectoras');
const Animal = require('./modelos/animales');

app.use(bodyParser.json());
app.use(cors());

//Conexión a la base de datos luckyDB. Si la base de datos no existe será creada.
mongoose.connect('mongodb://127.0.0.1:27017/luckyDB'); // es la direccion ip local (es lo mismo que localhost).

//Variable con la que conectaremos a la base de datos de mongoo
const conexion = mongoose.connection;

//Realizamos la conexion a la base de datos y si se conecta exitosamente se muestra un mensaje.
conexion.once("open", function () {
  console.log(" 0) - Conectado a la base de datos lucky");
})

//Función que nos muestra el puerto al que estamos conectados. Actualmente no lo necesitamos así que
//hemos comentado el mensaje
app.listen(PORT, function () {

  //console.log("servidor ejecutandose en " + PORT);

});

const rutasAPI = express.Router();

//Va a ser nuestro intermediario en la URL.
app.use("/api/lucky", rutasAPI);



rutasAPI.route("/login").post((req, res) => {

    Usuario.findOne({email: req.body.email, password: req.body.password},(error, usuario) => {

        if(usuario === null){
            res.json({
                mensaje: "Usuario incorrecto",
                valido: false,
                usuario: usuario
            })
        }else{
            res.json({
                mensaje: "Usuario correcto",
                valido: true,
                usuario: usuario
            })
            console.log(usuario);
        }

        if (error) {
            console.log("Usuario no valido ");
            res.json({
                mensaje: "Usuario no válido"
            })
        } else {
            res.json(usuario);
        }
    })

});


// POSTMAN: método:GET, ruta: http://127.0.0.1:4000/api/lucky/animales
rutasAPI.route("/animales").get(function (reqPeticionHttp, resRespuestaHttp) {
    Animal.find(function (err, coleccionAnimales) {
        if (err) {
            console.log("err");
        } else {
            resRespuestaHttp.json(coleccionAnimales);
        }
    });
});




