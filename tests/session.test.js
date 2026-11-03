import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession,move,undo} from '../src/session.js';
const level={map:['#########','#.......#','#########'],heroes:[{role:'seer',pos:[1,1]}],crystals:[[4,1]],exits:[[7,1]]};
test('undo restores both ends of a compulsory swap and its move count',()=>{
 const initial=createSession(level),swapped=move(initial,'right');
 assert.deepEqual(swapped.state.heroes[0].pos,[4,1]);
 const restored=undo(swapped);
 assert.deepEqual(restored.state,initial.state);
 assert.equal(restored.history.length,0);
 assert.equal(undo(restored),restored);
});
test('blocked directions add no history and undo returns to the preceding successful move',()=>{
 const s=move(createSession(level),'right'),blocked=move(s,'up');
 assert.equal(blocked,s);
 assert.equal(undo(blocked).state.moves,0);
});
test('a watcher catches an adjacent hero, locks moves, and undo restores play',()=>{
 const l={map:['#######','#.....#','#.....#','#.....#','#######'],heroes:[{role:'warden',pos:[1,2]}],crystals:[],sentinels:[[3,2]],exits:[[5,2]]};
 const safe=createSession(l),caught=move(safe,'right');assert.equal(caught.state.fallen,true);assert.equal(move(caught,'down'),caught);
 const restored=undo(caught);assert.equal(restored.state.fallen,false);assert.deepEqual(restored.state.heroes[0].pos,[1,2]);
});
