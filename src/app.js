import {won} from './engine.js';
import {createSession,move,undo as undoSession} from './session.js';
import {levels} from './levels.js';
const $=id=>document.getElementById(id);
const abilities={warden:['Warden','Push an adjacent crystal or hero.','▲'],tether:['Tether','Automatically pull what is behind you.','⌁'],seer:['Seer','Direction: automatically swap with the first crystal or hero in sight; otherwise walk.','✧']};
const saveKey='threefold-passage.v1.completed';
let completed=[];try{const saved=JSON.parse(localStorage.getItem(saveKey)||'[]');if(Array.isArray(saved))completed=saved.filter(n=>Number.isInteger(n)&&n>=0&&n<levels.length);}catch{/* Storage may be unavailable; play remains session-local. */}
let index=0,session=createSession(levels[0]);
let {state,history}=session;
function updateSession(next){session=next;({state,history}=session);}
function selectHero(n){if(n>=state.heroes.length)return;updateSession({...session,state:{...state,active:n}});render();}
function load(n){index=n;updateSession(createSession(levels[n]));$('status').textContent='';render();}
function action(dir){
 if(won(levels[index],state))return;
 const next=move(session,dir);
 if(next===session){$('status').textContent='The way is blocked. Try another approach or another hero.';return;}
 updateSession(next);$('status').textContent='';
 if(won(levels[index],state)&&!completed.includes(index)){completed.push(index);try{localStorage.setItem(saveKey,JSON.stringify(completed));}catch{}}
 render();
}
function undo(){if(history.length){updateSession(undoSession(session));$('status').textContent='One step unwound.';render();}}
function render(){
 const l=levels[index],solved=won(l,state);
 $('chapter').textContent=`PASSAGE ${String(index+1).padStart(2,'0')} / ${String(levels.length).padStart(2,'0')} · ${l.theme.toUpperCase()}`;
 $('title').textContent=l.name;$('moves').textContent=state.moves;$('undo').disabled=!history.length;
 $('levels').replaceChildren(...levels.map((level,n)=>{const b=document.createElement('button');b.className=n===index?'active':'';b.setAttribute('aria-current',n===index?'step':'false');b.innerHTML=`<b>${completed.includes(n)?'✓':String(n+1).padStart(2,'0')}</b><span>${level.name}<small>${level.theme}</small></span>`;b.onclick=()=>load(n);return b;}));
 const board=$('board');board.style.gridTemplateColumns=`repeat(${l.map[0].length},1fr)`;board.replaceChildren();
 l.map.forEach((row,y)=>[...row].forEach((cell,x)=>{
  const tile=document.createElement('div');tile.className='tile'+(cell==='#'?' wall':'');
  const exit=l.exits.some(p=>p[0]===x&&p[1]===y);if(exit)tile.classList.add('exit');
  let label=`${x},${y}: ${cell==='#'?'wall':exit?'exit':'floor'}`;
  if(state.crystals.some(p=>p[0]===x&&p[1]===y)){const gem=document.createElement('div');gem.className='crystal';tile.append(gem);label+='; crystal';}
  const hn=state.heroes.findIndex(h=>h.pos[0]===x&&h.pos[1]===y);
  if(hn>=0){const h=state.heroes[hn],figure=document.createElement('div');figure.className=`hero ${h.role}${hn===state.active?' selected':''}`;figure.innerHTML=`<span>${abilities[h.role][2]}</span>`;tile.append(figure);label+=`; ${abilities[h.role][0]}${hn===state.active?' selected':''}`;tile.onclick=()=>selectHero(hn);}
  tile.setAttribute('aria-label',label);board.append(tile);
 }));
 $('heroes').replaceChildren(...state.heroes.map((h,n)=>{const b=document.createElement('button');b.className=n===state.active?'selected':'';b.setAttribute('aria-pressed',String(n===state.active));b.innerHTML=`${n+1} · ${abilities[h.role][0]}<small>${abilities[h.role][1]}</small>`;b.onclick=()=>selectHero(n);return b;}));
 $('completion').hidden=!solved;$('complete-text').textContent=index===levels.length-1?'All six passages crossed. Revisit any passage to explore another solution.':'Every companion has found a way through.';
 $('next').textContent=index===levels.length-1?'Return to the first passage →':'Continue the expedition →';
}
$('undo').onclick=undo;$('restart').onclick=()=>load(index);$('hint').onclick=()=>{$('status').textContent=levels[index].hint;};$('next').onclick=()=>load((index+1)%levels.length);
document.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>action(b.dataset.dir));
const keys={ArrowUp:'up',w:'up',ArrowRight:'right',d:'right',ArrowDown:'down',s:'down',ArrowLeft:'left',a:'left'};
window.addEventListener('keydown',e=>{
 if(e.target.matches('input,textarea,select'))return;
 const k=e.key.length===1?e.key.toLowerCase():e.key;
 if(keys[k]){e.preventDefault();action(keys[k]);}
 else if(k==='z'){e.preventDefault();undo();}
 else if(k==='r'){e.preventDefault();load(index);}
 else if(['1','2','3'].includes(k)){e.preventDefault();selectHero(Number(k)-1);}
 else if(k==='Tab'&&e.target===$('board')){e.preventDefault();selectHero((state.active+1)%state.heroes.length);}
});
render();
