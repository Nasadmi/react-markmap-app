import { Markmap } from "markmap-view";
import { transformer } from "../markmap";
import "markmap-toolbar/dist/style.css";
import { Toolbar } from "markmap-toolbar";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "just-debounce-it";
import { ViewUpdate } from "@uiw/react-codemirror";
import { save } from "../services/save";

const renderToolBar = ({
  mm,
  wrapper,
  data,
}: {
  mm: Markmap;
  wrapper: HTMLElement;
  data: string;
}) => {
  while (wrapper.firstChild) wrapper.firstChild.remove();
  if (mm && wrapper) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    toolbar.register({
      id: "save",
      title: "Save",
      content: `Save`,
      onClick: () => {
        save(data);
      },
    });
    toolbar.setItems([...Toolbar.defaultItems, "save"]);
    wrapper.append(toolbar.render());
  }
};

const defaultValues = `
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

export function useMarkmaps({ initVal }: { initVal: string | undefined }) {
  const [value, setValue] = useState(initVal || defaultValues);
  const refSvg = useRef<SVGSVGElement | null>(null);
  const refMm = useRef<Markmap | null>(null);
  const refToolbar = useRef<HTMLDivElement | null>(null);
  const markmap = useRef<Markmap | null>(null);

  useEffect(() => {
    if (refMm.current) return;
    const mm = Markmap.create(refSvg.current as SVGSVGElement);
    refMm.current = mm;
    markmap.current = mm;
  }, [refSvg.current]);

  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, value]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (val: string, viewUpdate: ViewUpdate) => {
    changeDebounced(val);
  };

  const changeDebounced = useCallback(
    debounce((val: string) => {
      setValue(val);
    }, 200),
    [handleChange]
  );

  return {
    handleChange,
    refToolbar,
    refSvg,
    refMm,
    renderToolBar,
    markmap,
    value,
  };
}
