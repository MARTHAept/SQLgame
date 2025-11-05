let questions = [];
let idx = 0;
let score = 0;

fetch('questions.json')
  .then(r => r.json())
  .then(qs => {
    questions = qs;
    showQ();
  });

function showQ() {
  const game = document.getElementById('game');
  if (idx >= questions.length) {
    game.innerHTML = `<div>Игра окончена!<br>Ваш счет: <b>${score}</b> из ${questions.length}<br>
    <button class="opt" onclick="restart()">Начать заново</button></div>`;
    return;
  }
  const q = questions[idx];
  let html = `<div class="score">Вопрос ${idx+1}/${questions.length} | Счет: ${score}</div>`;
  html += `<div class="q">${q.question}</div>`;
  q.options.forEach((opt, i) => {
    html += `<button class="opt" onclick="reply(${i})">${opt}</button>`;
  });
  game.innerHTML = html;
}

function reply(optIdx) {
  if (questions[idx].answer === optIdx) {
    score++;
    alert('Верно!');
  } else {
    alert('Неверно. Правильный ответ: ' + questions[idx].options[questions[idx].answer]);
  }
  idx++;
  showQ();
}

function restart() {
  idx = 0;
  score = 0;
  showQ();
}
