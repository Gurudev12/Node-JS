let underscore = require("underscore")
let input = require("readline-sync")
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


var partners = underscore.chunk(array, 5);
console.log("====>", partners);


console.log("ENTER YOUR CHOICE");
let choice = input.questionInt();
switch (choice) {
    case 1:
        console.log("CHUNK OUTPUT", partners[0]);
        break;
    case 2:
        console.log("CHUNK OUTPUT", partners[1]);
        break;
    case 3:
        console.log("CHUNK OUTPUT", partners[2]);
        break;
    case 4:
        console.log("CHUNK OUTPUT", partners[3]);
        break;
    case 5:
        console.log("CHUNK OUTPUT", partners[4]);
        break;
    default:
        console.log("You have entered wrong choice");
        
}
