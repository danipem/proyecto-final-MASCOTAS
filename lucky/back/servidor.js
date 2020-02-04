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




rutasAPI.route("/compraremail73hg4h4").post((req, res) => {
 
    Usuario.findOne({email: req.body.email},(error, usuario) => {

        if (error){
            res.json({
                status: res.status(400),
                mensaje: "error",
                valido: false,
                error: error
            })
        }else{
            if(usuario===null){
                res.json({
                    mensaje: "Usuario no existe",
                    valido: false
                })
            }else{
                res.json({
                    mensaje: "Usuario existe",
                    valido: true
                })
            }
        }
    })
})

rutasAPI.route("/login").post((req, res) => {

    Usuario.findOne({email: req.body.email, password: req.body.password},(error, usuario) => {

     if (error){
         res.json({
             status: res.status(400),
             mensaje: "error",
             valido: false,
             error: error
         })
     }
     else{
        if(usuario === null){
            res.json({
                mensaje: "incorrecto",
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
     }

    })

})

rutasAPI.route("/registro").post((req, res)=>{

    Usuario.findOne({email: req.body.email},(error, usuario)=>{

        if (error){
            res.json({
                status: res.status(400),
                mensaje: "error",
                valido: false,
                error: error
            })
        }
        else{
           if(usuario === null){
               let nuevoUsuario = new Usuario(req.body);
               let promesaDeGuardado = nuevoUsuario.save();
               promesaDeGuardado.then(datos =>{
                   res.json({
                       mensaje: "Usuario insertado correctamente",
                       valido: true,
                       usuario: usuario
                    })
               })
               
           }else{
               res.json({
                   mensaje: "Usuario Ya existente, no te puedes registrar con este mail",
                   valido: false,
                   usuario: usuario
               })
           }
        }

    })
   //metodo save, devuelve una promesa de guardar
    /*
  promesaDeGuardado.then(usuario=>{
      //mostramos el status 200 si se ha insertado correctamente
      if(usuario === null){
        res.json({
            mensaje: "Usuario Incorrecto",
            valido: false
        })
      }else{
        res.json({
            mensaje: "Usuario Correcto",
            valido: true
        })
      }
      
  })
  promesaDeGuardado.catch(err=>{
      res.status(400).send("error usuario no se guardo ")
  })*/

  console.log("Usuario registrado");

});

// POSTMAN: método:GET, ruta: http://127.0.0.1:4000/api/lucky/protectoras
rutasAPI.route("/protectoras").get(function (reqPeticionHttp, resRespuestaHttp) { //enrutamos la raiz de la ruta, metodo GET
  Protectoras.find(function (err, Protectoras) { //le decimos al esquema de mongoose, "busca todo "
      //y cuando hayas encontrado invocas a la function err, (va a pasar tanto el error como los datos)
      if (err) {
          console.log("err"); //si error contiene un error mostramos el error en consola
          // y si todo ha ido bien `pedimos devolver la coleccion en formato JSON
      } else {
          resRespuestaHttp.json(Protectoras);
          //se invoca a la query db.protectoras.find(), es un método de mongoose
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

// POSTMAN: método:GET, ruta: http://127.0.0.1:4000/api/lucky/filtros
rutasAPI.route("/filtros").get(function (req, res) {
    // let especie = null || req.body.datos.especie
    console.log(req.params.tamano)
    // OBLIGATORIO MARCAR UNA OPCIÓN DE CADA FILTRO
    Animal.find(
        {$and:[ { ciudad: req.body.ciudad}, 
               { "datos.especie": req.body.datos.especie },
               { "datos.tipo": req.body.datos.tipo },
               { "datos.tamano": req.body.datos.tamano},
               { "datos.sexo": req.body.datos.sexo },
               { "datos.edad": req.body.datos.edad }
             ]},
        // {$or:[{"datos.tamano": req.params.tamano},{sexo: req.body.sexo},{edad: req.body.edad},
        // {ciudad: req.body.ciudad},{"datos.especie": req.params.especie}]},
        function (err, coleccionAnimales) {
        if (err) {
            console.log("err");
        } else {
            console.log(coleccionAnimales)
            res.json(coleccionAnimales);
        }
    });
});

rutasAPI.route("/perfil-animal/:id").get((req,res)=>{

    let id = req.params.id;
    Animal.findById(id,(err, animal)=>{
        if(err){
            console.log('ERROR');
            res.json({"mensaje": "error"})
        }else{
            console.log(animal)
            res.json(animal)
        }

    })
    

});
/*
rutasAPI.route("/registro").post((req, res)=>{
    //Cojo todo el cuerpo entero que me viene de la respuesta. Estoy invocando al schema del modelo.js
    let nuevoUsuario = new Usuario(req.body);
    let promesaDeGuardado = nuevoUsuario.save(); //metodo save, devuelve una promesa de guardar

    promesaDeGuardado.then(usuario=>{
        //mostramos el status 200 si se ha insertado correctamente
        res.status(200).json({
            "Usuario": "Usuario Guardado"
        })
    })
    //Muestro el status 400 si ha ocurrio un error
    promesaDeGuardado.catch(err=>{
        res.status(400).send("Se fue a la verga")
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
*/
