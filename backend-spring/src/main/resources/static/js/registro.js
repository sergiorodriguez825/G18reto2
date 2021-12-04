$(document).ready (function(){
    $("#username").focus();
});
var correoValido=false;
function registrarse(){
    if(validar()==true){
        let correo = $("#useremail").val();
        validarExisteEmail(correo,true);
    }
}

function crearUsuario(){
    let myData={
        email:$("#useremail").val(),
        password:$("#password").val(),
        name:$("#username").val()  
    };
    let dataToSend=JSON.stringify(myData);
    if(validar()==true && validaContraseña()==true && correoValido){
        $.ajax ({
            url:"/api/user/new",
            type:"POST",
            data:dataToSend,
            datatype:'JSON',
            contentType:'application/json',
            success: function(){
                console.log("Creación exitosa");
                limpiarCampos();
                alert("Nuevo Usuario Creado")
                location.href="index.html"
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Algo fallo")
            }
        });
    }else{
        alert("Verifique los campos que ha ingresado. Revise si:\n- si su correo es válido\n- si las contraseñas coinciden\n- no tienen campos vacíos ")
    }
}

function validarExisteEmail(email,crear){
    //Generar una peticion tipo ajax para validar login
    $.ajax ({
        url: "/api/user/"+email,
        type: 'GET',
        dataType: 'json',
        contentType: "aplication/JSON",
        success: function(respuesta){
            console.log(respuesta);
            if(respuesta==true){
                mostrarFormatoInvalido(texto="Ya existe una cuenta asociada a este email")
                correoValido=false           
            }else{
                correoValido=true
                if (crear){
                    crearUsuario();
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Algo fallo")
        }
    });
}


function validar(){
    //obtiene valores
    let name = $("#username").val(); 
    let email = $("#useremail").val();
    let password = $("#password").val();
    let passwordrepeat = $("#passwordrepeat").val();   
    if (validarFormatoCorreo(email)) {
        if( validaesVacio(email)) { 
            errores="email vacio<br>";
            alert("Todos los campos deben estar completos");
            $("#useremail").focus();
            return false;
        }else if( validaesVacio(password)) {
            errores="password vacio<br>";
            alert("Todos los campos deben estar completos");
            $("#password").focus();
            return false;
        }else{
            return true;
            
        }
    }else{
        mostrarFormatoInvalido()
    }

    //valida que los campos no sean vacios
    if(validaesVacio(name)){
        errores="name vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#username").focus();
        return false;
    }else if(validaesVacio(email)) { 
        errores="email vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#useremail").focus();
        return false;
    }else if(validaesVacio(password)) {
        errores="password vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#password").focus();
        return false;
    }else if(validaesVacio(passwordrepeat)) {
        errores="password vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#passwordrepeat").focus();
        return false;
    }else{
        console.log("true");
        return true;
    }
}

function limpiarCampos(){
    $("#username").val("");
    $("#useremail").val("");
    $("#password").val("");
    $("#passwordrepeat").val("");
    location.href ="index.html";
}

function validaContraseña(){
    let password= $("#password").val()
    let passwordrepeat= $("#passwordrepeat").val()
    if(password==passwordrepeat){
        console.log("true");
        return true;
    }else{
        alert ("Las contraseñas deben coincidir");
        $("#password").val("")
        $("#passwordrepeat").val("")
        $("#password").focus();
        console.log("false");
        return false;
    }
}

function mostrarFormatoInvalido(texto="La direccion de correo es inválida"){
    $("#useremail").css("border", "1px solid red");
    $("#badEmail").css("display", "block");
    $("#badEmail").text(texto);
}
function ocultarFormatoInvalido(){
    $("#badEmail").css("display","none")
    $("#useremail").css("border", "1px solid #ced4da");
}

