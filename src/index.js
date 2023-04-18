const aside = document.getElementById('aside');
const select = document.getElementById('select');

const textarea1 = document.getElementById('entrada');
const textarea2 = document.getElementById('salida');

const buttonEncriptar = document.getElementById('encriptar');
const buttonDesencriptar = document.getElementById('desencriptar');
const buttonCopiar = document.getElementById('copiar');


const show = () => {
  aside.classList.add('hidden');
  textarea2.classList.remove('hidden');
  buttonCopiar.classList.remove('hidden');
}

const vocales = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat'
};

const encryptorSecret = (text, vocales) => {
  show();
  text = text.toLowerCase(); // Convierte el texto en minusculas

  let messages = '';
  for (let i = 0; i < text.length; i++) {
    const letras = vocales[text[i]];
    if (letras === undefined) {
      messages += text[i];
    } else {
      messages+=letras
    }
  }
  textarea1.value = '';
  textarea2.value = messages.trim();
}

const decryptSecret = (text, vocales) => {
  show();

  text = text.toLowerCase(); // Convierte el texto en minusculas

  let messages = text;
  for (const vocal in vocales) {
    if (vocales.hasOwnProperty(vocal)) {  // Busca vocal en vocales
      const regex = new RegExp(vocales[vocal], 'g');
      messages = messages.replace(regex, vocal);
    }
  }
  textarea1.value = '';
  textarea2.value = messages.trim();
}

const encryptorCesar = (text, letras, signo) => {  // Encripta y desencripta en Cifrado Cesar
  show();

  const abecedario =['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  text = text.toLowerCase(); // Convierte el texto en minusculas
  let messages = '';

  for (let i = 0; i < text.length; i++) {
    if ( text[i] === ' '){
      messages+= ' ';  // Agrega un espacio o lo deja
      continue;
    }
    let indexAbec = abecedario.indexOf(text[i]);
    if (indexAbec === -1) {
      messages+=text[i];
      continue;
    }
    if ( text[i] === letras[0] || text[i] === letras[1] || text[i] === letras[2] ){
      if (signo) {
        messages += abecedario[indexAbec - abecedario.length + 3]; // Resta la logitud del abecedario para empezar desde el princio por las letas finales 'x','y','z' y le suma 3 encriptado cesar 
      } else {
        messages += abecedario[indexAbec + abecedario.length - 3]; // Suma la logitud del abecedario para avanzar posiciones ya que estan al principio 'a','b','c' y le resta 3 desencriptado cesar
      }
    } else {
      if (signo) {
        messages += abecedario[indexAbec + 3];
      } else {
        messages += abecedario[indexAbec - 3];
      }
    }
  }
  textarea1.value = '';
  textarea2.value = messages.trim(); // Agrega el mesanje a textarea sin espaciados a los lados
}


const morse = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  " ": " ", // Espacio para separar palabras
};

const encryptorMorse = (text, morse) => { // Encripta Morse
  show();

  text = text.toLowerCase();

  let messages = '';

  for (let i = 0; i < text.length; i++) {
    const letras = morse[text[i]]; 
    if (letras !== undefined) {
      messages += letras + ' ';
    } else {
      messages += '? '
    }
  }
  textarea1.value = '';
  textarea2.value = messages.trim();
}

const decryptMorse = (text, morse) => { // Desencripta Morse
  show();

  let messages = '';
  
  const palabras = text.split(" ")
  for (let i = 0; i < palabras.length; i++) {
    const palabra = palabras[i];
    if (palabra === "") {
      messages += " "; // Agregar espacio para separar palabras
    } else {
      const keysMorse = Object.keys(morse).find((key) => morse[key] === palabra);
      if (keysMorse) {
        messages += keysMorse; // Agregar el carácter correspondiente al código Morse
      } else {
        messages += "?"; // Agregar un signo de interrogación para códigos Morse no encontrados
      }
    }
  }
  textarea1.value = '';
  textarea2.value = messages.trim();
}

buttonEncriptar.addEventListener('click', () => {
  if (textarea1.value.trim().length > 0) { // Busca si tiene caracteres y que no sea solo espacios en blanco
    switch (select.value) {
      case '1':
        encryptorSecret(textarea1.value, vocales)
        break;
      case '2':
        encryptorCesar(textarea1.value, ['x', 'y', 'z'], true); // Encripta en Cesar
      break;
      case '3':
        encryptorMorse(textarea1.value, morse); // Encripta en Morse
      break;
      default:
        encryptorSecret(); 
        break;
    }
  }
  return;
});

buttonDesencriptar.addEventListener('click', () => {
  if (textarea1.value.trim().length > 0) {

    switch (select.value) {
      case '1':
        decryptSecret(textarea1.value, vocales);
        break;
      case '2':
        encryptorCesar(textarea1.value, ['a' , 'b', 'c'], false);
      break;
      case '3':
        decryptMorse(textarea1.value, morse)
      break;
      default:
        break;
    }
  }
  return;
})

buttonCopiar.addEventListener('click', () => { 
  navigator.clipboard.writeText(textarea2.value) // Copia el texto del textarea2
})