import {createState,step,won} from './engine.js';
export function createSession(level){return {level,state:createState(level),history:[]};}
export function move(session,dir){
 if(won(session.level,session.state))return session;
 const state=step(session.level,session.state,dir);
 return state===session.state?session:{...session,state,history:[...session.history,session.state]};
}
export function undo(session){
 if(!session.history.length)return session;
 return {...session,state:session.history.at(-1),history:session.history.slice(0,-1)};
}
