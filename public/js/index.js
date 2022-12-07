// Archivo javascript principal de la web

// Funcion para cargar el listado de transacciones
function cargarTransacciones() {
    console.log("Cargando transacciones");    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:5000/api/v1/transaccion/todasTransaciones", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // Obtener el id del html de la tabla
    var tabla = document.getElementById("tablaTransacciones");
    // Obtener las transacciones de la base de datos
    // Añadir las transacciones a la tabla
    tabla.innerHTML = "<tr><td>Compra</td><td>100€</td></tr>";
    // Actualizar el saldo total
    actualizarSaldo();
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
