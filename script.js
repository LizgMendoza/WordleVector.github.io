let diccionario= ["texto", "barco","media","banco"];
let wordSec = diccionario[Math.floor(Math.random()*diccionario.length)];
//La cantidad de intentos esta definida más adelante
let intentos= 1;

let mainContainer= document.querySelector(".main-container")
let resultadoCorrecto = document.querySelector(".result")

let wordArray= wordSec.toUpperCase().split("");

let actualRow= document.querySelector(".row")
drawSquares(actualRow);
listenInput(actualRow);
addfocusElement(actualRow);


function listenInput(actualRow){
    let squares= actualRow.querySelectorAll(".square")
        squares= [...squares]

    let userInput= []
        squares.forEach(element=>{
        element.addEventListener("input", event=>{
    if (event.inputType !== `deleteContentBackward`){
        //recoge el ingreso del usuario 
        userInput.push(event.target.value.toUpperCase())

        if(event.target.nextElementSibling){
            event.target.nextElementSibling.focus();

        }else{
            //Arma un arreglo con el resultado antes de comparar
            let squarefilled= document.querySelectorAll(".square")
                squarefilled= [...squarefilled]
            let ultcinco= squarefilled.slice(-5);
            let finalUserInput= [];
                ultcinco.forEach(element=>{
                    finalUserInput.push(element.value.toUpperCase())
                });

            //Cambia los estilos comparando los arreglos (verde) 
            let sameElements= CompararII(wordArray, finalUserInput)
                sameElements.forEach(element=>{
                    squares[element].classList.add("verde");       
                })
            // Si son iguales 
            if(sameElements.length == wordArray.length){
                showResult("Ganaste!!")
                    return;
            }
            //Cambia los estilos comparando los arreglos (amarillo )
            let existeIndex = existeletra(wordArray, finalUserInput)
                existeIndex.forEach(element=>{
                    squares[element].classList.add("amarillo");       
                });
            //crea una nueva fila
            let actualRow= crearfilas()
            if(!actualRow){
                return
            }
                drawSquares(actualRow)
                listenInput(actualRow)
                addfocusElement(actualRow);
            } 
        }else{
            userInput.pop()
                }
        });
    })
}


//FUNCIONES
function CompararII(array1, array2){
    //Compara las posiciones
    let igualesIndex = []
    array1.forEach((element, index)=>{
        if(element== array2[index]){
            igualesIndex.push(index);
            console.log(`en la posicion ${index} SI son iguales`)
        }else{
            console.log(`en la posicion ${index} NO son iguales`)
        }
    });
    return igualesIndex
}
function existeletra(array1, array2){
    //Analiza si la letra existe en la palabra
    let existearray= []
    array2.forEach((element, index)=>{
        if(element!==array1[index]&& array1.includes(element)){
            existearray.push(index)
        }
    });
    return existearray
}
function crearfilas(){
    //Condiciona la cantidad de filas que hay que crear
    intentos++ 
    if(intentos<=6){
        let nuevafila= document.createElement("div");
            nuevafila.classList.add("row");
            nuevafila.setAttribute("id","intentos")
            mainContainer.appendChild(nuevafila)
            return nuevafila;
    }else{
        showResult(`Intentalo de nuevo, la palabra era ${wordSec.toUpperCase()} `)
    }
    
}
function drawSquares(actualRow){
    // Crea las filas
    wordArray.forEach((item, index) =>{
        if(index===0){
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`
        }else{
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`
        }
        
    });
}
function addfocusElement(actualRow){
    //Marca para escribir en el primer cuadro 
    let focusElement= actualRow.querySelector(".focus")
        focusElement.focus();
}
function showResult(textMsg){
    // Muestra un mensaje cuando se cumplen ciertas condiciones
    resultadoCorrecto.innerHTML = `
    <p>${textMsg}</p>
    <button class="button">Reiniciar</button>`
    let resetBut= document.querySelector(".button")
        resetBut.addEventListener("click", ()=>{
        location.reload(); });
} 