(function(){
  const SEGMENTS = [
    {label:'1', color:'#3369E8', weight:1},
    {label:'2', color:'#D50F25', weight:1},
    {label:'3', color:'#EEB211', weight:1},
    {label:'4', color:'#009925', weight:1},
    {label:'5', color:'#f59e0b', weight:0},  // 5 nigdy się nie wylosuje
    {label:'6', color:'#a78bfa', weight:1},
    {label:'7', color:'#f43f5e', weight:1},
    {label:'8', color:'#10b981', weight:1}
  ];

  const wheel = document.getElementById('wheel');
  const slicesGroup = document.getElementById('slices');
  const centerBtn = document.getElementById('spinBtn');
  const resultEl = document.getElementById('result');

  const R = 230;
  const sliceAngle = 360 / SEGMENTS.length;

  // narysuj segmenty
  SEGMENTS.forEach((seg, i) => {
    const start = (i*sliceAngle - 90) * Math.PI/180;
    const end   = ((i+1)*sliceAngle - 90) * Math.PI/180;
    const x1 = Math.cos(start)*R, y1 = Math.sin(start)*R;
    const x2 = Math.cos(end)*R, y2 = Math.sin(end)*R;

    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M0 0 L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`);
    path.setAttribute('fill', seg.color);
    path.setAttribute('id','slice-'+seg.label);
    slicesGroup.appendChild(path);

    // numer segmentu
    const ang = (i*sliceAngle + sliceAngle/2 -90) * Math.PI/180;
    const lx = Math.cos(ang)*R*0.6;
    const ly = Math.sin(ang)*R*0.6;
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x',lx);
    t.setAttribute('y',ly+8);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('font-size','28');
    t.setAttribute('font-weight','700');
    t.setAttribute('fill','#061826');
    t.textContent = seg.label;
    slicesGroup.appendChild(t);
  });

  let rotation = 0;
  let spinning = false;

  function chooseSegment() {
    // filtrujemy segmenty z wagą >0
    const valid = SEGMENTS.filter(s=>s.weight>0);
    const chosen = valid[Math.floor(Math.random()*valid.length)];
    return chosen;
  }

  function spinWheel(){
    if(spinning) return;
    spinning = true;
    resultEl.textContent = 'Wynik: ...';

    const chosen = chooseSegment();
    const index = SEGMENTS.findIndex(s=>s.label===chosen.label);

    const full = 3 + Math.floor(Math.random()*3);
    const target = full*360 + index*sliceAngle + sliceAngle/2;

    rotation = (rotation + target) % 360;
    slicesGroup.parentNode.style.transition = 'transform 4s cubic-bezier(.08,.9,.28,1)';
    slicesGroup.parentNode.style.transform = `rotate(${rotation}deg)`;

    slicesGroup.parentNode.addEventListener('transitionend', function onEnd(){
      slicesGroup.parentNode.removeEventListener('transitionend', onEnd);
      spinning = false;
      resultEl.textContent = 'Wynik: ' + chosen.label;
    });
  }

  centerBtn.addEventListener('click', spinWheel);

})();
