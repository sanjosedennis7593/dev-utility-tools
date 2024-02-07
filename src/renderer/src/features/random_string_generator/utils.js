const NUMBERS = '0123456789';
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SPECIAL_CHARACTERS = '~!@#$%^&*()_+{}:"<>?';
const UPPERCASE_CHARACTERS = LETTERS;
const LOWERCASE_CHARACTERS = LETTERS.toLowerCase();


const shuffleStrings = (string = '') => {
    return [...string].sort(()=>Math.random()-.5).join('')
};

const generateRandomStringList = ({
    givenRandomStrings,
    noOfStrings,
    stringLength
}) => {
    let randomStrings = [];
    for (let x = 0; x < noOfStrings; x++) {
        let currentRandomString = '';
        for (let y = 0; y < stringLength; y++) {
            let index = Math.floor(Math.random() * givenRandomStrings.length);
            currentRandomString += givenRandomStrings.substring(index, index + 1);
        }
        randomStrings.push(currentRandomString);
    }

    return randomStrings.join('\n');
};


export {
    generateRandomStringList,
    shuffleStrings,
    NUMBERS,
    LETTERS,
    SPECIAL_CHARACTERS,
    UPPERCASE_CHARACTERS,
    LOWERCASE_CHARACTERS
}