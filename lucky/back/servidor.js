const express = require('express'); //equivalente a import, es un modulo para importar modulos
const bodyParser = require('body-parser'); //TODO: importar y usar modulo middle-ware CORS
const mongoose = require('mongoose');
const Usuario = require('./modelo')
const cors = require('cors'); // es una libreria
const app = express();
const PORT = 4000; //las constantes que no van a variar nunca se ponen en mayusc

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/db_usuarios'); // es la direccion ip local (es lo mismo que localhost). Si no existe crea la bbdd y si existe se conecta

//Con esta variable me conecto a la base de datos de mongo
const conexion = mongoose.connection;

//Siempre que nos conectemos tenemos que poner open. Si se conecta satisfactoriamente se muestra el console.log
conexion.once("open", function () {
    console.log(" 0) - Mongoose on fire");
})
//TODO: 
// el middle ware es un sotware instermediario para la serializacion y 
// deserializacion (parseo) automática

//El listen muestra en que puerto estamos conectados.
app.listen(PORT, function () {
        console.log("servidor ejecutandose en " + PORT);
    }); // express funciona con funciones CallBk

const rutasAPI = express.Router();
//y este objeto va a hacer de intermediario entre URL/api/usuarios
app.use("/api/usuarios", rutasAPI);




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

/*
//http://127.0.0.1:4000/api/usuarios/registro método POST
function recibirRegistroPost(peticionHTTP, respuestaHTTP) { //es el (req, res)
    console.log(" 2) - La peticion HTTP comienza a ser procesada");

    //deberiamos recibir un JSOn con el nuevo usuario 
    //asi que creamos un Obj Schema y le pasamos el JSON ya convertido en obj JS 
    // gracias al body.Parse
    let nuevoUsuario = new Usuario(peticionHTTP.body);
    let promesaDeGuardado = nuevoUsuario.save(); //metodo save, devuelve una promesa de guardar
    promesaDeGuardado.then(usuario => { //cuando tengas datos invocas a la funcion usuario-promesa
        console.log(" 4) - Se ha registrado en bbdd");
        respuestaHTTP.status(200).json({ //status 200 indica ok y devolvemos un json 
            "Usuario": "guardado" //si esta ok devolvemos el mensaje ok
        })
    })
    promesaDeGuardado.catch(error => {
        console.log(" 4) - Se fue a la puta");
        respuestaHTTP.status(400).send("Se fue a la puta")
    });
    console.log(" 3) - la peticion HTTP ha sido procesada");

}

rutasAPI.route("/registro").post(recibirRegistroPost);
*/


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
    
});