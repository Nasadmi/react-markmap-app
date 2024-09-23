import { useMarkmaps } from "../hooks/markmap-hook";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";

export const Markmap = ({ defaultVal }: { defaultVal: string | undefined }) => {
  const { handleChange, refSvg, refToolbar, renderToolBar, markmap, value } =
    useMarkmaps({ initVal: defaultVal });

  const initVal = `
# Markmap
## Hello World
## Other data
## **Bold data**
## _Italic data_
## ~~Delete data~~
## ==Highlight data==
## [x] Checkbox
## [Website](https://markmap.js.org/)
## Data [Website](https://markmap.js.org/)
`;

  if (markmap.current && refToolbar.current) {
    renderToolBar({
      mm: markmap.current,
      wrapper: refToolbar.current,
      data: value,
    });
  }

  return (
    <div className="markmap">
      <CodeMirror
        value={defaultVal ? defaultVal : initVal}
        height="100%"
        width="831px"
        extensions={[markdown()]}
        onChange={handleChange}
        theme={"dark"}
        maxHeight="100dvh"
      />
      <svg className="markmap-svg" ref={refSvg} />
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </div>
  );
};
