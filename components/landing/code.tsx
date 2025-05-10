"use client";

import { cn } from "@/lib/utils";
import { Highlight, themes } from "prism-react-renderer";

const Code = ({ code }: { code: string }) => {
  return (
    <Highlight theme={themes.vsDark} code={code} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={cn(className, "w-fit")}>
          {tokens.map((line, i) => (
            <div
              key={i}
              style={{ position: "relative" }}
              {...getLineProps({ line })}
            >
              <span className="text-neutral-500 select-none pr-8">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;