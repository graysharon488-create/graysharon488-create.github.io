const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

const canvas = document.getElementById("dragonCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "F_Dragon.png";

const genotypeToColor = {
  rr: [198, 40, 40],   // red
  ry: [239, 108, 0],  // orange
  yy: [249, 168, 37], // yellow
  by: [46, 125, 50],  // green
  bb: [21, 101, 192], // blue
  br: [123, 31, 162]  // purple
};

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  updateCol();
};

function updateCol() {
  const c1 = document.querySelector('select[name="color1"]').value;
  const c2 = document.querySelector('select[name="color2"]').value;
  const genotype = [c1, c2].sort().join("");

  const color = genotypeToColor[genotype] || [120, 120, 120];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // grayscale brightness (0–1)
    const brightness = (r + g + b) / (3 * 255);

    data[i]     = color[0] * brightness;
    data[i + 1] = color[1] * brightness;
    data[i + 2] = color[2] * brightness;
    // alpha stays the same
  }

  ctx.putImageData(imageData, 0, 0);
}

// update on EVERY dropdown change
document.querySelectorAll("select.geno").forEach(sel =>
  sel.addEventListener("change", updateCol)
);