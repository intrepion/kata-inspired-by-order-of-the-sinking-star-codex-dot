import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,step} from '../src/engine.js';
const corridor={map:['#########','#.......#','#########'],heroes:[{role:'seer',pos:[1,1]}],crystals:[[4,1],[6,1]],exits:[[7,1]]};
test('ordinary direction prioritizes the first visible target over walking',()=>{
 const s=createState(corridor),next=step(corridor,s,'right');
 assert.deepEqual(next.heroes[0].pos,[4,1]);
 assert.deepEqual(next.crystals,[[1,1],[6,1]]);
 assert.deepEqual(s.heroes[0].pos,[1,1]);
 assert.equal(next.moves,1);
});
test('legacy false argument cannot opt out of a valid swap',()=>{
 const s=createState(corridor);
 assert.deepEqual(step(corridor,s,'right',false).heroes[0].pos,[4,1]);
});
test('a neighboring hero is also a compulsory target',()=>{
 const l={...corridor,heroes:[{role:'seer',pos:[1,1]},{role:'warden',pos:[2,1]}]};
 const next=step(l,createState(l),'right');
 assert.deepEqual(next.heroes.map(h=>h.pos),[[2,1],[1,1]]);
 assert.deepEqual(next.crystals,[[4,1],[6,1]]);
});
test('wall stops targeting: walk if the adjacent tile is free',()=>{
 const l={...corridor,map:['#########','#..#....#','#########']};
 const next=step(l,createState(l),'right');
 assert.deepEqual(next.heroes[0].pos,[2,1]);
 assert.deepEqual(next.crystals,[[4,1],[6,1]]);
 assert.equal(step(l,next,'right'),next);
});
test('no target means walking; an immediate wall or board boundary means no move',()=>{
 const l={...corridor,crystals:[]},s=createState(l);
 assert.deepEqual(step(l,s,'right').heroes[0].pos,[2,1]);
 assert.equal(step(l,s,'up'),s);
 const edge={...l,map:['...'],heroes:[{role:'seer',pos:[0,0]}]};
 const e=createState(edge);assert.equal(step(edge,e,'left'),e);
});
