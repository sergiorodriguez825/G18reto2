$(document).ready(function () {
  cargarUsuarios();
});

var usuariosActuales = [];
$("#registrarUsuario").click(function () {
  limpiarCampos()
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
                <button id="regresar" class="btn btn-dark" data-bs-dismiss="modal" type="button">Regresar</button>
                </div>
            </div>
        </div>
        
    </div>`;
  $(".modal-footer").append(txt);
  $("#crear").click(function () {
    let usuario = {
      identification: $("#identification").val(),
      name: $("#name").val(),
      address: $("#address").val(),
      cellPhone: $("#cellphone").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      zone: $("#zone").val(),
      type: $("#type").val(),
    };
    
    crearUsuario(usuario);
  });
  $("#regresar").click(function(){
    limpiarCampos()
  })
});
function cargarUsuarios() {
  $.ajax({
    url: "/api/user/all",
    type: "GET",
    datatype: "JSON",
    contentType: "application/json",
    success: function (usuarios) {
      usuariosActuales = usuarios;
      cargarTabla(usuarios);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Algo fallo");
    },
  });
}
function cargarTabla(usuarios) {
  $("#tablaUsuarios").empty();
  let txt = `
    <thead>
          <th>Identificación</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Zona</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </thead>
        <tbody>  
    `;
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    txt += `
        <tr>
            <td>${usuario.identification}</td>
            <td>${usuario.name}</td>
            <td>${usuario.address}</td>
            <td>${usuario.cellPhone}</td>
            <td>${usuario.email}</td>
            <td>${usuario.zone}</td>
            <td>${usuario.type}</td>
            <td><button class="btn btn-primary" type="button" onclick=editarUsuario("${usuario.id}") data-bs-toggle="modal"
            data-bs-target="#modalUsuario" >Editar</button>
            <button class="btn btn-danger" type="button" onclick=eliminarUsuario("${usuario.id}")>Eliminar</button></td>
          </tr>
        `;
  }
  txt += "</tbody>";
  $("#tablaUsuarios").append(txt);
}
var correoValido = false;
function registrarse() {
  if (validar() == true) {
    let correo = $("#useremail").val();
    validarExisteEmail(correo, true);
  }
}

function crearUsuario(usuario) {
  let dataToSend = JSON.stringify(usuario);
  values=[validar(),validaContraseña(),correoValido]
  console.log(values)
  if (validar() == true && validaContraseña() == true && correoValido) {
    $.ajax({
      url: "/api/user/new",
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (user) {
          console.log(user)
        if (user.name) {
          limpiarCampos();
          alert("Nuevo Usuario Creado");
          $(".modal").modal("hide");
          cargarUsuarios()
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Algo fallo");
      },
    });
  } else {
    alert(
      "Verifique los campos que ha ingresado. Revise si:\n- si su correo es válido\n- si las contraseñas coinciden\n- no tienen campos vacíos "
    );
  }
}

function validarExisteEmail(email, crear,actualizar=false) {
  //Generar una peticion tipo ajax para validar login
  $.ajax({
    url: "/api/user/emailexist/" + email,
    type: "GET",
    dataType: "json",
    contentType: "aplication/JSON",
    success: function (respuesta) {
      console.log(respuesta);
      if (respuesta == true) {
        mostrarFormatoInvalido(
          (texto = "Ya existe una cuenta asociada a este email")
        );
        correoValido = false;
      } else if(actualizar){
        correoValido = true;
      } else {
            correoValido=true
        }
      
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Algo fallo");
    },
  });
}

function validar() {
  //obtiene valores
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let passwordrepeat = $("#passwordrepeat").val();
  if (validarFormatoCorreo(email)) {
    if (validaesVacio(email)) {
      errores = "email vacio<br>";
      alert("Todos los campos deben estar completos");
      $("#email").focus();
      return false;
    } else if (validaesVacio(password)) {
      errores = "password vacio<br>";
      alert("Todos los campos deben estar completos");
      $("#password").focus();
      return false;
    } else {
      return true;
    }
  } else {
    mostrarFormatoInvalido();
  }

  //valida que los campos no sean vacios
  if (validaesVacio(name)) {
    errores = "name vacio<br>";
    alert("Todos los campos deben estar completos");
    $("#username").focus();
    return false;
  } else if (validaesVacio(email)) {
    errores = "email vacio<br>";
    alert("Todos los campos deben estar completos");
    $("#useremail").focus();
    return false;
  } else if (validaesVacio(password)) {
    errores = "password vacio<br>";
    alert("Todos los campos deben estar completos");
    $("#password").focus();
    return false;
  } else if (validaesVacio(passwordrepeat)) {
    errores = "password vacio<br>";
    alert("Todos los campos deben estar completos");
    $("#passwordrepeat").focus();
    return false;
  } else {
    console.log("true");
    return true;
  }
}

function limpiarCampos() {
  $("#identification").val("")
  $("#identification").prop("disabled",false)
  $("#name").val("");
  $("#email").val("");
  $("#address").val("");
  $("#cellphone").val("");
  $("#password").val("");
  $("#passwordrepeat").val("");
  $("#zone").val("");
}

function validaContraseña() {
  let password = $("#password").val();
  let passwordrepeat = $("#passwordrepeat").val();
  if (password == passwordrepeat) {
    console.log("true");
    return true;
  } else {
    alert("Las contraseñas deben coincidir");
    $("#password").val("");
    $("#passwordrepeat").val("");
    $("#password").focus();
    console.log("false");
    return false;
  }
}

function mostrarFormatoInvalido(texto = "La direccion de correo es inválida") {
  $("#useremail").css("border", "1px solid red");
  $("#badEmail").css("display", "block");
  $("#badEmail").text(texto);
}
function ocultarFormatoInvalido() {
  $("#badEmail").css("display", "none");
  $("#useremail").css("border", "1px solid #ced4da");
}

function editarUsuario(id) {
    let usuario = findById(parseInt(id));
    $(".modal-footer").empty();
    let txt = `
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="d-grid gap-2">
                    <button id="actualizar" class="btn btn-primary" type="button">Actualizar</button>
                </div>
            </div>
            <div class="col">
                <div class="d-grid gap-2">
                <button id="regresar" class="btn btn-dark" data-bs-dismiss="modal" type="button">Regresar</button>
                </div>
            </div>
        </div>
        
    </div>`;
    $("#identification").val(usuario.identification)
    $("#name").val(usuario.name)
    $("#address").val(usuario.address)
    $("#cellphone").val(usuario.cellPhone)
    $("#email").val(usuario.email)

    $("#zone").val(usuario.zone)
    $("#type").val(usuario.type)
    $(".modal-footer").append(txt);
    $("#identification").prop("disabled",true)
    validarExisteEmail(usuario.correo, false,true);
    $("#actualizar").click(function () {
        usuario = {
          id: id,
          identification: $("#identification").val(),
          name: $("#name").val(),
          address: $("#address").val(),
          cellPhone: $("#cellphone").val(),
          email: $("#email").val(),
          password: $("#password").val(),
          zone: $("#zone").val(),
          type: $("#type").val()
        };
        actualizarUsuario(usuario);
      });
    $("#regresar").click(function(){
      limpiarCampos()
    })

}
function actualizarUsuario(usuario){
    let dataToSend = JSON.stringify(usuario);
  if (validar() == true && validaContraseña() == true) {
    $.ajax({
      url: "/api/user/update",
      type: "PUT",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/json",
      success: function (user) {
          console.log(user)
        if (user.name) {
          limpiarCampos();
          alert("Usuario actualizado");
          $(".modal").modal("hide");
          cargarUsuarios()
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Algo fallo");
      },
    });
  } else {
    alert(
      "Verifique los campos que ha ingresado. Revise si:\n- si su correo es válido\n- si las contraseñas coinciden\n- no tienen campos vacíos "
    );
  }
}
function eliminarUsuario(id) {
  let usuario = findById(parseInt(id));
  let opc = confirm(
    `¿Está seguro que desea eliminar el usuario ${usuario.name}?`
  );
  if (opc) {
    $.ajax({
      url: "/api/user/" + usuario.id,
      type: "DELETE",
      dataType: "json",
      contentType: "application/json",
      success: function () {
        alert("Usuario eliminado");
        cargarUsuarios();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Algo fallo");
      },
    });
  }
}


function findById(id){
    for (let i = 0; i < usuariosActuales.length; i++) {
        const usuario= usuariosActuales[i];
        if(usuario.id===id){
            return usuario;
        }
    }
    return undefined;
}