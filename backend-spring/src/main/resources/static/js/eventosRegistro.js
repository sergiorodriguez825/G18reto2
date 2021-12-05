$("#useremail").blur(function(){
    let correo = $("#useremail").val()
    if(!validarFormatoCorreo(correo)){
        mostrarFormatoInvalido()
    }else{
        validarExisteEmail(correo,false)
    }
    
})

$("#useremail").click(function(){
    ocultarFormatoInvalido()
})