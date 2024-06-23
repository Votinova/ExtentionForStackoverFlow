
const preEls = document.querySelectorAll('pre');
[...preEls].forEach(el => {

    const root = document.createElement('div');
    const button = document.createElement('button');
    const shadowRoot = root.attachShadow({mode: 'open'});

    const cssUrl = chrome.runtime.getURL('content-script.css')
    shadowRoot.innerHTML = `<link rel="stylesheet" href=${cssUrl}></link>`
    root.style.position = 'relative';
    button.innerText = 'Copy';
    button.type = "button";

    shadowRoot.prepend(button);
    el.prepend(root);

    const codeEl = el.querySelector('code');
    button.addEventListener('click', () => {
        navigator.clipboard.writeText(codeEl.innerText)
        .then(() => {
            notify()
        })
    })
})

chrome.runtime.onMessage.addListener((req, info, cb) => {
    if (req.action === 'copy-all') {
        const allCode = getAllCode()
        navigator.clipboard.writeText(allCode)
        .then(() => {
            notify();
            cb(allCode);
        })
        return true
    }
})
function getAllCode () {
    
    return [...preEls].map(el => {
        return el.querySelector('code').innerText
    }).join('');
}
function notify() {
 const scriptEl = document.createElement("script");
 scriptEl.src = chrome.runtime.getURL("execute.js")
 document.body.appendChild(scriptEl)

 scriptEl.onload = () => {
    scriptEl.remove()
 }
}

