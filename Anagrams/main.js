window.onload = function(e){
    document.getElementById('fileInput').addEventListener('change', readFile, false);
}
function readFile(event){
    const reader = new FileReader();
    reader.onload = (e) => {
        let data = e.target.result;
        let dict = makeDictionary(data);
        let result="";
        dict.forEach( (value,key,map) => result+=(key+" - "+value)+"\n" );
        document.getElementById('content').innerText = result;
    }
    reader.readAsText(event.target.files[0])
}
function makeDictionary(str){
    let dict = new Map();
    // let reg = /[a-zA-Zа-яА-ЯіІєЄ'їЇ]+/gm
   // let reg = /[\s\d]+/gm;
    let reg = /[a-zA-Zа-яА-ЯіІєЄ'їЇ]+/gm
    let arr= str.match(reg);
    for(let word of arr){
    let sortedWord = word.toLowerCase().replace("'","").split('').sort().join('');
    if(dict.get(sortedWord)) {
       if(!dict.get(sortedWord).includes(word)) dict.get(sortedWord).push(word);
    }
    else dict.set(sortedWord,[word]);
    }
    return dict;

}