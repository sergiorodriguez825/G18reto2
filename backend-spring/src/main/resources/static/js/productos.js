$(document).ready(function(){
    cargarProductos()
})

function cargarProductos(){
    limpiarTabla()
    $.ajax ({
        url: "/api/chocolate/all",
        type: 'GET',
        dataType: 'json',
        contentType: "aplication/JSON",
        success: function(productos){
            mostrarProductos(productos)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Algo fallo")
        }
    });
}

function mostrarProductos(productos){
    txt=""
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
    }
}

function crearProducto(producto){
    let dataToSend=JSON.stringify(producto);
    if(validarProducto(producto)){
        $.ajax ({
            url:"/api/chocolate/new",
            type:"POST",
            data:dataToSend,
            datatype:'JSON',
            contentType:'application/json',
            success: function(producto){
                if(producto.id){
                    alert("Producto creado")
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Algo fallo")
            }
        });
    }else{
        alert("Verifique los campos que ha ingresado. Revise si:\n- si su correo es válido\n- si las contraseñas coinciden\n- no tienen campos vacíos ")
    }
}

function validarProducto(producto){

}

function limpiarTabla(){
    
}