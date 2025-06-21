// Función con promesa del tiempo en milisegundos
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Lista con emojis
const EMOJI = {
  piedra: '👊 Piedra',
  papel:  '✋ Papel',
  tijera: '✌️ Tijera'
};

// Genera elección aleatoria de la máquina
function getComputerChoice() {
  const options = ['piedra', 'papel', 'tijera'];
  const ale = Math.floor(Math.random() * options.length); //ale = aleatorio
  return options[ale];
}

// Función para determinar el resultado
function determineWinner(player, pc) {
  if (player === pc) {
    return 'Empate';
  } else if (
    (player === 'piedra' && pc === 'tijera') ||
    (player === 'papel'  && pc === 'piedra')  ||
    (player === 'tijera' && pc === 'papel')
  ) {
    return '¡Ganaste!';
  } else {
    return 'Perdiste';
  }
}

// Selecciona todos los botones de elección y añade el listener de clic
document.querySelectorAll('.choices button').forEach(button => {
  button.addEventListener('click', async () => {

    const playerChoice = button.dataset.choice; //Toma la elección del player
    document.getElementById('status').textContent = 'La máquina está pensando...'; //La máquina empieza a pensar
    document.getElementById('result').classList.add('hidden'); // Oculta el resultado anterior si existía

    await delay(2000);

    // Obtiene la elección de la máquina y determina el resultado
    const compChoice = getComputerChoice();
    const outcome = determineWinner(playerChoice, compChoice);

    // Actualiza el DOM (Doc Obj Mod) con la jugada de la máquina y el resultado final
    document.getElementById('pc-choice').textContent = EMOJI[compChoice];
    document.getElementById('outcome').textContent = outcome;
    document.getElementById('status').textContent = '¡Resultado listo!';
    // Muestra el contenedor de resultado
    document.getElementById('result').classList.remove('hidden');
  });
});