function validarFormatoCorreo(correo){
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(correo)){
        return true
    }
    return false;
}

function validaesVacio(dato){
    return !dato.trim().length;
}