const vowels = "aeiouy";

function pigLatin(word) {
    let prefix = "";
    let stem = "";
    for (let letter of word) {
        if (vowels.includes(letter.toLowerCase())) {
            break;
        }
        prefix += letter;
    }
    stem = word.slice(prefix.length);
    return stem + prefix + "ay";
}
console.log(pigLatin("stop"))
console.log(pigLatin("no"))
console.log(pigLatin("people"))
console.log(pigLatin("bubble"))
console.log(pigLatin("under"))
console.log(pigLatin("admitted"))
console.log(pigLatin("away"))