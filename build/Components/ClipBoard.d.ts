/// <reference types="react" />
declare const Clipboard: ({ code, onCopyToClipboard, }: {
    code?: string;
    onCopyToClipboard?: (_code: string) => void;
}) => JSX.Element;
export default Clipboard;
