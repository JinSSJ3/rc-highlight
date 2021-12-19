<h1 align="center">✨🖍️  React Highlight ✨🖍️</h1>
React component for highlighting js and jsx code with copy to clipboard functionallity.


[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dropzone-ui/react/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/rc-highlight.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)](https://www.npmjs.com/package/rc-highlight)
[![install size](https://packagephobia.com/badge?p=@unlimited-react-components/react-highlight)](https://packagephobia.com/result?p=@unlimited-react-components/react-highlight) <!-- [![Coverage Status](https://coveralls.io/repos/github/jinssj3/rc-highlight/badge.svg?branch=master)](https://coveralls.io/github/unlimited-react-components/react-highlight?branch=master) --> [![Build Status](https://travis-ci.org/jinssj3/rc-highlight.svg?branch=master)](https://travis-ci.org/jinssj3/rc-highlight)
[![Known Vulnerabilities](https://snyk.io/test/github/jinssj3/rc-highlight/badge.svg)](https://snyk.io/test/github/jinssj3/rc-highlight)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/JinSSJ3/rc-highlight.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JinSSJ3/rc-highlight/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/JinSSJ3/rc-highlight.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JinSSJ3/rc-highlight/alerts/)
## Sample result: 

<p align="center">
<img align="center" width="100%" src="https://user-images.githubusercontent.com/43678736/143381929-dc2654db-9186-45a4-be9f-55c6f0ba684e.png" alt="Sample result image">
</p>

## Installation

react-highlight is available as an [npm package](https://www.npmjs.com/package/@unlimited-react-components/react-highlight).

```sh
// with npm
npm i rc-highlight

// or yran
yarn add rc-highlight
```

## Usage

Here is a quick example to get you started, **it's all you need**:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/admiring-mendeleev-xgmzs?file=/package.json)

```jsx
import "./styles.css";
import { Highligther } from "rc-highlight";

const App = (props) => {
  return <Highlighter>{makeCode}</Highlighter>;
};
export default App;
const makeCode = `
    // this is a sample code
    const themes = {
      light: { ... },
      dark:  { ... }
    };
    const ThemeContext = React.createContext(themes.light);
    function App() {
      return (
        <ThemeContext.Provider value={themes.dark}>
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
    function Toolbar(props) { ... }
    
    const ThemedButton =() => { ... }
`;
```

## Props

| Name                | Description                                                                                                                   | Default   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- |
| `code`              | The JSX code to be highlighted.                                                                                               | ""        |
| `style`             | The in-line CSS object. Only affects the container                                                                            | { }       |
| `children`          | The JSX code to be highlighted in string format.                                                                              | ""        |
| `onCopyToClipboard` | A Funtion that is triggered when copy to clipboard button is clicked. Returns the copied code as a string as first parameter. | undefined |

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
