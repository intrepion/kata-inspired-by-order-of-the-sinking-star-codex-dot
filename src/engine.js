export const directions={up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]};
export function createState(level){return {heroes:structuredClone(level.heroes),crystals:level.crystals.map(p=>[...p]),active:0,moves:0,fallen:false};}
const at=(p,x,y)=>p[0]===x&&p[1]===y;
export function occupant(s,x,y){const c=s.crystals.findIndex(p=>at(p,x,y));if(c>=0)return {kind:'crystals',index:c};const h=s.heroes.findIndex(h=>at(h.pos,x,y));return h>=0?{kind:'heroes',index:h}:null;}
export function floor(l,x,y){return y>=0&&y<l.map.length&&x>=0&&x<l.map[y].length&&l.map[y][x]!=='#'&&l.map[y][x]!==' '&&!(l.sentinels||[]).some(p=>at(p,x,y));}
function put(s,o,p){if(o.kind==='heroes')s.heroes[o.index].pos=p;else s.crystals[o.index]=p;}
export function won(l,s){return !s.fallen&&s.heroes.every(h=>l.exits.some(p=>at(p,...h.pos)));}
function finishMove(l,s){s.moves++;s.fallen=(l.sentinels||[]).some(p=>s.heroes.some(h=>Math.abs(h.pos[0]-p[0])+Math.abs(h.pos[1]-p[1])===1));return s;}
export function step(l,state,dir){
 if(state.fallen)return state;
 const d=directions[dir];if(!d)return state;
 const s=structuredClone(state),h=s.heroes[s.active],[x,y]=h.pos,[dx,dy]=d,nx=x+dx,ny=y+dy;
 if(h.role==='seer'){
  let tx=nx,ty=ny;
  while(floor(l,tx,ty)){const o=occupant(s,tx,ty);if(o){put(s,o,[x,y]);h.pos=[tx,ty];return finishMove(l,s);}tx+=dx;ty+=dy;}
 }
 if(!floor(l,nx,ny))return state;
 const front=occupant(s,nx,ny);
 if(front){
  if(h.role!=='warden'||!floor(l,nx+dx,ny+dy)||occupant(s,nx+dx,ny+dy))return state;
  put(s,front,[nx+dx,ny+dy]);
 }
 h.pos=[nx,ny];
 if(h.role==='tether'){const behind=occupant(s,x-dx,y-dy);if(behind)put(s,behind,[x,y]);}
 return finishMove(l,s);
}
