mongoose.connect('mongodb://127.0.0.1:27017/luckyDB');



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
  promesaDeGuardado.catch(err=>{
      res.status(400).send("error usuario no se guardo ")
  })

  console.log("La request ha sido procesada")

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
