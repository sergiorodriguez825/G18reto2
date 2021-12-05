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
    txt=`<thead>
    <tr>
      <th scope="col">Referencia</th>
      <th scope="col">Categoría</th>
      <th scope="col">Descripción</th>
      <th scope="col">Disponibilidad</th>
      <th scope="col">Precio</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Foto</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>`
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        txt+= `
        <tr>
          <td scope="row">${producto.reference}</td>
          <td>${producto.category}</td>
          <td>${producto.description}</td>
          
          <td>${producto.availability}</td>
          <td>${producto.price}</td>
          <td>${producto.quantity}</td>
          <td>${producto.photography}</td>
          <td> <button class="btn btn-primary">Editar</button> <button class="btn btn-error">Eliminar</button></td>
        </tr>
      `
    }
    txt+=`</tbody>`
    $("table").append(txt)
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
    $("table").empty();
}