const cargarsesionStore =()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);

    const perfil = user.type ==='ASE' ? 'Asesor Comercial' : user.type === 'COORD' ? 'Coordinador de zona' : 'Administrador';

    const tabla= ` <table class="table">
    <tr><th>identification</th><th>name</th><th>email</th><th>zone</th><th>Perfil</th></tr>
    <body>
        <tr>
            <td >${user.identification}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.zone}</td>
            <td>${perfil}</td>
        </tr>
    </body>
    
    </table>`;

    $("#resultadoTabla").html(tabla);

}
$(document).ready(() =>{
    cargarsesionStore();
})
$(document).ready(function () {
    cargarOrdenes();
  });
  
  $("#crearOrden").click(function () {
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
    $("#id").prop("disabled",false);
    $("#crear").click(function () {
      let orden = {
        id: $("#id").val(),
        registerDay: $("#registerDay").val(),
        status: $("#status").val(),
        
      };
      crearOrden(orden);
    });
  });
  function cargarOrdenes() {
    limpiarTabla();
    $.ajax({
      url: "/api/order/all",
      type: "GET",
      dataType: "json",
      contentType: "aplication/JSON",
      success: function (orden) {
          ordenActuales=orden
          mostrarOrdenes(orden);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Algo fallo");
      },
    });
  }
  
  function mostrarOrdenes(ordenes) {
    txt = `<thead>
      <tr>
      <th scope="col">NO. Pedido</th>
       <th scope="col">Fecha</th>
        <th scope="col">Estado</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>`;
    for (let i = 0; i < ordenes.length; i++) {
      const orden = ordenes[i];
    
      txt += `
          <tr>
            <td scope="row">${orden.id}</td>
            <td>${orden.registerDay}</td>
            <td>${orden.status}</td>
            <td>
              <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="button" onclick=verOrden("${orden.id}") data-bs-toggle="modal"
                  data-bs-target="#modalOrden" >Ver Orden</button>
              </div>
           </td>
          </tr>
        `;
    }
    txt += `</tbody>`;
    $("#tablaOrdenes").append(txt);
  }
  
   var orden;
  function verOrden(id){
    $("#tablapedido").empty() 
    $("#tablaProductos").empty();
       orden = findById(parseInt(id))
      let texto = `<thead>
                                <th scope="col">Fecha:</th>
                                <th scope="col">No. Pedido:</th>
								<th> Estado: </th>
                            </thead>
							<tbody>
								<tr>
									<td>${orden.registerDay}</td>
									<td>${orden.id}</td>
									<td>${orden.status}</td>
								</tr>
							</tbody>`
                            $("#tablapedido").append(texto);
        let texto2 =`<thead>
        <th scope="col">Referencia</th>
        <th scope="col">Categoría</th>
        <th scope="col">Precio</th>
        <th scope="col">Descripción</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Stock</th>
        <th scope="col">Disponibilidad</th>
        <th scope="col">Foto (enlace):</th>
      
    </thead>
    <tbody>`
    const object = orden.products
    const quantities = orden.quantities
    for (const [reference, product] of Object.entries(object)) {
        texto2 +=`<tr>
        <td>${product.reference}</td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${quantities[reference]}</td>
        <td>${product.quantity}</td>
        <td>${product.availability}</td>
        <td>${product.photography}</td>
    </tr>`

    }
        
     texto2 += `</tbody>`
    $("#tablaProductos").append(texto2);
  }
  

  
  
  function limpiarTabla() {
    $("#tablapedido").empty() 
    $("#tablaProductos").empty();
    $("#tablaOrdenes").empty();
  }
  
  
  function findById(id){
      
      for (let i = 0; i < ordenActuales.length; i++) {
          let orden = ordenActuales[i];
          if (orden.id===id){
              return orden
          }
      }
      return undefined
  }
  $("#actualizarOrden").click(function() {
      let status=$("#radioOrdenaprobada").prop("checked")
      let ordenActulizada
      if(status){
        ordenActulizada={id:orden.id,"status": "Aprobada"}
      }else {
        ordenActulizada={id:orden.id,"status": "Rechazada"}
      }
      actualizarOrden(ordenActulizada) 
  })
  function cerrarModal(){
    $(".modal").modal("hide");
  }
  
  function actualizarOrden(orden){
    let dataToSend = JSON.stringify(orden)
    $.ajax({
      url: "/api/order/update",
      type: "PUT",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (orden) {
         
          alert("orden actualizada");
          cerrarModal()
          cargarOrdenes()
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Algo falló ");
      },
    });
  }