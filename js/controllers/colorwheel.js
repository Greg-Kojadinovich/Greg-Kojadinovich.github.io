// js/controllers/colorwheel.js
// Controller — Interactive RYB color wheel on HTML5 Canvas
// Implements the 12-hue RYB wheel used in fine art / plein air painting

(function () {
  var canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;

  var ctx  = canvas.getContext('2d');
  var SIZE = canvas.width;   // 400
  var cx   = SIZE / 2;
  var cy   = SIZE / 2;
  var R    = SIZE / 2 - 10;  // outer radius
  var INNER = R * 0.3;        // inner white circle radius

  // 12-hue RYB wheel starting at Red (top), going clockwise
  // Each entry is the approximate RGB representation of that RYB hue
  var rybHues = [
    { name: 'Red',          hex: '#FF2200' },
    { name: 'Red-Orange',   hex: '#FF5500' },
    { name: 'Orange',       hex: '#FF8C00' },
    { name: 'Yellow-Orange',hex: '#FFB700' },
    { name: 'Yellow',       hex: '#FFE600' },
    { name: 'Yellow-Green', hex: '#88CC00' },
    { name: 'Green',        hex: '#00A550' },
    { name: 'Blue-Green',   hex: '#00827F' },
    { name: 'Blue',         hex: '#0047AB' },
    { name: 'Blue-Violet',  hex: '#4B0082' },
    { name: 'Violet',       hex: '#8B008B' },
    { name: 'Red-Violet',   hex: '#C71585' }
  ];

  var SLICE = (2 * Math.PI) / 12;
  var selectedColors = ['#FF2200', '#0047AB'];  // default: Red + Blue
  var clickCount = 0;

  // ---- Draw the wheel ----------------------------------------

  function drawWheel() {
    ctx.clearRect(0, 0, SIZE, SIZE);

    for (var i = 0; i < 12; i++) {
      var startAngle = i * SLICE - Math.PI / 2;
      var endAngle   = startAngle + SLICE;
      var color      = rybHues[i].hex;

      // Fill segment
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // White divider lines
      ctx.strokeStyle = 'rgba(249,249,247,0.9)';
      ctx.lineWidth   = 2;
      ctx.stroke();
    }

    // Inner white circle (centre)
    ctx.beginPath();
    ctx.arc(cx, cy, INNER, 0, 2 * Math.PI);
    ctx.fillStyle = '#F9F9F7';
    ctx.fill();

    // Centre label
    ctx.fillStyle = '#1C1C2E';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 13px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('RYB', cx, cy - 7);
    ctx.font = '10px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('Color Wheel', cx, cy + 8);
  }

  // ---- Interaction helpers -----------------------------------

  // Resolve the correct clientX/Y from mouse or touch events.
  // touchend clears e.touches, so use e.changedTouches for touch events.
  function getClient(e) {
    var t = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]);
    return t ? { x: t.clientX, y: t.clientY } : { x: e.clientX, y: e.clientY };
  }

  function getDistFromCenter(e) {
    var rect   = canvas.getBoundingClientRect();
    var scaleX = canvas.width  / rect.width;
    var scaleY = canvas.height / rect.height;
    var c  = getClient(e);
    var dx = (c.x - rect.left) * scaleX - cx;
    var dy = (c.y - rect.top)  * scaleY - cy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getAngle(e) {
    var rect   = canvas.getBoundingClientRect();
    var scaleX = canvas.width  / rect.width;
    var scaleY = canvas.height / rect.height;
    var c  = getClient(e);
    var dx = (c.x - rect.left) * scaleX - cx;
    var dy = (c.y - rect.top)  * scaleY - cy;
    var angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // 0° = top
    return ((angle % 360) + 360) % 360;
  }

  function colorAtAngle(angleDeg) {
    var idx = Math.floor(angleDeg / 30) % 12;
    return rybHues[idx].hex;
  }

  function hueNameAtAngle(angleDeg) {
    var idx = Math.floor(angleDeg / 30) % 12;
    return rybHues[idx].name;
  }

  // ---- Mixing -------------------------------------------------

  function hexToRgb(hex) {
    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (v) {
      return Math.round(v).toString(16).padStart(2, '0').toUpperCase();
    }).join('');
  }

  function mixColors(hex1, hex2) {
    var c1 = hexToRgb(hex1);
    var c2 = hexToRgb(hex2);
    if (!c1 || !c2) return '#808080';
    return rgbToHex((c1.r + c2.r) / 2, (c1.g + c2.g) / 2, (c1.b + c2.b) / 2);
  }

  // ---- Update UI swatches ------------------------------------

  function updateSwatches() {
    var s1      = document.getElementById('swatch-1');
    var s2      = document.getElementById('swatch-2');
    var sMixed  = document.getElementById('swatch-mixed');
    var hex1El  = document.getElementById('hex-1');
    var hex2El  = document.getElementById('hex-2');
    var hexMix  = document.getElementById('hex-mixed');
    var name1El = document.getElementById('name-1');
    var name2El = document.getElementById('name-2');

    var mixed = mixColors(selectedColors[0], selectedColors[1]);

    if (s1)     s1.style.background    = selectedColors[0];
    if (s2)     s2.style.background    = selectedColors[1];
    if (sMixed) sMixed.style.background = mixed;
    if (hex1El) hex1El.textContent     = selectedColors[0];
    if (hex2El) hex2El.textContent     = selectedColors[1];
    if (hexMix) hexMix.textContent     = mixed;
    if (name1El) name1El.textContent   = rybHues[getIndexForHex(selectedColors[0])].name;
    if (name2El) name2El.textContent   = rybHues[getIndexForHex(selectedColors[1])].name;
  }

  function getIndexForHex(hex) {
    for (var i = 0; i < rybHues.length; i++) {
      if (rybHues[i].hex === hex) return i;
    }
    return 0;
  }

  // ---- Event listeners ---------------------------------------

  function handlePick(e) {
    e.preventDefault();
    var dist = getDistFromCenter(e);
    if (dist < INNER || dist > R) return;

    var angle = getAngle(e);
    selectedColors[clickCount % 2] = colorAtAngle(angle);
    clickCount++;
    updateSwatches();
  }

  canvas.addEventListener('click',      handlePick);
  canvas.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchend',   handlePick, { passive: false });

  // ---- Init --------------------------------------------------
  drawWheel();
  updateSwatches();
})();
