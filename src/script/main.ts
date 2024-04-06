import Split from 'split-grid'

// src="data:text/html;base64,PHA+aG9sYSBtdW5kbzwvcD4="

Split({
	columnGutters: [{
    track: 1,
    element: document.querySelector('.vertical-gutter') as HTMLElement,
  }],
  rowGutters: [{
  	track: 1,
    element: document.querySelector('.horizontal-gutter') as HTMLElement,
  }]
})


const getByID = (id: string) => document.getElementById(id);
const html: HTMLTextAreaElement = getByID("html") as HTMLTextAreaElement;
const css: HTMLTextAreaElement = getByID("css") as HTMLTextAreaElement;
const js: HTMLTextAreaElement = getByID("js") as HTMLTextAreaElement;
const iframe: HTMLIFrameElement = getByID("iframe") as HTMLIFrameElement;

const onEvent = (event: Event) => {
  const element = event.target as HTMLTextAreaElement;
  console.log(element.value);
};

const update = () => {
  const getCode = createHtml();
  iframe.setAttribute("srcdoc", getCode);
};

html?.addEventListener("input", update);
css?.addEventListener("input", update);
js?.addEventListener("input", update);

function createHtml() {
  const htmlScript = html.value;
  const cssCode = css.value;
  const jsCode = js.value;
  console.log(htmlScript);
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
