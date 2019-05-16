let {$, sleep} = require('./funcs');
 
let sleepTime = 500;
 
async function boardToArray(){
  let boardArray = [];
  let slots = await $('.slot'); // 42 slots
  let count = 0;
  for(let slot of slots){
    let cssClass = await slot.getAttribute('class');
    let color = 'empty';
    if(cssClass.includes('red')){ color = 'red'; }
    if(cssClass.includes('yellow')){ color = 'yellow'; }
    boardArray.push(color);
  }
  return boardArray;
}
 
module.exports = function(){
 
  // Background
 
  this.When(/^I choose to play as two smart bots$/, async function () {
    let typeChoiceButtons = await $('.type-choice-btn' );
    for(let typeChoiceButton of typeChoiceButtons){
      await typeChoiceButton.click();
      let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
      for(let choice of choices){
        let text = await choice.getText();
        if(text === 'Bot'){
          await choice.click();
          // we MUST break because the dom changes after click
          // and erases the old menu.. (tricky...)
          break;
        }
      }
      await sleep(sleepTime * 2);
    }
  });
 
  // Scenario
 
  this.Given(/^that two smart bots meet$/, async function(){
    // already given by the background
  });
 
  this.When(/^they have played until someone wins$/, async function(){
    while(true){
      let gameInfoH3 = await $('.game-info h3');
      // if there is no h3 run next iteration of the loop
      if(gameInfoH3 === null){ continue; }
      // otherwise check the text in the h3
      let text;
      try {
        text = await gameInfoH3.getText();
      }
      catch(e){
        // the element probably disappeared from the dom
        // we go a selenium "stale element" error
        // just continue the loop
        continue;
      }
      if(text.includes('oavgjort') || text.includes('vann')){
        // stop the loop if the game is over
        break;
      }
      // wait a short while between checks (otherwise the cpi is overloaded)
      await sleep(100);
    }
  });
 
  this.Then(/^they should not always have played identically$/, async function(){
    // here there are some tricky things to test
    await sleep(sleepTime * 10);
    // at least we have a function boardToArray that returns
    // an array representing how a board looks
    let theBoard = await boardToArray();
    console.log("boardArray length", theBoard.length);
    console.log("board", theBoard);
    // now let's think further:
    // could we store several of those arrays and compare them
    // to each other using assert.deepEqual ?
    // (yes we could go figure it out)
  });
 
}
