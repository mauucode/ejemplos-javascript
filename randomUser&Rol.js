class Usuario {

    //ESTO ES MI CONSTRUCTOR
    constructor(nombre, email, foto, rol = null){
        this.nombre = nombre;
        this.email = email;
        this.foto = foto;
        this.rol = rol;
    }

    mostrar(){
        return `
        <div class="card">
            <img src="${this.foto}" alt="${this.nombre}">
            <h3>${this.nombre}</h3>
            <p>${this.email}</p>
            ${this.rol ? `<p class="rol">${this.rol}</p>` : ``}
        </div>

        `;
    }
};

class UsuarioConRol extends Usuario {
    constructor(nombre, email, foto, rol){
        super(nombre, email, foto);
        this.rol = rol;
    }

    mostrar(){
        return super.mostrar();
    }
}


// Funcion flecha para renderizar usuarios
const renderUsuarios=(usuarios) => {
    const contenedor = document.getElementById("usuarios");
    contenedor.innerHTML = usuarios.map(u =>u.mostrar()).join("");
}

//Promesa con async / await para consumir la API
const obtenerUsuarios = async (cantidad = 5) => {
    try {
        const respuesta = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
        const datos = await respuesta.json();
        const roles = ["Admin","Editor","Viewer"];

    
        let listaUsuarios = [];

        datos.results.forEach((u, i)=> {
            //Usuario normal
            if (i % 2 === 0) {
                console.info("Usuario normal");
                listaUsuarios.push(new Usuario(
                    u.name.first + " " + u.name.last,
                    u.email,
                     u.picture.medium,
                     roles[i % roles.length]
                    
                ))
            }
            else{
                console.info("Usuario con rol");
                listaUsuarios.push(new UsuarioConRol(
                    u.name.first + " " + u.name.last,
                    u.email,
                    u.picture.medium,
                    roles[i % roles.length]

                ))

            }
            
            
        });

        renderUsuarios(listaUsuarios);

    } catch (error) {
        console.error("Error al obtener usuarios:", error);

    }
}

//Evento de boton para obtener usuarios
const boton = document.getElementById("btnCargar");
boton.addEventListener("click", () => obtenerUsuarios(10));