
let intentos = 6;
let palabra;
let alertaMostrada = false;
let diccionario = ["ABEJA","DEDOS","UNION","ARBOL","PERLA","LAPIZ"]

let indice = Math.floor(Math.random()*diccionario.length - 1)+1;
console.log(indice);


fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en')
        .then(response => response.json())
        .then(response => {
            console.log(response)
            palabra = response[0].toUpperCase()
        })
        .catch(err => console.error(err));


window.addEventListener('load', init)
function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

const input = document.getElementById("guess-input");
const valor = input.value;



function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento=intento.toUpperCase();
    return intento;
}



function intentar(){
    // para resetear la ventana qu sale si mete menos o mas de 5 letras
    alertaMostrada = false;
    console.log(palabra);
    const INTENTO = leerIntento();
    const GRID = document.getElementById('grid');
    const ROW = document.createElement('div');
    const letrasValidas = /^[A-Za-z]+$/.test(INTENTO);

    ROW.className = 'row';

    // para resetear donde escribe el usuario
    const input = document.getElementById("guess-input");
    input.value = "";

    if (!letrasValidas){
        alertaMostrada = true; // Marcamos que la alerta ha sido mostrada
        alert("El intento debe tener letras y no  números.");
        return;
    }

    if(INTENTO.length !== 5){
        alertaMostrada = true; // Marcamos que la alerta ha sido mostrada
        alert("El intento debe tener exactamente 5 letras.");
        return;
    }

    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    const intentosRestantesElement = document.getElementById("intentos-restantes");
    intentosRestantesElement.textContent = "Intentos restantes: " + intentos;


    if(INTENTO===palabra){
        terminar("<h2>GANASTE!😀</h2>")
        document.getElementById('imagen-ganar').style.display = 'block'; // Mostrar la imagen de ganar
        return
    }


    if(intentos===0){
        terminar("<h2>PERDISTE!😖</h2>")
        document.getElementById('imagen-perder').style.display = 'block'; // Mostrar la imagen de perder
    }
    
}
function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}