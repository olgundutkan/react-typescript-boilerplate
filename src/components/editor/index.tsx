import React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/components/prism-yaml.min.js";
import "prismjs/components/prism-docker.min.js";
import { useTheme } from "@mui/material/styles";
import dedent from "ts-dedent";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

const saveCaretPosition = (el: HTMLElement) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.startContainer, range.startOffset);
    return preRange.toString().length;
};

const restoreCaretPosition = (el: HTMLElement, pos: number) => {
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    let charIndex = 0;
    const nodeStack: Node[] = [el];
    let node: Node | undefined;
    let found = false;

    while ((node = nodeStack.pop())) {
        if (node.nodeType === 3) {
            const textNode = node as Text;
            const nextCharIndex = charIndex + textNode.length;
            if (!found && pos >= charIndex && pos <= nextCharIndex) {
                range.setStart(textNode, pos - charIndex);
                range.collapse(true);
                found = true;
                break;
            }
            charIndex = nextCharIndex;
        } else {
            let i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }

    if (found) {
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

const Editor: React.FC<EditorProps> = ({ value, onChange, readOnly = false, onFocus, onBlur }) => {
    const codeRef = React.useRef<HTMLDivElement>(null);
    const dedentedValue = dedent(value);
    const highlightedValue = Prism.highlight(dedentedValue, Prism.languages.yaml, "yaml");
    const highlightedHTML = { __html: highlightedValue };
    const theme = useTheme();
    const loadedThemeRef = React.useRef<string | null>(null);

    React.useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [value]);

    React.useEffect(() => {
        const mode = theme.palette.mode;
        if (loadedThemeRef.current === mode) return;

        if (mode === "light") {
            require("./prism-material-light.css");
            loadedThemeRef.current = "light";

        } else {
            require("./prism-material-dark.css");
            loadedThemeRef.current = "dark";
        }
    }, [theme.palette.mode]);

    const handleInput = () => {
        const el = codeRef.current;
        if (!el) return;
        const caret = saveCaretPosition(el);
        const text = el.innerText || "";
        onChange(text);
        setTimeout(() => {
            if (codeRef.current) {
                restoreCaretPosition(codeRef.current, caret);
            }
        }, 0);
    };

    return (
        <pre
            className="line-numbers language-yaml"
            style={{
                margin: 0,
                width: "100%",
            }}
        >
            <code
                ref={codeRef}
                className="language-yaml"
                contentEditable={!readOnly}
                suppressContentEditableWarning
                onInput={handleInput}
                onFocus={onFocus}
                onBlur={onBlur}
                dangerouslySetInnerHTML={highlightedHTML}
                style={{ outline: "none", whiteSpace: "pre-wrap", display: "block", width: "100%" }}
            ></code>
        </pre>
    );
};

export default Editor;