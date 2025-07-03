//librerias necesarias
const express = require("express");
const app = express();
const mysqlo = require('mysql2')
const cors = require("cors");


app.use(cors());
app.use(express.json());

//Datos para la conexion a la BD
const db = mysqlo.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usuarios"
});

//Manejo de excepciones

db.connect((err) => {
    if (err) {
        console.error("Error de conexión a la BD:", err);
        return;
    }
    console.log("Conexión a MySQL exitosa!");
});


app.post("/create",(req,res)=>{

    const nombre = req.body.nombre;
    const Apellido = req.body.Apellido;
    const Telefono = req.body.Telefono;
    const Email = req.body.Email;

//Insercion de datos a la BD
    db.query('INSERT INTO empleados(nombre, apellido, telefono, email) VALUES (?,?,?,?)',[nombre,Apellido,Telefono,Email],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );

});


//Consulta de datos a la BD
app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );

});

//Actualizar datos a la BD

app.put("/update",(req,res)=>{

    const id = req.body.id;
    const nombre = req.body.nombre;
    const Apellido = req.body.Apellido;
    const Telefono = req.body.Telefono;
    const Email = req.body.Email;

//Insercion de datos a la BD
    db.query('UPDATE empleados SET nombre=?, apellido = ?, telefono = ?, email = ? WHERE id = ?',[nombre, Apellido, Telefono, Email, id],

            (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );

});


//Borrar datos de la BD

app.delete("/delete/:id",(req,res)=>{

    const id = req.params.id;
   
//Insercion de datos a la BD
    db.query('DELETE FROM empleados WHERE id = ?',id,

            (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );

});





app.listen(3001,()=>{
    console.log("Ejecutando en puerto 3001")
})