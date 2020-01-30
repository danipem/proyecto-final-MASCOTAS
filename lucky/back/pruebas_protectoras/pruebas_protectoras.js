const mongoose = require('mongoose'); //importamos mongoose
const Protectoras = require('../modelos/protectoras');
mongoose.connect('mongodb://127.0.0.1:27017/luckyDB');



let newProtectora_1 =  {

  id : "1",
  nombre:"almanimal",
  email: "almanimal@hotmail.com",
  ubicacion : "madrid",
  puntuaciones: 50 ,
  telefono : "64735887"

}

let newProtectora_2 = {

  id : "2",
  nombre:"animal Aid Valencia",
  email: "animal Aid Valencia@hotmail.com",
  ubicacion : "Valencia",
  puntuaciones: 30 ,
  telefono : "64735456"


}
let newProtectora_3 = {

  id :"3",
  nombre:"adopta plasencia",
  email: "adopta plasencia@hotmail.com",
  ubicacion : "plasencia",
  puntuaciones: 50 ,
  telefono : "64735876"


}




const conexion = mongoose.connection;

//Realizamos la conexion a la base de datos y si se conecta exitosamente se muestra un mensaje.
conexion.once("open", function () {
    console.log(" 0) - Conectado a la base de datos lucky");

    let newProtectora = new Protectoras(newProtectora_3);
    let promesaDeGuardado = newProtectora.save();
    promesaDeGuardado.then(Protectoras =>{
      console.log(JSON.stringify(Protectoras));

    })
    promesaDeGuardado.catch(err =>{
      res.status(400).send("a ocurrido error")
    })
  });
