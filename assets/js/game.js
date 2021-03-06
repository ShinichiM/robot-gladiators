// Game States
// WIN: Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * defeat each enemy-robot
// Lose: Player robot health is zero or less


// ----------------------------------- Start Fight -----------------------------------
var fight = function(enemy) {

    while ((playerInfo.health > 0) && (enemy.health > 0)) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP? Enter 'FIGHT' or 'SKIP'");

        if (promptFight == 'skip' || promptFight == 'SKIP') {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("player Money",playerInfo.money);
                break;
            }
        }

        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

         // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            
        //check enemy health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            //Award player money for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        } else {
           window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
            
        // Log a resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            
        // check players health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};
// ----------------------------------------- End Fight ----------------------------------------------------------

// ---------------------------- Start Game -----------------------------------------
//fight();
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in Battle! Game Over!");
            break;
        }
    }
    endGame();
};
//  ----------------------------------------------- End Start Game ---------------------------------------------

// ------------------------------------------------ Start End Game -----------------------------------------------
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money);
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
//  ----------------------------------------- End 'End Game' -----------------------------------------------------

//  -------------------------------------------- Shop ------------------------------------------------------------
var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', 'LEAVE' to make a choice.");

    switch(shopOptionPrompt) {

        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        
        default: 
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    } 
};
// ----------------------------------------------------------------------------------------------------
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random()*(max-min+1) + min);
    return value;
};
//  ------------------------------------------ SETUP ----------------------------------------------------

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling Player's health by 20 for 7 dollars.");
            this.health += 10;
            this.money -= 7;
        } else {
            window.alert("You do not have enough money.");
        }     
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading Player's attack by 6 for 7 dollars.");
            this.attach += 6;
            this.money -= 7;
        } else {
            window.alert("You do not have enough money.");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    }, 
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    }, 
    {
        name: "Robo Trumble",
        attacK: randomNumber(10, 14)
    }
];

// ----------------------------------------------- End Setup ------------------------------------------------------
startGame();