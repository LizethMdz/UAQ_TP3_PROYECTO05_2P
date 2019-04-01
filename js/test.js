// var preguntas = [
//     ['¿Quién invento el Circulo de Calidad Total?','edwards deming'],
//     ['Menciona los cuatro pasos para esta metodología','planear, hacer, checar, actuar'],
//     ['Se buscan las actividades susceptibles de mejora y se establecen los objetivos a alcanzar. ¿Qué paso es?', 'planear'],
//     ['Una vez implantada la mejora, se deja un periodo de prueba para verificar su correcto funcionamiento. ¿Qué paso es?','checar'],
//     ['Una vez finalizado el periodo de prueba se deben estudiar los resultados y compararlos con el funcionamiento de las actividades antes de haber sido implantada la mejora. ¿Qué paso es?','actuar'],
//     ['"Un sistema de calidad total es la ........ ....... de trabajo acordada en toda la compañía', 'estructura funcional'],
// 	['¿Cúantas características establece este Sistema de Calidad Total?', 'cuatro'],
// 	['¿Cómo se les denomina a este conjunto de elementos? Planear, hacer, checar y actuar?', 'circulo de calidad total'],
// 	['¿Con qué norma ISO se le compara?', '9001'],                                      // ...
// 	['La aplicación de esta metodología está enfocada principalmente para para ser usada en ........', 'empresas y organizaciones']	
// ],
// pregunta, respuesta,
// formuladas = 0,
// acertadas = 0;


// hacerPregunta();

// document.getElementById('boton').addEventListener('click', function(){
//     var entrada = document.getElementById("dato").value;
//     if (entrada == respuesta){
//         acertadas++;
//     }

//     if(formuladas < 5){
//         hacerPregunta();
//     }else{
//         mostrarResultado();
//     }
// });


// function hacerPregunta(){
//     var aux;

//     aux = preguntas.splice(numAleat(0, preguntas.length-1),1);
//     pregunta = aux[0][0];
//     respuesta = aux[0][1];

//     document.getElementById('preg').innerHTML = pregunta;
//     document.getElementById('dato').value= '';
//     formuladas++;
// }

// function mostrarResultado(){
//     var resultado;      // para guardar el mensaje con el resultado
//     switch(acertadas){
//         case 0:
//             resultado = 'No has acertado una sola pregunta, toca estudiar :-/';
//             break;
//         case 1:
//             resultado = 'Bueno, al menos has acertado una pregunta :-)';
//             break;
//         case 2:
//             resultado = 'Solo 2 preguntas acertadas de 5. Toca mejorar.';
//             break;
//         case 3:
//             resultado = 'No está mal, 3/5 acertadas.';
//             break;
//         case 4:
//             resultado = 'Muy bien, has acertado 4 preguntas :-)';
//             break;
//         case 5:
//             resultado = '¡EXCELENTE, has acertado todas las preguntas! :-D';
//             break;
//     }

//     document.getElementById('resolucion').innerHTML = resultado;
// }


// function numAleat(min, max){
//     return Math.floor( Math.random() * (max - min + 1) ) + min;
// }


