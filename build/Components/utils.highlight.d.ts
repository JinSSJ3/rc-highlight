/// <reference types="react" />
export declare type CodeLine = JSX.Element;
export declare type Line = Token[];
export interface Token {
    token: string;
    category: string;
    level?: 1 | 2 | 3 | 0;
}
export declare const tokens: string[];
export declare const isClassName: (word: string) => boolean;
export declare const isHighKeyWord: (word: string) => boolean;
export declare const isKeyWord: (word: string) => boolean;
export declare const isPunctuation: (word: string) => boolean;
export declare const isArrow: (word: string) => boolean;
export declare const isOpenSymbol: (word: string) => boolean;
export declare const isCloseSymbol: (word: string) => boolean;
/**
 * Makes a Token
 * @param token the string representation of the token
 * @param category the category of the token
 * @param isFunction wheter is a function and must take this category
 * @param openString wheter is part of a large splted string and must take this category
 * @returns a token
 */
export declare const makeToken: (token: string, category: string, isFunction?: boolean, openString?: boolean) => Token;
/**
 *
 * @param word a word to be analized for punctuation and strings
 * @returns
 */
export declare const TOKENIZE: (currentWord: string) => Token[];
/**
 *
 * @param line
 * @returns
 */
export declare const tokenizeLine: (line: string) => Line;
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
export declare const superHighlighter: (code: string) => Line[];
