/**
 * Cargar la libreria de JQuery y ubicar el cursor en el campo login
 */

/**
 * Autenticar usuario en sistema
 */
function login() {
    //Leer datos
    let email = $("#useremail").val()
    let password = $("#password").val()
    //Generar una peticion tipo ajax para validar login
    if (validar()) {
        $.ajax({
            url: "/api/user/" + email + "/" + password,
            type: 'GET',
            dataType: 'json',
            contentType: "aplication/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                if (respuesta.name == null) {
                    alert("Usuario o contraseña incorrecta")
                } else {
                    if (respuesta.type === 'ADM') {
                        const sesionStore = JSON.stringify(respuesta);
                        console.log(sesionStore);
                        sessionStorage.setItem("user", sesionStore);
                        location.href = "Main.html";

                    } else if (respuesta.type === 'ASE') {
                        const sesionStore = JSON.stringify(respuesta);
                        console.log(sesionStore);
                        sessionStorage.setItem("user", sesionStore);
                        location.href = 'asesor.html';

                    } else if (respuesta.type === 'COORD') {
                        const sesionStore = JSON.stringify(respuesta);
                        console.log(sesionStore);
                        sessionStorage.setItem("user", sesionStore);
                        location.href = 'coorZona.html';

                    }
                    autenticacion(respuesta);
                    limpiarCampos()
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Algo fallo")

            }
        });
    }
}
function limpiarCampos() {
    $("#useremail").val("");
    $("#password").val("")
}

function validar() {
    //obtiene valores
    let email = $("#useremail").val();
    let password = $("#password").val();
    if (validarFormatoCorreo(email)) {
        if (validaesVacio(email)) {
            errores = "email vacio<br>";
            alert("Todos los campos deben estar completos");
            $("#useremail").focus();
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
}

function mostrarFormatoInvalido() {
    $("#useremail").css("border", "1px solid red");
    $("#badEmail").css("display", "block");
    $("#badEmail").text("La direccion de correo es invalida");
}

function ocultarFormatoInvalido() {
    $("#badEmail").css("display", "none")
    $("#useremail").css("border", "1px solid #ced4da");
}

