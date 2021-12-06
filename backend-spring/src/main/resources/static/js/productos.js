$(document).ready(function () {
  cargarProductos();
});
productosActuales=[]
$("#crearProducto").click(function () {
  $(".modal-footer").empty();
  let txt = `
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="d-grid gap-2">
                    <button id="crear" class="btn btn-primary" type="button">Crear</button>
                </div>
            </div>
            <div class="col">
                <div class="d-grid gap-2">
                <button class="btn btn-dark" data-bs-dismiss="modal" type="button">Regresar</button>
                </div>
            </div>
        </div>
        
    </div>`;
  $(".modal-footer").append(txt);
  $("#crear").click(function () {
    let producto = {
      reference: $("#reference").val(),
      category: $("#category").val(),
      availability: $("#radioDisponibilidadSi").prop("checked"),
      description: $("#description").val(),
      price: $("#price").val(),
      quantity: $("#quantity").val(),
      photography: $("#photo").val(),
    };
    crearProducto(producto);
  });
});
function cargarProductos() {
  limpiarTabla();
  $.ajax({
    url: "/api/chocolate/all",
    type: "GET",
    dataType: "json",
    contentType: "aplication/JSON",
    success: function (productos) {
        productosActuales=productos
        mostrarProductos(productos);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Algo fallo");
    },
  });
}

function mostrarProductos(productos) {
  txt = `<thead>
    <tr>
      <th scope="col">Referencia</th>
      <th scope="col">Categoría</th>
      <th scope="col">Descripción</th>
      <th scope="col">Disponibilidad</th>
      <th scope="col">Precio ($)</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Foto</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    let txtDisponible=""
    if(producto.availability){
        txtDisponible="Sí"
    }else{
        txtDisponible="No"
    }
    txt += `
        <tr>
          <td scope="row">${producto.reference}</td>
          <td>${producto.category}</td>
          <td>${producto.description}</td>
          <td>${txtDisponible}</td>
          <td>${producto.price}</td>
          <td>${producto.quantity}</td>
          <td>${producto.photography}</td>
          <td>
            <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button">Editar</button>
                <button class="btn btn-danger" type="button" onclick=eliminarProducto("${producto.reference}")>Eliminar</button>
            </div>
         </td>
        </tr>
      `;
  }
  txt += `</tbody>`;
  $("table").append(txt);
}

function crearProducto(producto) {
  let dataToSend = JSON.stringify(producto);
  if (validarProducto(producto)) {
    $.ajax({
      url: "/api/chocolate/new",
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (producto) {
        if (producto.reference) {
          alert("Producto creado");
          limpiarCampos();
          $(".modal").modal("hide");
          cargarProductos();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Algo fallo");
      },
    });
  } else {
  }
}

function validarProducto(producto) {
  if (
    producto.reference === "" ||
    producto.category === "" ||
    producto.availability === "" ||
    producto.price === "" ||
    producto.quantity === "" ||
    producto.photography === ""
  ) {
    alert(
      "Verifique los campos que ha ingresado. Revise si no tiene campos vacíos"
    );
    return false;
  } else if (!isNumeric(producto.price) || !isNumeric(producto.quantity)) {
    alert("Los campos de precio y cantidad deben ser numéricos");
    return false;
  }
  return true;
}

function limpiarTabla() {
  $("table").empty();
}

function limpiarCampos() {
  $("#reference").val("");
  $("#category").val("");
  $("#description").val("");
  $("#price").val("");
  $("#quantity").val("");
  $("#photo").val("");
}

function eliminarProducto(reference){
    let producto = findByReference(reference);
    let opc = confirm(`¿Está seguro que desea eliminar el producto ${producto.description}?`)
    if(opc){
        $.ajax({
            url: "/api/chocolate/"+producto.reference,
            type: "DELETE",
            datatype: "JSON",
            contentType: "application/json",
            success: function (producto) {
                alert("Producto eliminado");
                cargarProductos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("Algo fallo");
            },
          });
    }
}

function findByReference(reference){
    
    for (let i = 0; i < productosActuales.length; i++) {
        let producto = productosActuales[i];
        console.log(producto)
        if (producto.reference===reference){
            return producto
        }
    }
    return undefined
}