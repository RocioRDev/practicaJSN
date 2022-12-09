// Archivo javascript principal de la web

// Funcion para cargar el listado de transacciones
function cargarTransacciones() {
    console.log("Cargando transacciones");
    var transacciones;
    let ingreso = 0.0;
    let gasto = 0.0;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:5000/api/v1/transaccion/todasTransaciones", requestOptions)
        .then(response => response.text())
        .then(result => {
            transacciones = JSON.parse(result);
            for (let i = 0; i < transacciones.results; i++) {                
                if(transacciones.data.transaccion[i].cantidad < 0){                    
                    // Añadir la transaccion a la tabla con su id y ocultarla para poder borrarla despues con el id 
                    tabla.innerHTML += "<tr style='display:none'><td>" + transacciones.data.transaccion[i]._id + 
                    "<tr><td>" + transacciones.data.transaccion[i].concepto + "</td><td class='text-danger' id="+transacciones.data.transaccion[i]._id+">" + 
                    transacciones.data.transaccion[i].cantidad + "<button class='btn btn-danger' onclick=borrarTransaccion(this.parentElement)> </button> </td></tr>";                    

                    gasto += transacciones.data.transaccion[i].cantidad;
                } else {                    
                    tabla.innerHTML += "<tr style='display:none'><td id="+transacciones.data.transaccion[i]._id+">" + transacciones.data.transaccion[i]._id + 
                    "<tr><td>" + transacciones.data.transaccion[i].concepto + "</td><td class='text-success' id="+transacciones.data.transaccion[i]._id+">" + 
                    transacciones.data.transaccion[i].cantidad + "<button class='btn btn-success' onclick=borrarTransaccion(this.parentElement)> </button> </td></tr>";                    
                    
                    ingreso += transacciones.data.transaccion[i].cantidad;                    
                }                
            }
            // Actualizar el ingreso
            console.log("Ingreso: " + ingreso);
            document.getElementById("ingreso").innerHTML = ingreso + "€";
            // Actualizar el gasto
            console.log("Gasto: " + gasto);
            document.getElementById("gasto").innerHTML = gasto + "€";

            // Actualizar el saldo total
            actualizarSaldo(ingreso+gasto);            
            console.log("Terminado");            
        })
        .catch(error => console.log('error', error));

    // Obtener el id del html de la tabla
    var tabla = document.getElementById("tablaTransacciones");   
}

// Llamar a la funcion al cargar la pagina
cargarTransacciones();

// Funcion para actualizar el saldo total
function actualizarSaldo(saldo) {
    console.log("Actualizando saldo:" + saldo + "€");
    document.getElementById("saldo").innerHTML = saldo + "€";    
}

// Funcion para borrar una transaccion
function borrarTransaccion(htmlId) {
    console.log(htmlId);
    id = htmlId.id;
    console.log("Borrando transaccion: " + id);
    // Borrar la transaccion de la base de datos   
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://localhost:5000/api/v1/transaccion/borrarTransaccion/"+id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    //Actualizar la pagina
    location.reload();
}

// Funcion para procesar una transaccion y crearla en la base de datos
function procesarTransaccion(event) {
    // Evitar que se recargue la pagina
    event.preventDefault();
    console.log("Procesando transaccion");
    // Obtener los valores de los inputs
    var concepto = document.getElementById("concepto").value;
    var cantidad = document.getElementById("cantidad").value;    
    // Llamar a la base de datos para crear la transaccion
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("cantidad", cantidad);
    urlencoded.append("concepto", concepto);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/transaccion/nuevaTransaccion", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    //Actualizar la pagina
    location.reload();
}

