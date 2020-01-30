const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./modelos/usuarios')
const cors = require('cors'); // es una libreria
const app = express();
const PORT = 4000; //las constantes que no van a variar nunca se ponen en mayusc
const protectoras = require('./modelos/protectoras');
const Animal = require('./modelos/animales')

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
                valido: false
            })
        }else{
            res.json({
                mensaje: "Usuario correcto",
                valido: true
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

})


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

    console.log("La request ha sido procesada")

});




rutasAPI.route("/listado").get(function (reqPeticionHttp, resRespuestaHttp) { //enrutamos la raiz de la ruta, metodo GET
    Usuario.find(function (err, coleccionUsuarios) { //le decimos al esquema de mongoose, "busca todo "
        //y cuando hayas encontrado invocas a la function err, (va a pasar tanto el error como los datos)
        if (err) {
            console.log("err"); //si error contiene un error mostramos el error en consola
            // y si todo ha ido bien `pedimos devolver la coleccion en formato JSON
        } else {
            resRespuestaHttp.json(coleccionUsuarios);
            //se invoca a la query db.Usuarios.find(), es un método de mongoose
        }
    });
});

rutasAPI.route("/eliminar/:id").delete((req, res) => {
    let idUsuario = req.params.id;

    if(idUsuario === "undefined"){
        res.json( {
            mensaje: "Error no es posible eliminar a un usuario que no existe"
        })
    }else{
        Usuario.findByIdAndDelete(idUsuario, (err) => {
            if (err) {
                console.log('ERRORRRRR!!!')
                res.status = 500
                res.json( {
                    mensaje: "Error interno "+status+ " " + err.toString()
                })
            } else {
                console.log('AAACIERTOOOO!!!');

                res.json( {
                    mensaje: "OK"
                })

            }
        })
    }

})

rutasAPI.route("/editado/:id").get(async(req,res) => {

    let idUsuario = req.params.id;
    if( idUsuario === "undefined"){
        res.json({
            mensaje:  "No es posible editar a un usuario que no existe"
        })
    }else{
        //Para que espere
        await
        Usuario.findById(idUsuario, (error, usuario) => {
            if (error) {
                console.log("Error al obtener el usuario con id "+ idUsuario);
            } else {
                res.json(usuario);
            }
        })
    }

})

rutasAPI.route("/editar/:id").put(function (req, res) {
    let user = new Usuario(req.body);
    user._id = req.params.id;

    Usuario.findById(user._id, function (err, us) {

        for (const prop in req.body) {
            us[prop] = req.body[prop]
        }

        us.save()
        console.log("Obj construido " + us);

        if(err){
            res.json({
                mensaje: 'Error al actualizar el usuario'
            });
        }else{
            res.json({
                status: 'Empleado actualizado',
                mensaje: 'editado'
            });
        }
    })

});*/
