class Imagen{
    constructor(url){
        this.direccion = url;
    }

    mostrar(){
        return `
        <div class="card">
            <img src="${this.direccion}" alt="Imagen de la galeria">
        </div>
        `;

    }
}

const renderImagenes = (imagenes) => {
    const contenedor = document.getElementById("galeria");
    contenedor.innerHTML = imagenes.map(u => u.mostrar()).join("");
}

async function obtenerImagenes() {
    const res = await fetch("https://picsum.photos/v2/list?page=2&limit=6");
    const datos = await res.json();


    const lista = datos.map(i => new Imagen(i.download_url));
    renderImagenes(lista);
}

let boton = document.getElementById("btnAccion");
boton.addEventListener("click",() => obtenerImagenes());