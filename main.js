const { innerWidth, innerHeight } = window;
const { sin, cos, PI } = Math;

const s = Math.min(innerHeight, innerWidth) * 0.95;

const canvas = document.getElementById("canvas");
canvas.height = s;
canvas.width = s;

const ctx = canvas.getContext("2d");
ctx.translate(s / 2, s / 2);
ctx.scale(1, -1);
ctx.globalCompositeOperation = "lighter";
ctx.strokeStyle = "#7683f388";
ctx.lineWidth = s / 2500;

const AXIOM = [0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0];
const RULE = [
  0,
  -1,
  -1,
  -1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  -1,
  -1,
  -1,
  0
];
const ANGLE = PI / 4;
const DEPTH = 5;
const l = s / 800;

let pos = [-s / 2.73, -s / 6.6];
let theta = PI / 2;

const foward = () => {
  const [x, y] = pos;
  const nx = x + l * cos(theta);
  const ny = y + l * sin(theta);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(nx, ny);
  ctx.stroke();
  pos = [nx, ny];
};

const turn = (m) => {
  theta += m * ANGLE;
};

const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);

let path = AXIOM;

for (let _ = 0; _ < DEPTH; _++) {
  const temp = [];
  for (let i = 0; i < path.length; i++) {
    const item = path[i];
    if (item) {
      temp.push(item);
    } else {
      for (let j = 0; j < RULE.length; j++) {
        temp.push(RULE[j]);
      }
    }
  }
  path = temp;
}

for (let i = 0; i < path.length; i++) {
  const item = path[i];
  if (item) {
    turn(item);
  } else {
    foward();
  }
}
