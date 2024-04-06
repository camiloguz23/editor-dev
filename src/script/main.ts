import Split from "split-grid";
import * as monaco from "monaco-editor";
import htmlVSC from "monaco-editor/esm/vs/language/html/html.worker?worker";
import cssVSC from "monaco-editor/esm/vs/language/css/css.worker?worker";
import jsVSC from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// src="data:text/html;base64,PHA+aG9sYSBtdW5kbzwvcD4="

window.MonacoEnvironment = {
  getWorker(_, label):any {
    if (label === "html") {
      return new htmlVSC();
    }
    if (label === "css") {
      return new cssVSC();
    }
    if (label === "javascript") {
      return new jsVSC();
    }
  },
};

Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector(".vertical-gutter") as HTMLElement,
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: document.querySelector(".horizontal-gutter") as HTMLElement,
    },
  ],
});

const getByID = (id: string) => document.getElementById(id);

const html: HTMLElement = getByID("html") as HTMLElement;
const css: HTMLElement = getByID("css") as HTMLElement;
const js: HTMLElement = getByID("js") as HTMLElement;
const iframe: HTMLIFrameElement = getByID("iframe") as HTMLIFrameElement;

const settingStyle = {
  automaticLayout: true,
  theme: "vs-dark",
  fontSize: 18,
};

const htmlEditor = monaco.editor.create(html, {
  value: "",
  language: "html",
  ...settingStyle,
});
const cssEditor = monaco.editor.create(css, {
  value: "",
  language: "css",
  ...settingStyle,
});
const jsEditor = monaco.editor.create(js, {
  value: "",
  language: "javascript",
  ...settingStyle,
});

const update = () => {
  const getCode = createHtml();
  iframe.setAttribute("srcdoc", getCode);
};

html?.addEventListener("keydown", update);
css?.addEventListener("keydown", update);
js?.addEventListener("keydown", update);

function createHtml() {
  const htmlScript = htmlEditor.getValue();
  const cssCode = cssEditor.getValue();
  const jsCode = jsEditor.getValue();
  return `
   <!doctype html>
     <html lang="es">
     <head>
       <style>
         ${cssCode}
       </style>
     </head>
     <body>
       ${htmlScript}
       <script>${jsCode}</script>
     </body>
   </html>
   `;
}
