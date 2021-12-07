$("#email").blur(function(){
    let correo = $("#email").val()
    if(!validarFormatoCorreo(correo)){
        mostrarFormatoInvalido()
    }
})

$("#email").click(function(){
    ocultarFormatoInvalido()
})

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        login()
    }
});