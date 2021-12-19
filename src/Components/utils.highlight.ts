
export type CodeLine = JSX.Element;
export type Line = Token[];

export interface Token {
    token: string;
    category: string;
    level?: 1 | 2 | 3 | 0;
}
const highKeywords = [
    "import",
    "from",
    "return",
    "if",
    "else",
    "switch",
    "default",
    "export",
]
const keywords = [
    "class",
    "extends",
    "this",
    "super",
    "function",
    "null",
    "var",
    "let",
    "const",
    "typeof",
    "interface",
    "type", "false"
];
export const tokens = [
    "keyword",
    "className",
    "punctuation",
    "function",
    "parameter",
    "operator",
    "number",
    "attributeName",
    "default",
];
const punctuation: string[] = [
    ".",
    ",",
    ";",
    ":",
    "<",
    ">",
    "=",
    "!=",
    "<=",
    ">=",
    "===",
    "!==",
    ">=",
    "/",
    "!",
    "+",
    "*"
];
const arrow: string[] = [
    ">=",
    "=>",
    "<=",
    "!=",
    "===",
    "!==",
    ">=",
    "!"
]
const openSymbols: string[] = [
    "(",
    "{",
    "[",
];
const closeSymbols: string[] = [
    ")",
    "}",
    "]",
];

export const isClassName = (word: string) => {
    return /[A-Z]/.test(word[0]);
};
export const isHighKeyWord = (word: string) => {
    return highKeywords.includes(word);
};
export const isKeyWord = (word: string) => {
    return keywords.includes(word);
};
export const isPunctuation = (word: string) => {
    return punctuation.includes(word);
};
export const isArrow = (word: string) => {
    return arrow.includes(word);
};
export const isOpenSymbol = (word: string) => {
    return openSymbols.includes(word);
};
export const isCloseSymbol = (word: string) => {
    return closeSymbols.includes(word);
};
/**
 * Makes a Token 
 * @param token the string representation of the token
 * @param category the category of the token
 * @param isFunction wheter is a function and must take this category
 * @param openString wheter is part of a large splted string and must take this category
 * @returns a token
 */
export const makeToken = (
    token: string,
    category: string,
    isFunction?: boolean,
    openString?: boolean
): Token => {
    let tokenToken: Token;

    if (openString) {
        tokenToken = { token: token, category: "string" };
    }
    else if (isFunction) {
        tokenToken = { token: token, category: "function" };
    } else {
        tokenToken = { token: token, category: category };

    }
    //console.log("make:", tokenToken);
    return tokenToken;
}
/**
 * @var a flag used to check whether a large splited string is being analyzed
 */
let openString: boolean = false;
/**
 * 
 * @param word a word to be analized for punctuation and strings
 * @returns 
 */
export const TOKENIZE = (
    currentWord: string
): Token[] => {
    let tokenArray: Token[] = [];
    //identif string
    //for each character
    let acumword = "";
    let isFunction = false;
    let i = 0;
    // in the future search for the pattern
    // string =              `${var} `
    //           symbol symbol  parameter symbol 
    if (currentWord.charAt(0) === "\"" || currentWord.charAt(0) === "\'" || currentWord.charAt(0) === "\`") {
        let tokenPrev: Token = makeToken(currentWord, "string");
        return [tokenPrev];
    }
    for (; i < currentWord.length; i++) {
        //go along in chars
        let currentCharacter = currentWord.charAt(i);

        if (isPunctuation(currentCharacter)) {
            //PUNCTUATION

            let tokenPrev: Token =
                makeToken(acumword, "", false, openString);
            tokenArray.push(tokenPrev);
            acumword = "";

            if (currentCharacter === "." && tokenArray[tokenArray.length - 1].token.length > 0) {
                //I found an object and a function
                isFunction = true;
                tokenArray[tokenArray.length - 1].category = "parameter";
                tokenArray[tokenArray.length - 1].token = tokenArray[tokenArray.length - 1].token.split(" ")[0];
            }

            // Now I add the "."
            let token: Token = //{ token: currentCharacter, category: "punctuation" };
                makeToken(currentCharacter, "punctuation", false, openString);
            tokenArray.push(token);
        } else if (isCloseSymbol(currentCharacter) || isOpenSymbol(currentCharacter)) {
            //                          SYMBOL
            let tokenPrev: Token = //{ token: acumword + " ", category: "" };
                makeToken(acumword, "", isFunction, openString);
            tokenArray.push(tokenPrev);
            acumword = "";

            if (currentCharacter === "(" && tokenArray[tokenArray.length - 1].token.length > 0) {
                tokenArray[tokenArray.length - 1].category = "function";
            }

            let token: Token = //{ token: currentCharacter, category: "symbol" };
                makeToken(currentCharacter, "symbol", false, openString);
            tokenArray.push(token);
        } else {
            //                  SIMPLE WORD
            //continue accumulating
            acumword += currentCharacter;
        }
    }
    let tokenPrev: Token = { token: acumword, category: "" };
    makeToken(acumword, "", isFunction);
    tokenArray.push(tokenPrev);
    //check for functions
    for (let i = 0; i < tokenArray.length - 1; i++) {
        if (tokenArray[i].token.includes(".") && tokenArray[i + 1].token === "") {
            tokenArray[i + 1].category = "function";
        }
    }
    return tokenArray;
}
/**
 * 
 * @param line 
 * @returns 
 */
