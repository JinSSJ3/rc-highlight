import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import {
  isArrow,
  isClassName,
  isCloseSymbol,
  isHighKeyWord,
  isKeyWord,
  isOpenSymbol,
  isPunctuation,
  makeToken,
  Token,
  TOKENIZE,
} from "../Components/utils.highlight";
import HighLighter from "../Components/Highlighter";
//import {HighLight} from "src/"
const code_test1 = `
//creating themes
  const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
  };
    /*    this is a 
  comment */
  .
  .
  .
  function ThemedButton() {
    const theme = useContext(ThemeContext);  
    return (    
        <button style={{ 
            background: theme.background, 
            color: theme.foreground 
          }}>      
            I am styled by theme context!    
        </button>
    );
  }
`;

it('displays a "ThemedButton" message', () => {
  render(<HighLighter code={code_test1} />);
  expect(screen.getByText("ThemedButton")).toBeInTheDocument();
  expect(screen.getByText("comment")).toBeInTheDocument();
  expect(screen.getByText("function")).toBeInTheDocument();
  expect(screen.getAllByText("themes").length).toEqual(2);
  expect(screen.getAllByText("background").length).toEqual(3);
  //expect(screen.getByText("background")).toBeInTheDocument();
  expect(screen.getByText("creating")).toBeInTheDocument();
});
describe("Validate css background", () => {
  it("background-color must be equal to #0d1117; by default", () => {
    const { getByTestId } = render(<HighLighter code={code_test1} />);
    const HLcontainer = getByTestId("highlighter-container");

    expect(HLcontainer).toHaveStyle(`background-color : 0d1117`);
  });

  it("background-color must be equal to white in style object prop", () => {
    const { getByTestId } = render(
      <HighLighter code={code_test1} style={{ backgroundColor: "white" }} />,
    );
    const HLcontainer = getByTestId("highlighter-container");

    expect(HLcontainer).toHaveStyle(`background-color : white`);
  });
});

describe("Validate identification functions for tokens", () => {
  it("Validate isClassName function", () => {
    const token: string = "ThemedButton";

    expect(isClassName(token)).toEqual(true);
  });

  it("Validate isHighKeyWord function", () => {
    const token: string = "import";
    const token2: string = "function";

    expect(isHighKeyWord(token)).toEqual(true);
    expect(isHighKeyWord(token2)).toEqual(false);
  });

  it("Validate isKeyWord function", () => {
    const token: string = "function";
    const token2: string = "import";

    expect(isKeyWord(token)).toEqual(true);
    expect(isKeyWord(token2)).toEqual(false);
  });

  it("Validate isPunctuation function", () => {
    const token: string = ".";
    const token2: string = "= >";

    expect(isPunctuation(token)).toEqual(true);
    expect(isPunctuation(token2)).toEqual(false);
  });

  it("Validate isArrow function", () => {
    const token: string = "=>";
    const token2: string = "= >";

    expect(isArrow(token)).toEqual(true);
    expect(isArrow(token2)).toEqual(false);
  });
  it("Validate isOpenSymbol function", () => {
    const token: string = "[";
    const token2: string = "}";

    expect(isOpenSymbol(token)).toEqual(true);
    expect(isOpenSymbol(token2)).toEqual(false);
  });
  it("Validate isCloseSymbol function", () => {
    const token: string = "}";
    const token2: string = "[";

    expect(isCloseSymbol(token)).toEqual(true);
    expect(isCloseSymbol(token2)).toEqual(false);
  });
});

describe("Validate makeToken function", () => {
  it("Validate whith default values ", () => {
    const token: Token = makeToken("function", "keyword");
    const compareToken: Token = {
      token: "function",
      category: "keyword",
    };
    expect(token).toEqual(compareToken);
  });
  it("Validate when isFunction is true ", () => {
    const token: Token = makeToken("function", "keyword", true);
    const compareToken: Token = {
      token: "function",
      category: "function",
    };
    expect(token).toEqual(compareToken);
  });
  it("Validate when openString is true ", () => {
    const token: Token = makeToken("function", "keyword", false, true);
    const compareToken: Token = {
      token: "function",
      category: "string",
    };
    expect(token).toEqual(compareToken);
  });
});

describe("Validate TOKENIZE function for make token[]", () => {
  it("Produces an exact array of tokens", () => {
    const currentWord: string = "\"This is a string\"";
    const expectedResult: Token[] = [
      { token: "\"This is a string\"", category: "string" },
    ];
    expect(TOKENIZE(currentWord)).toEqual(expectedResult);

  });
});
