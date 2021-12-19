import React, { Fragment, useState } from "react";

import Done from "../Icons/Done";
import Copy from "../Icons/Copy";

const Clipboard = ({
  code = "no code",
  onCopyToClipboard = (_code: string) => {},
}) => {
  //const { code = "no code" } = props;
  const [copied, setCopied] = useState(false);
  const changeIcon = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2800);
  };
  function fallbackCopyTextToClipboard(text: string) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      if (successful) {
        changeIcon();
        onCopyToClipboard?.(code);
      }
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }
  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        changeIcon();
        onCopyToClipboard?.(code);

        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      },
    );
  }

  return (
    <Fragment>
      <div
        onClick={() => copyTextToClipboard(code)}
        className={
          copied ? "floating-copy-button copied" : "floating-copy-button"
        }
      >
        {copied ? <Done color="greenyellow" /> : <Copy color="white" />}
      </div>
    </Fragment>
  );
};
export default Clipboard;