function addCode(codestring) {
    const codeArray = codestring.split(/\n/);
    
    parseInput(codeArray);
  }
  
  function parseInput(codeArray) {
    const codeObject = {};
  
    codeArray.forEach((text, line) => {
      const shouldContainInput = /€/.test(text);
  
      if(shouldContainInput) {
        codeObject[line] = [];
  
        text.split('€').forEach(x => {
          codeObject[line].push(x);
        });
  
      } else {
        codeObject[line] = text;
      }
    });
    
    printHTML(codeObject);
  }
  
  function printHTML(codeObject) {
    const parentElement = document.createElement('div');
    parentElement.className = 'code-parent';
  
    for(let prop in codeObject) {
      const line = codeObject[prop];
      if(typeof line === 'string') parentElement.innerHTML += createLine(line);
      else parentElement.innerHTML += createInputLine(line);
    }
    
    el('.code-container').appendChild(parentElement);
    setTimeout(() => {
      all('.code-input').forEach((input, key) => {
        input.addEventListener('keydown', handleKeydown);
        input.setAttribute('data-key', key);
      });
    });
  }
  
  function createLine(text) {
    return '<p class="p" >' + text + '</p>';
  }
  
  function createInputLine(textArray) {
    let inputLine = '<p>';
    
    textArray = textArray.map(text => {
      if(/°/.test(text)) {
        const filteredText = text.replace(/°/g, '');
        const characterWidth = 12;
        text = `<input class="code-input unanswered"style="width: ${filteredText.length * characterWidth}px" data-answer="${filteredText}"></input>`;
      }
      
      return text;
    }).join('');
    
    inputLine += textArray + '</p>';
    
    return inputLine;
  }
  
  function handleKeydown(e) {
    const target = e.target;
    const value = e.target.value + e.key;
    const answer = e.target.getAttribute('data-answer');
  
    if(value === answer) {
      target.value = value;
      target.classList.remove('unanswered');
      target.classList.add('correct-answer');
      target.setAttribute('disabled', 'true');
  
      if(!el('.unanswered')) {
        renderLevel();
      } else {
        const focusIndex = +target.getAttribute('data-key') + 1;
        setTimeout(() => all('input')[focusIndex].focus());
      }
      
    }
  }
  
  let levels = {
    easy: 
  [
  [`
  ¿Quién invento el Circulo de Calidad Total? 
        €°edwards deming°€;
  `],
  [`
  Menciona los cuatro pasos para esta metodología:
    €°planear°€, €°hacer°€, €°checar°€ y €°actuar°€ ;
  `],
  [`
  Se buscan las actividades susceptibles de mejora y se 
  establecen los objetivos a alcanzar. 
  ¿Qué paso es? €°planear°€;
  `],
  [`
  Una vez implantada la mejora, se deja un periodo de prueba 
  para verificar su correcto funcionamiento. 
  ¿Qué paso es? €°checar°€;
  `]
  ],
    medium:
  [
  [`
  Una vez finalizado el periodo de prueba se deben estudiar los 
  resultados y compararlos con el 
  funcionamiento de las actividades antes de haber 
  sido implantada la mejora. 
  ¿Qué paso es? €°actuar°€;
  `],
  [, 
  `
  Un sistema de calidad total es €°estructura funcional°€ la 
  de trabajo acordada en toda la compañía;
  `
  ],
  [ 
  `
  ¿Cómo se les denomina a este conjunto de elementos? 
    Planear, hacer, checar y actuar?
    €°circulo de calidad total€°;
  `]
  ],
    hard: [
  [`
  ¿Cúantas características establece este Sistema de Calidad Total?
  €°cuatro€°;
  
  `],
  [
      `
      ¿Con qué norma ISO se le compara? €°9001€°;
      `
  ],
  [`
  'La aplicación de esta metodología está enfocada 
  principalmente para para ser usada en  €°empresas y organizaciones°;
  `]
  ]
  };
  
  let difficultyIndex = 0;
  let gameIndex = 0;
  
  function gameStart() {
    const intermission = [`
    Haz completado el nivel!
    Escribe next para continuar: €°next°€`];
    for(let prop in levels) {
      levels[prop] = shuffle(levels[prop]);
      levels[prop].push(intermission);
    }
    renderLevel();
  }
  
  function renderLevel() {
    const difficulty = Object.keys(levels)[difficultyIndex];
    clearCode();
    
    levels[difficulty][gameIndex].forEach(example => addCode(example));
    setTimeout(() => el('.code-input').focus());
    
    el('.stage').innerHTML = (gameIndex + 1) + '/' + (levels[difficulty].length - 1);
    el('.level').innerHTML = 'Nivel ' + (difficultyIndex + 1);
    el('.skip').innerHTML = 'Adelantar';
    
    hljs.highlightBlock(el('.js'));
    
    ++gameIndex;
    if(gameIndex === levels[difficulty].length) {
      if(difficultyIndex + 1 === Object.keys(levels).length) gameEnd();
      else nextLevel();
    }
  }
  
  function clearCode() {
    all('.code-parent').forEach(parent => {
      el('.code-container').removeChild(parent);
    });
  }
  
  function clearCounter() {
    el('.stage').innerHTML = '';
    el('.level').innerHTML = '';
    el('.skip').innerHTML = '';
  }
  
  function nextLevel() {
    ++difficultyIndex;
    clearCounter();
    gameIndex = 0;
  }
  
  function gameEnd() {
    clearCode();
    clearCounter();
    addCode('You just completed the game, great job!');
  }
  
  function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
  }
  
  
  function el(selector) {
    return document.querySelector(selector);
  }
  
  function all(selector) {
    return document.querySelectorAll(selector);
  }
  
  
  gameStart();