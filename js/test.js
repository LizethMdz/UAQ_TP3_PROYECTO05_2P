var preguntas = [
    ['¿Quién invento el Circulo de Calidad Total?','edwards deming'],
    ['Menciona los cuatro pasos para esta metodología','planear, hacer, checar, actuar'],
    ['Se buscan las actividades susceptibles de mejora y se establecen los objetivos a alcanzar. ¿Qué paso es?', 'planear'],
    ['Una vez implantada la mejora, se deja un periodo de prueba para verificar su correcto funcionamiento. ¿Qué paso es?','checar'],
    ['Una vez finalizado el periodo de prueba se deben estudiar los resultados y compararlos con el funcionamiento de las actividades antes de haber sido implantada la mejora. ¿Qué paso es?','actuar'],
    ['"Un sistema de calidad total es la ........ ....... de trabajo acordada en toda la compañía', 'estructura funcional'],
	['¿Cúantas características establece este Sistema de Calidad Total?', 'cuatro'],
	['¿Cómo se les denomina a este conjunto de elementos? Planear, hacer, checar y actuar?', 'circulo de calidad total'],
	['¿Con qué norma ISO se le compara?', '9001'],                                      // ...
	['La aplicación de esta metodología está enfocada principalmente para para ser usada en ........', 'empresas y organizaciones']	
],
pregunta, respuesta,
formuladas = 0,
acertadas = 0;


hacerPregunta();

document.getElementById('boton').addEventListener('click', function(){
    var entrada = document.getElementById("dato").value;
    if (entrada == respuesta){
        acertadas++;
    }

    if(formuladas < 5){
        hacerPregunta();
    }else{
        mostrarResultado();
    }
});


function hacerPregunta(){
    var aux;

    aux = preguntas.splice(numAleat(0, preguntas.length-1),1);
    pregunta = aux[0][0];
    respuesta = aux[0][1];

    document.getElementById('preg').innerHTML = pregunta;
    document.getElementById('dato').value= '';
    formuladas++;
}

function mostrarResultado(){
    var resultado;      // para guardar el mensaje con el resultado
    switch(acertadas){
        case 0:
            resultado = 'No has acertado una sola pregunta, toca estudiar :-/';
            break;
        case 1:
            resultado = 'Bueno, al menos has acertado una pregunta :-)';
            break;
        case 2:
            resultado = 'Solo 2 preguntas acertadas de 5. Toca mejorar.';
            break;
        case 3:
            resultado = 'No está mal, 3/5 acertadas.';
            break;
        case 4:
            resultado = 'Muy bien, has acertado 4 preguntas :-)';
            break;
        case 5:
            resultado = '¡EXCELENTE, has acertado todas las preguntas! :-D';
            break;
    }

    document.getElementById('resolucion').innerHTML = resultado;
}


function numAleat(min, max){
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}