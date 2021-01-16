const fs = require('fs')

function readFile(fileName){
    let data = fs.readFileSync(fileName).toString();
    let dict = makeDictionary(data);
    let values = Array.from(dict.values()).filter( arr => arr.length > 1);
    values.forEach( words => console.log((words.join(' - '))) );
}
function sortLine(line) {
    return line.toLowerCase().replace("'","").split('').sort().join('');
}
function makeDictionary(str){
    let dict = new Map();
    let reg = /[a-zA-Zа-яА-ЯіІєЄ'їЇ]+/gm
    let arr= str.match(reg);
    for(let word of arr){
        let sortedWord = sortLine(word);
        if(dict.get(sortedWord)) {
            if(!dict.get(sortedWord).includes(word)) dict.get(sortedWord).push(word);
        }
        else dict.set(sortedWord,[word]);
    }
    return dict;

}

readFile('./anagrams.txt');