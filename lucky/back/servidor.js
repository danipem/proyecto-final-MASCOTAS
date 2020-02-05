const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./modelos/usuarios');
const cors = require('cors'); // es una libreria
const app = express();
const PORT = 4000;
const Protectoras = require('./modelos/protectoras');
const Animal = require('./modelos/animales');
const Adopcions = require('./modelos/adopcions');

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

});

rutasAPI.route("/modificar/:id").put((req,res)=>{
    let user = new Usuario(req.body);
    //user._id =  req.params.id;

    console.log(user);

    Usuario.findById({"_id": req.params.id}, (err, usuario)=>{
        
        if(err){
            res.json({
                valido: false,
                mensaje: "Error en la consulta a la base de datos"
            })
        }else{
            if(usuario === null){
                res.json({
                    valido: false,
                    mensaje: "Este usuario no existe"
                })
            }else{
                for (const prop in req.body) {
                    usuario[prop] = req.body[prop]
                }
        
                usuario.save()
                console.log("Obj construido " + usuario);
                
                res.json({
                    valido: true,
                    mensaje: "Correcto",
                    usuario: usuario
                })
            }
        }
    })

})

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
rutasAPI.route("/animales").get((req, res) => {
    Animal.find((err, animal)=>{
      if (err) {
        res.json({
          mensaje: "Error",
          valido: false
        })
      }else{
        if(animal === null){
          res.json({
            valido: false,
            mensaje: "No hay animales"
          })
        }else{
          res.json({
            valido: true,
            mensaje: "Correcto",
            animales: animal
          });
        }
      }
    });
});

// POSTMAN: método:GET, ruta: http://127.0.0.1:4000/api/lucky/filtros
rutasAPI.route("/filtros").post(function (req, res) {
    // let especie = null || req.body.datos.especie
    //console.log(req.params.tamano)
    // OBLIGATORIO MARCAR UNA OPCIÓN DE CADA FILTRO
    console.log(req.body)
    Animal.find(
        {$and:[ { ciudad: req.body.ciudad},
               { "datos.especie": req.body.especie },
               { "datos.tipo": req.body.tipo },
               { "datos.tamano": req.body.size},
               { "datos.sexo": req.body.genero },
               { "datos.edad": req.body.edad }
             ]},
        // {$or:[{"datos.tamano": req.params.tamano},{sexo: req.body.sexo},{edad: req.body.edad},
        // {ciudad: req.body.ciudad},{"datos.especie": req.params.especie}]},
        function (err, coleccionAnimales) {
        if (err) {
            console.log("err");
            res.json({
                valido: false,
                mensaje: err
            })
        } else {
            if(coleccionAnimales === null){
                res.json({
                    valido: false,
                    mensaje: "Error"
                })
            }else{
                console.log(coleccionAnimales)
                res.json({
                    valido: true,
                    mensaje: "Correcto",
                    animales: coleccionAnimales
                });
            }
            
        }
    });
});

rutasAPI.route("/tiposAnimales/:especie").get(async (req,res)=>{

    let especie = req.params.especie;

    console.log(especie)
    
    //let especie2 = req.body.datos.especie;
    //console.log(especie2);

    await Animal.find({"datos.especie" : especie}, (err, animales) =>{
        if(err){
            res.json({
                valido: false,
                mensaje: "Error",
            })
        }else{
            if(animales === null){
                res.json({
                    valido: false,
                    mensaje: "No existen",
                })
            }else{
                res.json({
                    valido: true,
                    mensaje: "Existe",
                    animales: animales
                })
            }
        }
    })

})

rutasAPI.route("/perfil-animal/:id").get((req,res)=>{

    let id = req.params.id;
    
    Animal.findById(id,(err, animal)=>{
        if(err){
            console.log('ERROR');
            res.json({
                mensaje: "error",
                status: res.status(400),
                valido: false,
                error: error
                })
        }else{
            if(animal === null){
                res.json({
                    mensaje: "incorrecto",
                    valido: false,
                })
            }else{
                res.json({
                    mensaje: "Animal correcto",
                    valido: true,
                    animal: animal
                })
                console.log(animal);
            }
        }

    })


});
// POSTMAN: método:POST, ruta: http://127.0.0.1:4000/api/lucky/adopcion
// Ya inserta parece estar bien. Pendientre de otra revisión.
rutasAPI.route("/adopcion").post((req, res) => {

    Adopcions.findOne({usuarioId: req.body.ObjectId},(error, adopcions) => {

     if (error){
         res.json({
             status: res.status(400),
             mensaje: "error",
             valido: false,
             error: error
         })
     }
     else{
        if(adopcions === null){
            let nuevaAdopcion = new Adopcions(req.body);
            let promesaDeGuardado = nuevaAdopcion.save(); //metodo save, devuelve una promesa de guardar
            promesaDeGuardado.then(adopcions => {
                console.log(JSON.stringify(adopcions));
                console.log('Datos introducidos con exito en BBDD')
            res.json({
                mensaje: "Petición de adopcion enviada con exito!!",
                valido: True,
                adopcions: adopcions
            })
        })
        }else{
            res.json({
                mensaje: "Ya tienes una peticion en curso....",
                valido: false,
                adopcions: adopcions
            })
            console.log(res.mensaje);
        }
     }

    })

})