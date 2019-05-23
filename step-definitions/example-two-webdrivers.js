let { $, sleep } = require('./funcs');

// Importing a standalone selenium webdriver
// since the selenium-cucumber-js module
// sadly only supports one...
const { Builder } = require('selenium-webdriver');

let sleepTime = 500;

let oldBoard
let newBoard

async function Board1kolumn(position){
    let matrix = [ 
    0, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13    
]
console.log('matrix: ', matrix[1])
}

async function boardToArray(slots) {
    let boardArray = [];
    slots = slots || await $('.slot'); // 42 slots
    let count = 0;
    for (let slot of slots) {
        let cssClass = await slot.getAttribute('class');
        let color = 'empty';
        if (cssClass.includes('red')) { color = 'red'; }
        if (cssClass.includes('yellow')) { color = 'yellow'; }
        boardArray.push(color);
    }
    return boardArray;
}

function compareArray(board1, board2) {
    let differences = [];
    for (i = 0; i < 42; i++) {
        if (board1[i] !== board2[i]) {
            differences.push(
                {
                    color: board2[i],
                    position: i
                }
            )
        }
    }
    return differences
}

module.exports = function () {

    // Background

    this.When(/^I choose to play as a bot and a human$/, async function () {
        let typeChoiceButtons = await $('.type-choice-btn');
        let choiceArray = ['Bot', 'Människa'];
        for (let typeChoiceButton of typeChoiceButtons) {
            await typeChoiceButton.click();
            let currentChoice = choiceArray.shift();
            let choices = await $('.dropdown-menu.type-choice.show .dropdown-item');
            for (let choice of choices) {
                let text = await choice.getText();
                if (text === currentChoice) {
                    await choice.click();
                    // we MUST break because the dom changes after click
                    // and erases the old menu.. (tricky...)
                    break;
                }
            }
            await sleep(sleepTime * 2);
        }
    });

    this.When(/^with the names 'Our Bot' and 'Ms Perfect'$/, async function () {
        let inputFields = await $('input[placeholder="Namn (2-10 tecken)"]');
        await inputFields[0].sendKeys('Our bot');
        await sleep(sleepTime * 2);
        await inputFields[1].sendKeys('Ms Perfect');
        await sleep(sleepTime * 2);
    });

    let gamesolverDriver;

    // After having done a small change in funcs.js
    // so that $ can use any driver - as a second argument
    // I write my own function $$ that can be used instead of writing
    // gamesolverDriver.findElements(By.css('selector'));
    function $$(cssSelector) {
        return $(cssSelector, gamesolverDriver);
    }

    this.Given(/^that we are on the gamesolver page$/, async function () {
        // creating a new driver
        gamesolverDriver = await new Builder().forBrowser('chrome').build();
        // loading the gamesolver page
        await gamesolverDriver.get('https://connect4.gamesolver.org/');
    });

    this.When(/^I choose to play as human and bot in the gamesolver$/, async function () {
        let player2Button = await $$('#player_2');
        await player2Button.click();
        await sleep(sleepTime * 5);
    });

    this.When(/^they have played until one wins$/, async function () {
        let Board2NewPosition;
        let Board1Difference;
        let last;
        let Board1 = [];
        let Board1New = [];

        let beginButton = await $('.begin-btn');
        await beginButton.click();

        while (1) {
            try {
                if (Board1.length === 0) Board1 = await boardToArray()
            } catch (e) {
               await sleep(10) 
               continue
            }

            while (Board1New.length === 0 || compareArray(Board1, Board1New).length === 0) {
                try {
                    Board1New = await boardToArray()
                } catch (e) { }
                await sleep(200);
            }
            // ourLast
            //console.log('skillnad1 ' + Board1)
            //console.log('skillnad2 ' + Board1New)
            Board1Difference = await compareArray(Board1, Board1New)
            console.log('DIFFERENCES ', Board1Difference)
            Board1 = Board1New
            let kolumn = Board1Difference.map(a => a.position)
            kolumn = kolumn[1]? kolumn[1] : kolumn[0]; 
            console.log('Position ', kolumn)



            let Board2position = await gamesolverDriver.executeScript('return window.top.location.search')
            console.log(Board2position)
            let slots = await gamesolverDriver.findElements(by.css('.board'))
            await slots[18].click();

            while (!Board2NewPosition || Board2NewPosition === Board2position) {
                await sleep(200);
                Board2NewPosition = await gamesolverDriver.executeScript('return window.top.location.search')
                last = Board2NewPosition.split("")
                last = last[last.length - 1]
            }
            console.log('LAST: ', last)
            Board2position = Board2NewPosition;
            Board2NewPosition = false;


        }



    });

    this.Then(/^the gamesolver bot should always win$/, async function () {

        while (true) {
            let gameInfoH3 = await $('.game-info h3');
            // if there is no h3 run next iteration of the loop
            if (gameInfoH3 === null) { continue; }
            // otherwise check the text in the h3
            let text;
            try {
                text = await gameInfoH3.getText();
                console.log(text)
            }
            catch (e) {
                // the element probably disappeared from the dom
                // we go a selenium "stale element" error
                // just continue the loop
                continue;
            }
            if (text.includes('Our bot vann')) {
                // stop the loop if the game is over
                console.log('Our bot vann!!!')
                /*
                let alfa = document.querySelectorAll('slot row5').length
                let first = alfa[0]
                console.log(first)
                */
                break;
            }
            // wait a short while between checks (otherwise the cpi is overloaded)
            await sleep(100);
        }
    });

    // Now we only have to write two different functions (or at least understand)
    // how to dectect which column that was played as the latest move in
    // 1) our app/the prototype
    // 2) the gamesolver/perfect app
    //
    // Then we can start to fake being a human but sending the other bots
    // move so the two bots can meet automatically
    //
    // Then can we test if the perfect bot always win


}
