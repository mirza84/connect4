let { $, sleep } = require('./funcs');

// Importing a standalone selenium webdriver
// since the selenium-cucumber-js module
// sadly only supports one...
const { Builder } = require('selenium-webdriver');

let sleepTime = 500;

//hittar motsvarande position i board 2
function Board1toBoard2(position){
    let board2pos = 0

    if(position === 0) board2pos = 0
    if(position === 1) board2pos = 6
    if(position === 2) board2pos = 12
    if(position === 3) board2pos = 18
    if(position === 4) board2pos = 24
    if(position === 5) board2pos = 30
    if(position === 6) board2pos = 36
    if(position === 7) board2pos = 1
    if(position === 8) board2pos = 7
    if(position === 9) board2pos = 13
    if(position === 10) board2pos = 19
    if(position === 11) board2pos = 25
    if(position === 12) board2pos = 31
    if(position === 13) board2pos = 37
    if(position === 14) board2pos = 2
    if(position === 15) board2pos = 8
    if(position === 16) board2pos = 14
    if(position === 17) board2pos = 20
    if(position === 18) board2pos = 26
    if(position === 19) board2pos = 32
    if(position === 20) board2pos = 38
    if(position === 21) board2pos = 3
    if(position === 22) board2pos = 9
    if(position === 23) board2pos = 15
    if(position === 24) board2pos = 21
    if(position === 25) board2pos = 27
    if(position === 26) board2pos = 33
    if(position === 27) board2pos = 39
    if(position === 28) board2pos = 4
    if(position === 29) board2pos = 10
    if(position === 30) board2pos = 16
    if(position === 31) board2pos = 22
    if(position === 32) board2pos = 28
    if(position === 33) board2pos = 34
    if(position === 34) board2pos = 40
    if(position === 35) board2pos = 5
    if(position === 36) board2pos = 11
    if(position === 37) board2pos = 17
    if(position === 38) board2pos = 23
    if(position === 39) board2pos = 29
    if(position === 40) board2pos = 35
    if(position === 41) board2pos = 41

    return board2pos
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
            
            Board1Difference = await compareArray(Board1, Board1New)
            console.log('DIFFERENCES ', Board1Difference)
            Board1 = Board1New
            let Board1position = Board1Difference.map(a => a.position)
            Board1position = Board1position[1]? Board1position[1] : Board1position[0]; 
            console.log('Board1 Position: ', Board1position)

            //let kolumn = await Board1kolumn(Board1position)
            //console.log('Board1 Kolumn: ', kolumn)

            let board1toboard2POS = Board1toBoard2(Board1position)
            console.log('Board1 positionen ' + Board1position + ' motsvarar Board2 position ' + board1toboard2POS)


            let Board2position = await gamesolverDriver.executeScript('return window.top.location.search')
            console.log('Board2 Position: ', Board2position)
            let slots = await gamesolverDriver.findElements(by.css('.board'))
            await slots[board1toboard2POS].click(); //spela board1-drag på board2
            await sleep(2000)

            while (!Board2NewPosition || Board2NewPosition === Board2position) {
                await sleep(200);
                Board2NewPosition = await gamesolverDriver.executeScript('return window.top.location.search')
                last = Board2NewPosition.split("")
                last = last[last.length - 1]
            }
            console.log('LAST: ', last)
            Board2position = Board2NewPosition;
            Board2NewPosition = false;

            last-- //kolumner på board2 börjar på 1 medan kolumn på board1 börjar på 0
                    //så man får räknar ner ett steg för att få rätt kolumn i board1
            slots = await $('.slot')
            await slots[last].click()
            await sleep(2000)

            // kontroll om någon har vunnit
            // fungerar ej
            
            let solutionBoard2 = await gamesolverDriver.findElement(by.css('#solution_header')).getAttribute('innerHTML')
            
            let solutionBoard1 = await driver.findElement(by.css('body > div > main > div > div.game-info > h3')).getAttribute('innerHTML')

            //console.log('SOLUTION: ', solutionBoard1)
            if(solutionBoard2.includes('won')){
                console.log('Our bot vann!!!')
                break
            }else if(solutionBoard1.includes('vann')){
                console.log('Motståndaren vann!!!')
                break
            }
            

        }
    })

    this.Then(/^the gamesolver bot should always win$/, async function () {

        

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
