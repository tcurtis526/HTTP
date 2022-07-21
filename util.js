/*
    Created By: Jared Longnecker
    Last Updated: 03/19/2022
    Description: Utility module for the API callouts and prettifying the pokemon names
*/

// The async keyword here causes this function to return a promise
async function getPokemon(pokemonName) {
    pokemonName = nameForApi(pokemonName);

    // Use the Fetch API to make a request to an API service and return the result
    const req = new Request('https://pokeapi.co/api/v2/pokemon/' + pokemonName);

    // By using the await keyword here, we can shorthand the promise syntax to not have to run .then() to resolve the promise
    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
}



/*
    UTILITY FUNCTIONS BELOW
*/

function nameForDisplay(word) {
    word = megaConversion(word);
    word = capitalize(word);
    return word;
}

function nameForApi(word) {
    word = word.toLowerCase();
    word = megaConversion(word);
    word = word.replace(" ", "-");
    return word;
}

// Returns a string with the first letter of each word capitalized
function capitalize(word) {
    let allWords = word.split('-');
    let ret = "";
    for (let word of allWords) {
        ret += capitalizeWord(word) + " ";
    }
    return ret.substring(0, ret.length - 1);
}

// Converts a single word to a capitalized word
function capitalizeWord(word) {
    let wordBody = word.substring(1);
    return word[0].toUpperCase() + wordBody;
}

// Converts a word from normal mega syntax to pokeApi mega syntax and vice-versa
let megaConversion = word => {
    if (word.indexOf("mega") == -1) return word;

    // Don't skip Meganium
    if (word.indexOf("megan") != -1 || word == "mega") return word;

    if (word.indexOf("-") != -1) return megaFromKebab(word);

    return megaToKebab(word);
}

// Converts pokeApi kebab mega name to a normal readable mega name
let megaFromKebab = word => "mega-" + word.replace("-mega", "");

// Converts a normal readable mega name to a kebab pokeApi name
let megaToKebab = word => {
    word = word.replace("mega ", "");
    if (word.indexOf(" ") == -1) return word + "-mega";
    word = word.replace(" ", "-mega-");
    return word.replaceAll(" ", "-");
}