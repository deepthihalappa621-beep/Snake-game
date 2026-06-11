const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE = 20, COLS = 25, ROWS = 25;

let snake, dir, nextDir, food, score, level, gameLoop, running;

// --- SOUND ENGINE (Web Audio API - no files needed!) ---
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function getAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playEat() {
  const ac = getAudio();
  const o = ac.createOscillator(), g = ac.createGain();
  o.connect(g); g.connect(ac.destination);
  o.type = 'sine'; o.frequency.setValueAtTime(440, ac.currentTime);
  o.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.1);
  g.gain.setValueAtTime(0.3, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
  o.start(); o.stop(ac.currentTime + 0.15);
}

function playDie() {
  const ac = getAudio();
  [200, 160, 120, 80].forEach((freq, i) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'sawtooth'; o.frequency.value = freq;
    const t = ac.currentTime + i * 0.12;
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.start(t); o.stop(t + 0.1);
  });
}

function playWin() {
  const ac = getAudio();
  [523, 659, 784, 1047].forEach((freq, i) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'sine'; o.frequency.value = freq;
    const t = ac.currentTime + i * 0.15;
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.start(t); o.stop(t + 0.2);
  });
}

function playStart() {
  const ac = getAudio();
  [330, 392, 494, 523].forEach((freq, i) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'triangle'; o.frequency.value = freq;
    const t = ac.currentTime + i * 0.1;
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    o.start(t); o.stop(t + 0.15);
  });
}

// --- GAME LOGIC ---
function startGame() {
  snake = [{x:12, y:12}, {x:11, y:12}, {x:10, y:12}];
  dir = {x:1, y:0}; nextDir = {x:1, y:0};
  score = 0; level = 1;
  placeFood();
  document.getElementById('overlay').style.display = 'none';
  running = true;
  clearInterval(gameLoop);
  playStart();
  gameLoop = setInterval(tick, getSpeed());
}

function getSpeed() { return Math.max(80, 200 - (level - 1) * 20); }

function placeFood() {
  do {
    food = {x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS)};
  } while (snake.some(s => s.x === food.x && s.y === food.y));
}

function tick() {
  dir = nextDir;
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

  // Wall collision
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
    return endGame(false);
  }
  // Self collision
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    return endGame(false);
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    playEat();
    score += 10 * level;
    document.getElementById('score-display').textContent = 'Score: ' + score;
    if (score >= level * 100) {
      level++;
      document.getElementById('level-display').textContent = 'Level: ' + level;
      clearInterval(gameLoop);
      if (level > 5) return endGame(true);
      gameLoop = setInterval(tick, getSpeed());
    }
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}

function endGame(won) {
  clearInterval(gameLoop); running = false;
  if (won) { playWin(); showOverlay('🏆 You Win!', 'Score: ' + score + ' — Amazing!', '▶ Play Again'); }
  else { playDie(); showOverlay('💀 Game Over', 'Score: ' + score, '▶ Try Again'); }
}

function showOverlay(title, msg, btn) {
  document.getElementById('overlay-title').textContent = title;
  document.getElementById('overlay-msg').textContent = msg;
  document.getElementById('start-btn').textContent = btn;
  document.getElementById('overlay').style.display = 'flex';
}

// --- DRAWING ---
function draw() {
  // Background grid
  ctx.fillStyle = '#050f05';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = 'rgba(0,80,20,0.3)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= COLS; i++) {
    ctx.beginPath(); ctx.moveTo(i*TILE, 0); ctx.lineTo(i*TILE, canvas.height); ctx.stroke();
  }
  for (let j = 0; j <= ROWS; j++) {
    ctx.beginPath(); ctx.moveTo(0, j*TILE); ctx.lineTo(canvas.width, j*TILE); ctx.stroke();
  }

  // Food (glowing apple)
  const fx = food.x * TILE + TILE/2, fy = food.y * TILE + TILE/2;
  const grd = ctx.createRadialGradient(fx, fy, 2, fx, fy, TILE/2);
  grd.addColorStop(0, '#ff4444'); grd.addColorStop(1, '#880000');
  ctx.beginPath(); ctx.arc(fx, fy, TILE/2 - 2, 0, Math.PI*2);
  ctx.fillStyle = grd; ctx.fill();
  ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 12;
  ctx.fill(); ctx.shadowBlur = 0;

  // Snake
  snake.forEach((seg, i) => {
    const x = seg.x * TILE, y = seg.y * TILE;
    const ratio = i / snake.length;
    const g = Math.floor(200 - ratio * 120);
    ctx.fillStyle = i === 0 ? '#00ff44' : `rgb(0,${g},30)`;
    ctx.shadowColor = i === 0 ? '#00ff44' : 'transparent';
    ctx.shadowBlur = i === 0 ? 15 : 0;
    ctx.beginPath();
    ctx.roundRect(x+1, y+1, TILE-2, TILE-2, i === 0 ? 6 : 3);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Eyes on head
    if (i === 0) {
      ctx.fillStyle = '#000';
      const ex = dir.x === 0 ? [x+5, x+13] : dir.x > 0 ? [x+13, x+13] : [x+5, x+5];
      const ey = dir.y === 0 ? [y+5, y+13] : dir.y > 0 ? [y+13, y+13] : [y+5, y+5];
      ctx.beginPath(); ctx.arc(ex[0], ey[0], 2, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(ex[1], ey[1], 2, 0, Math.PI*2); ctx.fill();
    }
  });
}

// --- CONTROLS ---
document.addEventListener('keydown', e => {
  const map = {
    ArrowUp:    {x:0, y:-1}, ArrowDown:  {x:0, y:1},
    ArrowLeft:  {x:-1, y:0}, ArrowRight: {x:1, y:0},
    w: {x:0, y:-1}, s: {x:0, y:1}, a: {x:-1, y:0}, d: {x:1, y:0}
  };
  const nd = map[e.key];
  if (nd && !(nd.x === -dir.x && nd.y === -dir.y)) {
    nextDir = nd; e.preventDefault();
  }
});

draw();