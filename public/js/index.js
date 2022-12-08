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
                console.log("Añadiendo transaccion");
                if(transacciones.data.transaccion[i].cantidad < 0){
                    console.log("Gasto");
                    tabla.innerHTML += "<tr><td>" + transacciones.data.transaccion[i].concepto + "</td><td class='text-danger'>" + transacciones.data.transaccion[i].cantidad + "</td></tr>";
                    gasto += transacciones.data.transaccion[i].cantidad;
                } else {
                    console.log("Ingreso");
                    tabla.innerHTML += "<tr><td>" + transacciones.data.transaccion[i].concepto + "</td><td class='text-success'>" + transacciones.data.transaccion[i].cantidad + "</td></tr>";
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
            actualizarSaldo();
            console.log(result);            
        })
        .catch(error => console.log('error', error));

    // Obtener el id del html de la tabla
    var tabla = document.getElementById("tablaTransacciones");
    // Obtener las transacciones de la base de datos
    // Añadir todas las transacciones a la tabla    
    // for (let i = 0; i < result.results; i++) {
    //     console.log("Añadiendo transaccion");
    //     tabla.innerHTML += "<tr><td>Compra</td><td>100€</td></tr>";
    // }

    // tabla.innerHTML = "<tr><td>Compra</td><td>100€</td></tr>";
    // Actualizar el saldo total
    
}

// Llamar a la funcion al cargar la pagina
cargarTransacciones();

// Funcion para actualizar el saldo total
function actualizarSaldo() {
    console.log("Actualizando saldo");
    // Obtener el id del html del saldo
    var saldo = document.getElementById("saldo");
    // Calcular el saldo total
    // Actualizar el saldo en el html
    saldo.innerHTML = "100€";
}