export const tokenizeLine = (
    line: string
): Line => {
    let tokenArray: Token[] = [];

    //separate for whitespaces
    let words: string[];//= line.split(" ");
    // console.log("===>",words);
    let superWords: string[] = [];
    let strSymbol: string = "";
    let acumWord = "";
    for (let i = 0; i < line.length; i++) {
        let currentChar = line[i];

        if (currentChar === "\"" || currentChar === "\'" || currentChar === "\`") {
            strSymbol = currentChar;
            if (acumWord.length > 0) {
                superWords.push(acumWord);
                //console.log("wors", acumWord,currentChar);
                acumWord = "";
            }
            //better capture the entire string
            acumWord += currentChar;
            let j = i + 1;
            while (1) {
                let currentChar2 = line[j];
                if (currentChar2 === strSymbol) {
                    acumWord += currentChar2;
                    superWords.push(acumWord);
                    // console.log("wors", acumWord,currentChar);
                    acumWord = "";
                    break;
                } else {
                    acumWord += currentChar2;
                    j++;
                }
            }
            i = j;
        } else if (currentChar === " ") {
            //console.log("ws");
            superWords.push(acumWord);
            acumWord = "";
            //console.log("words", acumWord,currentChar);
            superWords.push(" ");
            acumWord = "";

            //i=i+2;
        } else if (currentChar.length === 0) {
            //console.log("empty");
            //acumWord += " ";
        } else {
            acumWord += currentChar;
        }

    }
    superWords.push(acumWord);
    words = superWords;

    //for each word
    for (let i = 0; i < words.length; i++) {
        // a word aftersplited by " "
        let currentWord = words[i];
        if (isKeyWord(currentWord)) {
            let tokenPrev: Token = { token: currentWord, category: "keyword" };
            // makeToken( currconsoleentWord + " ","",isFunction);
            tokenArray.push(tokenPrev);
        } else if (isHighKeyWord(currentWord)) {
            let tokenPrev: Token = { token: currentWord, category: "high-keyword" };
            //makeToken( currentWord + " ","",isFunction);
            tokenArray.push(tokenPrev);
        } else if (isArrow(currentWord)) {
            let tokenPrev: Token = { token: currentWord, category: "punctuation" };
            //makeToken( currentWord + " ","",isFunction);
            tokenArray.push(tokenPrev);
        } else {
            //punctuation
            tokenArray = [...tokenArray, ...TOKENIZE(currentWord)];
        }
    }
    for (let i = 0; i < tokenArray.length; i++) {
        if (tokenArray[i].token === "/") {

            if (tokenArray[i + 1] && tokenArray[i + 2] && tokenArray[i + 2].token === "/") {

                for (let j = i; j < tokenArray.length; j++) {
                    tokenArray[j].category = "comment";
                }
                break;
            }
        }

    }

    //go along tokens array and find classes
    for (let i = 0; i < tokenArray.length; i++) {
        let token: Token = tokenArray[i];
        if (isClassName(token.token)) {
            let j = i - 1;
            while (1) {
                if (tokenArray[j].token !== " " && j > 0) {
                    break;
                }
                j--;
            }
            if (j >= 0 && tokenArray[j].token === "import") {
                token.category = "parameter";
            } else if (j >= 0 && (["const", "function"].includes(tokenArray[j].token))) {
                token.category = "function";
            } else {
                token.category = "class-name";
            }
        }
        if ("<" == (token.token)) {
            if (tokenArray[i + 1]) {
                tokenArray[i + 1].category = "tag";
            }
        }
        if ("<" == (token.token) && tokenArray[i + 1] && tokenArray[i + 2] && tokenArray[i + 2].token === "/") {
            if (tokenArray[i + 3]) {
                tokenArray[i + 3].category = "tag";
            }
        }
    }


    return tokenArray;
}
/**
 * Splits the code into lines
 * 
 * For each line first splits by punctuation and strings
 * Also maintains whitespaces
 * 
 * After that, searchs for keywords
 * 
 * Tags with Classes and HTML-tags
 * @param code The entie code to be highlighted
 */
export const superHighlighter = (
    code: string
): Line[] => {


    //split in lines
    const lines: string[] = code.split("\n");

    //separate by punctuation
    let punctuationSeparated: Line[] = [];

    //For each line tokenize
    for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];
        let tokenArray = tokenizeLine(currentLine);

        punctuationSeparated.push(tokenArray);
    }

    return punctuationSeparated;
}


