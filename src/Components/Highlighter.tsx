import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Clipboard from "./ClipBoard";

import "./Highlighter.scss";
import { HighLighterProps } from "./HighLighterProps";
import {
  Line,
  Token,
  superHighlighter,
  isOpenSymbol,
  isCloseSymbol,
} from "./utils.highlight";

const HighLighter = (props: HighLighterProps) => {
  const { code, style, children ,onCopyToClipboard} = props;
  //const [bracketLevel, setBracketLevel] = useState(0);
  // const [commentBlock, setCommentBlock] = useState(false);
  const [codeHighlighted, setCodeHighlighted] = useState(<></>);
  useEffect(() => {
    if (children && children.length > 0) {
      tokenize(children);
    } else {
      tokenize(code || "");
    }
  }, [code, children]);
  const tokenize = (code: string): void | React.ReactNode => {
    let listOfLines: Line[] = superHighlighter(code);

    let listOfCode: React.ReactNode[] = [];
    for (let i = 0; i < listOfLines.length; i++) {
      let tokenList: Token[] = listOfLines[i];
      let lineSpan: React.ReactNode = tokenizeSpan(tokenList, i);
      listOfCode.push(lineSpan);
    }

    setCodeHighlighted(
      <code key={7}> {listOfCode.map((codeLine) => codeLine)}</code>
    );

    //return <code> {listOfCode.map((codeLine) => codeLine)}</code>;
  };
  //const setLevelOfSymbol = (token: Token) => {};
  /* findBlockComment = (tokenList: Token[], j: number) => {
    let token: Token = tokenList[j];
    if (
      token.token === "/" &&
      tokenList[j + 1]?.token === "" &&
      tokenList[j + 2]?.token === "*"
    ) {
      // setCommentBlock(true);
    }
  };*/
  /*const findFinalBlockComment = (tokenList: Token[], j: number) => {
    let token: Token = tokenList[j];
    if (
      token.token === "/" &&
      tokenList[j - 1]?.token === "" &&
      tokenList[j - 2]?.token === "*"
    ) {
      //setCommentBlock(false);
    }
  };*/
  let commentBlock: boolean = false;
  let levelBracket: number = 1;
  let openBrackets: number = 0;
  function reduceOpenBrackets() {
    if (openBrackets !== 0) {
      openBrackets -= 1;
    }
  }
  function incBrack() {
    if (levelBracket !== 3) {
      levelBracket += 1;
    } else {
      levelBracket = 1;
    }
  }
  function decBrack() {
    levelBracket -= 1;
    if (levelBracket === 0) {
      levelBracket = 3;
    }
  }
  function levelbefore(__levelBracket: number) {
    let _levelBracket = __levelBracket - 1;
    if (_levelBracket === 0) {
      _levelBracket = 3;
    }
    return _levelBracket;
  }
  const tokenizeSpan = (tokenList: Token[], key: number): React.ReactNode => {
    let result: React.ReactNode;
    //for each line I create a div
    //for each token create a span
    let listOfSpans: React.ReactNode[] = [];
    //let block: boolean = commentBlock;
    //console.log("found found ", block);
    for (let j = 0; j < tokenList.length; j++) {
      let spanClassName = "token";
      let token: Token = tokenList[j];
      /*  if(!commentBlock){
        findBlockComment(tokenList,j);
      } */
      if (
        !commentBlock &&
        token.token === "/" &&
        //tokenList[j + 1]?.token === "" &&
        tokenList[j + 2]?.token === "*"
      ) {
        commentBlock = true;
      }

      ////
      if (isCloseSymbol(token.token)) {
        reduceOpenBrackets();
        spanClassName = `token symbol-${levelbefore(levelBracket)}`;
        decBrack();
        //  console.log( "Log:" + token.token,  "level: " + levelBracket,  "openBrac: " + openBrackets,   spanClassName );
      } else if (isOpenSymbol(token.token)) {
        openBrackets++;
        spanClassName = `token symbol-${levelBracket}`;
        incBrack();
        // console.log( "Log:" + token.token,  "level: " + levelBracket,  "openBrac: " + openBrackets,   spanClassName );
      } else if (token.category !== "") {
        spanClassName += ` ${token.category}`;
      }
      if (token.token.length > 0) {
        listOfSpans.push(
          <span
            key={j}
            className={commentBlock ? "token comment" : spanClassName}
          >
            {token.token}
          </span>
        );
      }

      if (
        commentBlock &&
        token.token === "/" &&
        tokenList[j - 1]?.token === "" &&
        tokenList[j - 2]?.token === "*"
      ) {
        commentBlock = false;
      }
    }

    result = <div key={key}>{listOfSpans.map((spanToken) => spanToken)}</div>;
    return result;
  };
  //const codeHighlighted = tokenize(code || "");
  const handleCopyToClipboard=(_code:string)=>{
    onCopyToClipboard?.(_code);
  }
  return (
    <Fragment>
      {(children || code) &&
        (code?.length > 0 || (children as string).length > 0) && (
          <div
            data-testid="highlighter-container"
            style={style}
            className="highlighter-container"
          >
            <Clipboard code={children || code || ""} onCopyToClipboard={handleCopyToClipboard}/>

            <>{codeHighlighted}</>
          </div>
        )}
    </Fragment>
  );
};

export default HighLighter;
