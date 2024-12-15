// Variables
let currentPlayer = 1;
let playerPositions = [1, 1]; // Posiciones de los dos jugadores
const totalCells = 63; // Total de casillas en el tablero

// Casillas especiales
const specialCells = {
  6: 'oca',  // Casilla 6: Oca
  12: 'oca', // Casilla 12: Oca
  19: 'puente', // Casilla 19: Puente
  31: 'carcel', // Casilla 31: Cárcel
  42: 'oca',  // Casilla 42: Oca
  58: 'puente', // Casilla 58: Puente
};

// Elementos DOM
const playerPositionElem = document.getElementById('playerPosition');
const currentPlayerElem = document.getElementById('currentPlayer');
const rollButton = document.getElementById('rollButton');
const diceResultElem = document.getElementById('diceResult');

// Función para tirar el dado
function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceResultElem.textContent = `Resultado del dado: ${dice}`;

  movePlayer(dice);
}

// Función para mover al jugador
function movePlayer(steps) {
  let position = playerPositions[currentPlayer - 1];
  position += steps;
  if (position > totalCells) {
    position = totalCells; // Limitar la posición al máximo de celdas
  }

  // Aplicar reglas de casillas especiales
  if (specialCells[position] === 'oca') {
    position += steps; // Mover otra vez
    if (position > totalCells) position = totalCells;
  } else if (specialCells[position] === 'puente') {
    position = 26; // Teletransportarse al puente (por ejemplo)
  } else if (specialCells[position] === 'carcel') {
    position = 6; // Volver a la casilla 6 si cae en la cárcel
  }

  // Actualizamos la posición del jugador
  playerPositions[currentPlayer - 1] = position;
  playerPositionElem.textContent = position;

  // Resaltar la casilla del jugador
  const currentCell = document.getElementById(`cell-${position}`);
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach(cell => cell.style.backgroundColor = '#fff'); // Restablecer colores
  currentCell.style.backgroundColor = '#ffcc00'; // Resaltar la casilla actual

  // Animación del movimiento
  currentCell.style.animation = `movePlayer 0.5s forwards`;

  // Verificar si el jugador ha ganado
  if (position === totalCells) {
    alert(`¡Jugador ${currentPlayer} ha ganado!`);
    playerPositions = [1, 1]; // Reiniciar las posiciones
    playerPositionElem.textContent = 1;
  } else {
    // Cambiar de jugador
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerElem.textContent = currentPlayer;
  }
}

// Evento para tirar el dado
rollButton.addEventListener('click', rollDice);
