const mongoose = require('mongoose'); //Importamos Mongoose
const Adopcions = require('./modelos/adopcions');
mongoose.connect ('mongodb://127.0.0.1:27017/luckyDB');

/* Creamos el esquema(Objeto) que nos insertara en el formulario de
adopcion en la BBDD. */

let adopcionPrueba3= {
    usuarioId: "5e330964e4fb70097d3e7108",
    masAnimal: 
        {
        cual: "Perro",
        comportamiento: "Es un perro bueno"				
        },
    eleccionAdop: "Poque mi perro esta triste ya que hace poco se murio mi otro perro y para el era su compañero",
    necesidadesAnim: true,
    gastosAnim: true,
    alimentacionAnim: "si",
    dondeVives: "Chalet",
    alquiler: false,
    caseroPermite: true,
    mudarse: false,
    jardin: true,
    vivesSolo: true,
    acuerdoAdop: true,
    visitarCasa: true

}

const conexion = mongoose.connection;
//Realizamos la conexion a la base de datos y si se conecta exitosamente se muestra un mensaje.
conexion.once("open", function () {
    console.log(" 0) - Conectado a la base de datos lucky");

    let nuevaAdopcion = new Adopcions(adopcionPrueba3);
    let promesaDeGuardado = nuevaAdopcion.save(); //metodo save, devuelve una promesa de guardar

    promesaDeGuardado.then(adopcions => {
        console.log(JSON.stringify(adopcions));
        console.log('Datos introducidos con exito en BBDD')
    })
    promesaDeGuardado.catch(err =>{
        res.status(400).send('No se ha insertado')
    })
});