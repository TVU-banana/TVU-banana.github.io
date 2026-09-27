(function () {
    "use strict";

    function codeText(code) {
        var copy = code.cloneNode(true);
        copy.querySelectorAll(".ln, .lnt").forEach(function (lineNumber) {
            lineNumber.remove();
        });
        return copy.textContent.replace(/\n$/, "");
    }

    function setCopyState(button, copied) {
        var label = copied ? button.dataset.copiedLabel : button.dataset.copyLabel;
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
        button.classList.toggle("is-copied", copied);
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        var copied = document.execCommand("copy");
        textarea.remove();
        return copied ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
    }

    document.querySelectorAll(".code-block-panel").forEach(function (panel) {
        var code = panel.querySelector("pre code");
        var wrapButton = panel.querySelector("[data-code-wrap]");
        var copyButton = panel.querySelector("[data-code-copy]");
        if (!code || !wrapButton || !copyButton) return;

        wrapButton.addEventListener("click", function () {
            var wrapped = panel.classList.toggle("is-wrap");
            var label = wrapped ? wrapButton.dataset.unwrapLabel : wrapButton.dataset.wrapLabel;
            wrapButton.setAttribute("aria-pressed", String(wrapped));
            wrapButton.setAttribute("aria-label", label);
            wrapButton.setAttribute("title", label);
        });

        copyButton.addEventListener("click", function () {
            copyText(codeText(code)).then(function () {
                setCopyState(copyButton, true);
                window.setTimeout(function () { setCopyState(copyButton, false); }, 1800);
            }).catch(function () {
                setCopyState(copyButton, false);
            });
        });

        wrapButton.dataset.wrapLabel = wrapButton.getAttribute("aria-label");
        wrapButton.dataset.unwrapLabel = panel.dataset.unwrapLabel || wrapButton.dataset.wrapLabel;
        copyButton.dataset.copyLabel = copyButton.getAttribute("aria-label");
        copyButton.dataset.copiedLabel = panel.dataset.copiedLabel || copyButton.dataset.copyLabel;
    });
})();
