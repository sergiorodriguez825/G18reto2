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