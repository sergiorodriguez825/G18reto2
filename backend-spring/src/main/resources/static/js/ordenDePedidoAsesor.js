$(document).ready(function () {
  cargarProductos();
  cargarFechaDeHoy();
});
var orden;
function cargarFechaDeHoy() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  $("#registerDay").val(today);
}
var productosActuales = [];
function cargarProductos() {
  $("#tablaProductos").empty();
  $.ajax({
    url: "/api/chocolate/all",
    type: "GET",
    dataType: "json",
    contentType: "aplication/JSON",
    success: function (productos) {
      productosActuales = productos;
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
        <th scope="col">Precio ($)</th>
        <th scope="col">Foto</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>`;
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    txt += `
          <tr>
            <td scope="row">${producto.reference}</td>
            <td>${producto.category}</td>
            <td>${producto.description}</td>
            <td>${producto.price}</td>
            <td>${producto.photography}</td>
            <td>
              <div class="d-grid gap-2">
                  <button class="btn btn-primary btn-sm" type="button" onclick=agregarALaOrden("${producto.reference}")  >Agregar a la orden</button>
              </div>
           </td>
          </tr>
        `;
  }
  txt += `</tbody>`;
  $("#tablaProductos").append(txt);
  $("#tablaProductos").css({ "font-size": "12px" });
}

function agregarALaOrden(reference) {
  const producto = buscarProducto(reference);
  let txt = `
    <tr>
        <td>
        ${producto.reference}
        </td>
        <td>${producto.price}</td>
        <td>
        <div class="input-group ">
            <input type="number" id="cant-${producto.reference}" class="form-control cantidad" placeholder="Cantidad" aria-label="cantidad" aria-describedby="basic-addon1" value="1">
        </div>
        </td>
        <td><button id="el-${producto.reference}" class="btn btn-secondary eliminar"  >Eliminar</button></td>
    </tr>
  `;

  $("#bodyTablaProductosEnOrden").append(txt);
  $(".cantidad").off("change");
  $(".cantidad").change(function () {
    let num = parseInt($(this).val());
    if (num <= 0) {
      $(this).val(1);
    }
  });
  $(".eliminar").off("click");
  $(".eliminar").click(function () {
    console.log(this);
    $(this).parent().parent().remove();
  });
}

function buscarProducto(reference) {
  for (let i = 0; i < productosActuales.length; i++) {
    const producto = productosActuales[i];
    if (producto.reference === reference) {
      return producto;
    }
  }
}

function crearOrden() {
  filas = $("#bodyTablaProductosEnOrden").children();
  orden = { id: null };
  orden.registerDay = $("#registerDay").val();
  orden.status = "Pendiente";
  let vendedor = JSON.parse(sessionStorage.getItem("user"));
  orden.salesMan = vendedor;
  orden.products = {};
  orden.quantities = {};
  if (filas.length === 0) {
    alert("No se puede crear la orden.\nDebe registrar al menos un producto");
  } else {
    for (let i = 0; i < filas.length; i++) {
      cellsData = $(filas[i]).children();
      for (let j = 0; j < cellsData.length; j++) {
        let reference = $(cellsData[0]).text().trim();
        let producto = buscarProducto(reference);
        let cantidad = parseInt($("#cant-" + reference).val());
        orden.products[reference] = producto;
        orden.quantities[reference] = cantidad;
      }
    }
    registrarOrden();
  }
}

function registrarOrden() {
  let dataToSend = JSON.stringify(orden);
  $.ajax({
    url: "/api/order/new",
    type: "POST",
    data: dataToSend,
    datatype: "JSON",
    contentType: "application/json",
    success: function (order) {
      alert("Orden registrada. El coordinador de su zona revisará su pedido");
      location.href = "ordenDePedido.html";
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Algo fallo");
    },
  });
}

$("#crearOrden").click(function (e) {
  e.preventDefault();
  crearOrden();
});
