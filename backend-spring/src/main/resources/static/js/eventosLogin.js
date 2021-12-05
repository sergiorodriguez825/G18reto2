$("#useremail").blur(function(){
    let correo = $("#useremail").val()
    if(!validarFormatoCorreo(correo)){
        mostrarFormatoInvalido()
    }
})

$("#useremail").click(function(){
    ocultarFormatoInvalido()
})

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        login()
    }
});