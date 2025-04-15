import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";

interface TerminalViewerProps {
  fetchLogStream: () => Promise<ReadableStream<Uint8Array>>;
}

const TerminalViewer: React.FC<TerminalViewerProps> = ({ fetchLogStream }) => {
  const theme = useTheme();
  const [logs, setLogs] = useState<string>("");

  const containerRef = useRef<HTMLPreElement>(null);

  const getLineStyle = (line: string) => {
    const isLight = theme.palette.mode === "light";

    if (/fatal/i.test(line)) {
      return { color: isLight ? theme.palette.error.main : theme.palette.error.dark };
    } else if (/error/i.test(line)) {
      return { color: isLight ? theme.palette.error.dark : theme.palette.error.main };
    } else if (/warn/i.test(line)) {
      return { color: isLight ? theme.palette.warning.dark : theme.palette.warning.main };
    } else if (/info/i.test(line)) {
      return { color: isLight ? theme.palette.info.dark : theme.palette.info.main };
    } else if (/debug/i.test(line)) {
      return { color: isLight ? theme.palette.grey[700] : theme.palette.grey[500] };
    } else if (/trace/i.test(line)) {
      return { color: isLight ? theme.palette.text.secondary : theme.palette.text.disabled };
    } else {
      return { color: theme.palette.text.primary };
    }
  };

  useEffect(() => {
    let isCancelled = false;
    let reader: ReadableStreamDefaultReader<Uint8Array>;

    fetchLogStream().then(stream => {
      reader = stream.getReader();
      const readStream = async () => {
        while (!isCancelled) {
          const { value, done } = await reader.read();
          if (done || !value) break;
          const chunk = new TextDecoder().decode(value);
          setLogs(prev => prev + chunk);
        }
      };
      readStream();
    });

    return () => {
      isCancelled = true;
      if (reader) reader.cancel();
    };
  }, [fetchLogStream]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const lines = logs.split("\n");

  return (
    <pre
      ref={containerRef}
      style={{
        backgroundColor: "#1e1e1e",
        color: "#50fa7b",
        fontFamily: "monospace",
        fontSize: "14px",
        padding: "1rem",
        overflowY: "auto",
        height: "100%",
        width: "100%",
        borderRadius: "4px",
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      {lines.map((line, idx) => (
        <div key={idx} style={getLineStyle(line)}>
          {line}
        </div>
      ))}
    </pre>
  );
};

export default TerminalViewer;
