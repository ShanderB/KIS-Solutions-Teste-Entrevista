

function pigLatin(str) {
  
    let words = str.split(" "); //turns user sentence into array separated at blank spaces
  
    let oneVowel = /^([aeiou])$/gi; //contains only one vowel
    let vowel = /^([aeiou][a-z]+)$/gi; //starts with a vowel, followed by other characters
    let novowel = /^([^aeiou][^aeiou]+)$/gi; //doesn't start with a vowel, or have any vowels in the word
    let consonant = /^([^aeiou"']+)([a-z]+)$/gi; //doesn't start with a vowel, followed by other characters
    let punctuation = /^([a-z]+|\s?)([^a-z]+)([a-z]+?|\s?)$/gi; //catches special characters attached to words
  
    let capital = /^([A-Z])$/; //to target capital letters
    let capAnswer = false; // for capital letter test
  
    let special = /[^a-z]+/gi; //targets the special character
  
  
    //loop tests every word
    for(let i = 0; i < words.length; i++) {
      
      words[i] = specialTest(words[i]); //word[i] receives result from function call
  
    }
      
    
    function specialTest(word) {
  
      let specialCheck = false; //resets at function start
      word = word.split(""); //word is split into single character array
        
      //check each character for special character
      word.forEach(character => {
          
        if(special.test(character) || punctuation.test(character)) { 
            
          specialCheck = true; //only if it exists
        } 
      });
  
      word = word.join(""); //make array into string
  
      //assigns function result to word
      if(specialCheck) {
        word = specialSearch(word); //if true
      } else {
        word = notSpecial(word); //if false
      }
  
      return word; //sends result to for loop
    }
  
    
    //transforms words without punctuation
    function notSpecial(word) {
  
      if(oneVowel.test(word)) {
        word = word.replace(oneVowel, "$1yay"); //if word contains only one vowel
      } else if(vowel.test(word)) {
        word = word.replace(vowel, "$1ay"); //if word starts /w a vowel, adds "way" at the end
      } 
      if(novowel.test(word)) {
        word = word.replace(novowel, "$1ay"); //if word doesn't start or contain any vowels, adds "ay" at end
      } else if (consonant.test(word)) { //if word starts with a consonant, and contains vowels
       
        if(capital.test(word[0])) { //checks to see if 1st letter was capital
          capAnswer = true;
        }
  
        word = word[0].toLowerCase()+word.slice(1); //alteration moves 1st pattern to the back, so lowecase
        word = word.replace(consonant, "$2$1ay"); //sends 1st pattern to the end, and adds "ay" to the end
        
        if(capAnswer) {  //capitalizes 1st letter of word only if it was capital before alteration
          word = word[0].toUpperCase()+word.slice(1); 
          capAnswer = false;
        }
      }
  
      return word;
    }
  
  
    //transforms words with puctuations  
    function specialSearch(word) {
  
      let conMatch = ""; //to store consonant cluster match
      let conAnswer = false; //for consonant test
      let size = word.length - 1; //stores length of word
      let array = [];
      let count = 0;
      let obj = {};
  
      word = word.split(""); //splits word into single character array
  
      //search for special character
      word.forEach(index => {
  
        obj = {  //reinitializes object
          character: "",
          position: 0
        }; 
  
        if(special.test(index)) { //test
          obj.character = index.match(special);  //stores the exact character
          obj.position = count; //records position in word
          array.push(obj);  //sends object to array
        }
        count++;
      });
  
  
      //delete special characters before alteration
      array.forEach(obj => { 
  
        word.splice(obj.position - count, 1); //deletes character from word
      });
  
      word = word.join(""); //joins word array back to string
  
      //exact rules decribed above in notSpecial function
      if(oneVowel.test(word)) {
        word = word.replace(oneVowel, "$1way"); 
      } else if(vowel.test(word)) {
        word = word.replace(vowel, "$1way"); 
      } 
      if(novowel.test(word)) {
        word = word.replace(novowel, "$1ay");
      } else if (consonant.test(word)) { 
        
        conAnswer = true; //for later use in positioning test below
  
        if(capital.test(word[0])) {  //checks to see if 1st letter was capital
          capAnswer = true;
        }
        
        conMatch = word.replace(consonant, "$1"); //store 1st consonant cluster
        word = word[0].toLowerCase()+word.slice(1);
        word = word.replace(consonant, "$2$1ay");
  
        if(capAnswer) {  //capitalizes 1st letter of word only if it was capital before alteration
          word = word[0].toUpperCase()+word.slice(1); 
          capAnswer = false; //reset
        }
      }
  
      //punctuation positioning after word alteration
      array.forEach(obj => {  //iterates through every special character stored in array
  
        if(obj.position == 0) { //if position was at the beginning adds to beginning
          word = obj.character + word;
        } else if(obj.position == size && obj.character != "\'") { //if position was at the end adds to the end
          word = word + obj.character;
        } else if(conAnswer) {
          obj.position = obj.position - conMatch.length; //corrects for alteration placements
          word = word.split(""); //the individual word is split into a single character array
          word.splice(obj.position,0,obj.character); //target is placed in its original recorded index
          word = word.join(""); //the array is coverted back into a string 
        } else {
          word = word.split(""); //the individual word is split into a single character array
          word.splice(obj.position,0,obj.character); //target is placed in its original recorded index
          word = word.join(""); //the array is coverted back into a string     
        }
      });
  
      conAnswer = false; //resets if it was true 
      return word;
    }
   return words = words.join(" "); //the words array is converted back into a string
  
  }
  
/* 
console.log(pigLatin("Stop"))
console.log("Opstay")
console.log("Opstay" == pigLatin("Stop"))
console.log("---------------")
console.log(pigLatin("No littering"))
console.log("Onay itteringlay")
console.log("Onay itteringlay" == pigLatin("No littering"))
console.log("---------------")
console.log(pigLatin("No shirts, no shoes, no service"))
console.log("Onay irtsshay, onay oesshay, onay ervicesay")
console.log("Onay irtsshay, onay oesshay, onay ervicesay" == pigLatin("No shirts, no shoes, no service"))
console.log("---------------")
console.log(pigLatin("No persons under 14 admitted"))
console.log("Onay ersonspay underay 14 admitteday")
console.log("Onay ersonspay underay 14 admitteday" == pigLatin("No persons under 14 admitted"))
console.log("---------------") */
console.log(pigLatin("Hey buddy, get away from my car!"))
console.log("Eyhay uddybay, etgay awayay omfray ymay arcay!")
console.log("Eyhay uddybay, etgay awayay omfray ymay arcay!" == pigLatin("Hey buddy, get away from my car!"))

