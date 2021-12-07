$("#email").blur(function(){
    let correo = $("#email").val()
    if(!validarFormatoCorreo(correo)){
        mostrarFormatoInvalido()
    }else{
        validarExisteEmail(correo,false)
    }
    
})

$("#email").click(function(){
    ocultarFormatoInvalido()
})