//Make character run
var character = document.getElementById('bob');
var stillImg = 'bob.png';
var moveImg = 'bob3.png';
var move = true;
var over = false;
var onFloor = true;

function run() {
  if (move) {
    character.src = moveImg;
    move = false;
  }
  else {
    character.src = stillImg;
    move = true;
  }
}

setInterval(run, 200);

//Make character jump
function jump() {
  if (onFloor) {
    onFloor = false;
    console.log(onFloor);
    character.style.top = '-125px';
    setTimeout(() => {
      character.style.top = '0px';
    }, 300);
  }
  setTimeout(() => {
    onFloor = true;
    console.log(onFloor);
  }, 600);
}

document.addEventListener('keydown', function(event) {
  document.getElementById('rules').style.display = 'none';
    if (event.code === 'Space' && onFloor) {
      jump();
    }
});

//Update score
var counter = 0;
var score = document.getElementById('scoreValue');

function add() {
  if (!over) {
    counter++;
    score.innerText = counter;
    setTimeout(add, 100);
  }
}

add();

//Lose condition
var spike1 = document.getElementById('spike1');
var spike2 = document.getElementById('spike2');

function onCollision(character, spike) {
  var characterRect = character.getBoundingClientRect();
  var spikeRect = spike.getBoundingClientRect();

  return (
    characterRect.left - 25 < spikeRect.right - 35 &&
    characterRect.right - 25 > spikeRect.left - 20 &&
    characterRect.top < spikeRect.bottom &&
    characterRect.bottom > spikeRect.top + 15
  );
}

function checkCollisions() {
  if (onCollision(character, spike1) || onCollision(character, spike2)) {
    endGame();
  }
}

function endGame() {
  over = true;
  document.getElementById('over').style.display = 'block';
  document.getElementById('bob').style.display = 'none';
  document.getElementById('bob2').style.display = 'none';
  document.getElementById('again').style.display = 'block';
  document.getElementById('rules').style.display = 'none';

  clearInterval(runInterval);
  clearTimeout(addTimeout);
  document.removeEventListener('keydown', jump);
}

setInterval(checkCollisions, 50);

function refreshTab() {
  location.reload();
}

document.getElementById('again').addEventListener('click', function(event) {
  event.stopPropagation();
  refreshTab();
});
