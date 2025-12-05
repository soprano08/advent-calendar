(function(){
  const SEGMENTS = 8;
  const R = 230;
  const sliceAngle = 360 / SEGMENTS;
  const colors = ['#f97316','#fb7185','#60a5fa','#34d399','#f59e0b','#a78bfa','#f43f5e','#10b981'];
  const forbiddenIndex = 4; // segment 5 (index 4) nigdy nie wylosuje się

  const g = document.getElementById('slices');
  for(let i=0;i<SEGMENTS;i++){
    const start = (i*sliceAngle - 90) * Math.PI/180;
    const end   = ((i+1)*sliceAngle - 90) * Math.PI/180;
    const x1 = Math.cos(start)*R, y1 = Math.sin(start)*R;
    const x2 = Math.cos(end)*R,   y2 = Math.sin(end)*R;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M 0 0 L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`);
    path.setAttribute('fill', colors[i % colors.length]);
    path.setAttribute('id','slice-'+(i+1));
    g.appendChild(path);

    const ang = (i*sliceAngle + sliceAngle/2 - 90) * Math.PI/180;
    const lx = Math.cos(ang)*(R*0.6), ly = Math.sin(ang)*(R*0.6);
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x', lx);
    t.setAttribute('y', ly + 8);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('font-size','34');
    t.setAttribute('font-weight','700');
    t.setAttribute('fill','#061826');
    t.setAttribute('class','label');
    t.textContent = (i+1).toString();
    g.appendChild(t);
  }

  const wheel = document.getElementById('wheel');
  const spinBtn = document.getElementById('spinBtn');
  const centerBtn = document.getElementById('centerBtn');
  const resultEl = document.getElementById('result');
  const arrowEl = document.querySelector('.arrow');

  let spinning = false;
  let rotation = 0;

  function doSpin(){
    if(spinning) return;
    spinning = true;
    resultEl.textContent = 'Wynik: ...';

    // lista dostępnych segmentów bez 5
    const allowed = [0,1,2,3,5,6,7];
    const chosen = allowed[Math.floor(Math.random()*allowed.length)];

    const full = 3 + Math.floor(Math.random()*4);

    // losowy jitter, ale upewniamy się, że nie wyląduje na zakazanym segmencie
    const maxJitter = sliceAngle * 0.4; // ±40% kąta segmentu
    const jitter = (Math.random()*2 - 1) * maxJitter;

    // rotacja do środka segmentu + jitter
    const target = full*360 + chosen*sliceAngle + sliceAngle/2 + jitter;

    rotation = (rotation + target) % 360;
    wheel.style.transition = `transform 3.8s cubic-bezier(.08,.9,.28,1)`;
    wheel.style.transform = `rotate(${rotation}deg)`;

    const onEnd = () => {
      wheel.removeEventListener('transitionend', onEnd);
      setTimeout(()=>determineWinner(), 30);
    };
    wheel.addEventListener('transitionend', onEnd);
  }

  function determineWinner(){
    const arrowRect = arrowEl.getBoundingClientRect();
    const targetY = arrowRect.bottom;

    const labels = Array.from(document.querySelectorAll('#slices text'));
    let best = null;
    let bestDist = Infinity;

    labels.forEach(l => {
      const number = parseInt(l.textContent.trim(),10);
      if(number === 5) return; // ignorujemy zakazany segment
      const r = l.getBoundingClientRect();
      const centerY = r.top + r.height/2;
      const dist = Math.abs(centerY - targetY);
      if(dist < bestDist){
        bestDist = dist;
        best = l;
      }
    });

    if(best){
      const number = best.textContent.trim();
      resultEl.textContent = 'Wynik: ' + number;
      highlightSlice(number);
    }
    spinning = false;
  }

  function highlightSlice(num){
    for(let i=1;i<=SEGMENTS;i++){
      const el = document.getElementById('slice-'+i);
      if(el) el.classList.remove('highlight');
    }
    const chosenEl = document.getElementById('slice-'+num);
    if(chosenEl){
      chosenEl.classList.add('highlight');
      setTimeout(()=>{ chosenEl.classList.remove('highlight'); }, 1600);
    }
  }

  spinBtn.addEventListener('click', doSpin);
  centerBtn.addEventListener('click', doSpin);

  window.addEventListener('load', ()=>{ wheel.style.transform = 'rotate(0deg)'; rotation = 0; });
})();
