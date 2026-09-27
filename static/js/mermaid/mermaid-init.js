/* Mermaid bootstrap for this blog.
 *
 * Fetched only by pages that contain a ```mermaid block (see
 * layouts/partials/extend_head.html). It draws every block with Mermaid's `base`
 * theme, feeds that theme the same greys the stylesheet uses, redraws the
 * diagrams when the reader flips the light/dark switch, and opens a larger copy
 * of a diagram on click.
 */
(function () {
    "use strict";

    var blocks = Array.prototype.slice.call(document.querySelectorAll("pre.mermaid"));
    if (blocks.length === 0 || typeof window.mermaid === "undefined") {
        return;
    }

    var FONT_FAMILY =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif';

    /* A diagram is opened at most this wide, and never enlarged by more than
       this factor, so a small diagram does not turn into a blur of 4x text. */
    var ZOOM_MAX_WIDTH = 1400;
    var ZOOM_MAX_SCALE = 2;

    /* ---- greys -----------------------------------------------------------
       `base` is the only Mermaid theme that accepts themeVariables, so every
       colour below is derived from the five greys the stylesheet uses: --theme,
       --primary, --secondary, --tertiary and --border. There is no hue
       anywhere: a diagram has to read as part of the article, not as a
       screenshot pasted into it. */

    function parseHex(hex) {
        var value = hex.slice(1);
        if (value.length === 3) {
            value = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
        }
        return [
            parseInt(value.slice(0, 2), 16),
            parseInt(value.slice(2, 4), 16),
            parseInt(value.slice(4, 6), 16)
        ];
    }

    function toHex(channels) {
        return (
            "#" +
            channels
                .map(function (channel) {
                    var part = Math.round(channel).toString(16);
                    return part.length === 1 ? "0" + part : part;
                })
                .join("")
        );
    }

    /* Evenly spaced greys. Mermaid insists on one colour per series for pies,
       journey stages, git branches and quadrant panels; keeping each of those
       inside a single narrow band means one text colour stays readable across
       the whole series and nothing falls back to Mermaid's own palette. */
    function ramp(from, to, count) {
        var start = parseHex(from);
        var end = parseHex(to);
        var colors = [];
        for (var index = 0; index < count; index += 1) {
            var ratio = count === 1 ? 0 : index / (count - 1);
            colors.push(
                toHex(
                    start.map(function (channel, channelIndex) {
                        return channel + (end[channelIndex] - channel) * ratio;
                    })
                )
            );
        }
        return colors;
    }

    function linearize(channel) {
        var value = channel / 255;
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    }

    /* The label colour that stays readable on a given swatch. */
    function readableOn(hex) {
        var channels = parseHex(hex);
        var luminance =
            0.2126 * linearize(channels[0]) +
            0.7152 * linearize(channels[1]) +
            0.0722 * linearize(channels[2]);
        return luminance > 0.35 ? "#1e1e1e" : "#ffffff";
    }

    function themeVariables(dark) {
        var ink = dark ? "#dadadb" : "#1e1e1e"; // --primary
        var muted = dark ? "#9b9c9d" : "#6c6c6c"; // --secondary
        var fill = dark ? "#2e2e33" : "#f5f5f5"; // --entry / --code-bg
        var fillAlt = dark ? "#37383e" : "#eeeeee"; // --code-bg / --border
        var edge = dark ? "#414244" : "#d6d6d6"; // --tertiary
        var page = dark ? "#1d1e20" : "#ffffff"; // --theme
        var pageAlt = dark ? "#232427" : "#fafafa";

        var variables = {
            darkMode: dark,
            background: page,
            fontFamily: FONT_FAMILY,
            fontSize: "16px",

            textColor: ink,
            titleColor: ink,
            lineColor: muted,
            defaultLinkColor: muted,

            primaryColor: fill,
            primaryTextColor: ink,
            primaryBorderColor: edge,
            secondaryColor: fillAlt,
            secondaryTextColor: ink,
            secondaryBorderColor: edge,
            tertiaryColor: fill,
            tertiaryTextColor: ink,
            tertiaryBorderColor: edge,

            mainBkg: fill,
            nodeBorder: edge,
            nodeTextColor: ink,
            clusterBkg: pageAlt,
            clusterBorder: edge,
            edgeLabelBackground: page,

            noteBkgColor: fill,
            noteTextColor: ink,
            noteBorderColor: edge,
            errorBkgColor: fillAlt,
            errorTextColor: ink,

            actorBkg: fill,
            actorBorder: edge,
            actorTextColor: ink,
            actorLineColor: edge,
            signalColor: ink,
            signalTextColor: ink,
            labelBoxBkgColor: fill,
            labelBoxBorderColor: edge,
            labelTextColor: ink,
            loopTextColor: ink,
            activationBorderColor: edge,
            activationBkgColor: fillAlt,
            sequenceNumberColor: page,

            labelColor: ink,
            altBackground: pageAlt,
            classText: ink,

            gridColor: fillAlt,
            todayLineColor: muted,
            taskBkgColor: fill,
            taskTextColor: ink,
            taskTextLightColor: ink,
            taskTextOutsideColor: ink,
            taskTextDarkColor: ink,
            taskBorderColor: edge,
            activeTaskBkgColor: fillAlt,
            activeTaskBorderColor: edge,
            doneTaskBkgColor: fillAlt,
            doneTaskBorderColor: edge,
            critBkgColor: fillAlt,
            critBorderColor: edge,
            sectionBkgColor: pageAlt,
            sectionBkgColor2: fill,

            commitLabelColor: ink,
            commitLabelBackground: fill,
            tagLabelColor: ink,
            tagLabelBackground: fillAlt,
            tagLabelBorder: edge,

            pieTitleTextColor: ink,
            pieSectionTextColor: ink,
            pieLegendTextColor: ink,
            pieStrokeColor: page,
            pieOuterStrokeColor: edge,

            quadrantPointTextFill: page,
            quadrantXAxisTextFill: muted,
            quadrantYAxisTextFill: muted,
            quadrantInternalBorderStrokeFill: edge,
            quadrantExternalBorderStrokeFill: edge,
            quadrantTitleFill: ink
        };

        (dark ? ramp("#3a3b3f", "#5f6064", 12) : ramp("#f2f2f2", "#a0a0a0", 12)).forEach(function (
            color,
            index
        ) {
            variables["pie" + (index + 1)] = color;
        });

        (dark ? ramp("#3a3b3f", "#5f6064", 8) : ramp("#f0f0f0", "#b8b8b8", 8)).forEach(function (
            color,
            index
        ) {
            variables["fillType" + index] = color;
        });

        (dark ? ramp("#33343a", "#54555a", 4) : ramp("#fafafa", "#dcdcdc", 4)).forEach(function (
            color,
            index
        ) {
            variables["quadrant" + (index + 1) + "Fill"] = color;
            variables["quadrant" + (index + 1) + "TextFill"] = ink;
        });
        variables.quadrantPointFill = dark ? "#c4c4c5" : "#3a3a3a";

        (dark ? ramp("#4a4b4f", "#8a8b8d", 4) : ramp("#3a3a3a", "#a8a8a8", 4)).forEach(function (
            color,
            index
        ) {
            variables["git" + index] = color;
            variables["gitBranchLabel" + index] = readableOn(color);
        });

        return variables;
    }

    var cachedVariables = {};

    function variablesFor(dark) {
        var key = dark ? "dark" : "light";
        if (!cachedVariables[key]) {
            cachedVariables[key] = themeVariables(dark);
        }
        return cachedVariables[key];
    }

    /* ---- render ---------------------------------------------------------- */

    function isDarkMode() {
        return document.body.classList.contains("dark");
    }

    function draw() {
        window.mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            fontFamily: FONT_FAMILY,
            themeVariables: variablesFor(isDarkMode())
        });

        blocks.forEach(function (block) {
            /* Mermaid swaps the source for an SVG, so put the text back before
               asking it to draw the diagram again in the other theme. */
            block.removeAttribute("data-processed");
            block.textContent = block.dataset.mermaidSource;
        });

        return window.mermaid.run({ nodes: blocks, suppressErrors: true });
    }

    function markDrawn() {
        Array.prototype.forEach.call(
            document.querySelectorAll(".mermaid-figure"),
            function (figure) {
                if (figure.querySelector("pre.mermaid svg")) {
                    figure.classList.add("is-drawn");
                }
            }
        );
    }

    var drawing = false;
    var drawQueued = false;

    function scheduleDraw() {
        if (drawing) {
            drawQueued = true;
            return;
        }
        drawing = true;
        draw()
            .catch(function () {
                /* A malformed diagram is Mermaid's error to report; it must
                   never break the rest of the page. */
            })
            .then(function () {
                drawing = false;
                markDrawn();
                if (drawQueued) {
                    drawQueued = false;
                    scheduleDraw();
                }
            });
    }

    blocks.forEach(function (block) {
        block.dataset.mermaidSource = block.textContent.trim();
    });

    /* The site toggles `.dark` on <body>; the observer also fires for unrelated
       class changes, so only a real light/dark flip triggers a redraw. */
    var wasDark = isDarkMode();
    if (typeof window.MutationObserver === "function") {
        new window.MutationObserver(function () {
            var nowDark = isDarkMode();
            if (nowDark === wasDark) {
                return;
            }
            wasDark = nowDark;
            /* A copy already on screen would keep the palette of the mode the
               reader just left, so drop it rather than showing two themes. */
            closeZoom();
            scheduleDraw();
        }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }

    /* ---- click to zoom ---------------------------------------------------- */

    var overlay = null;
    var restoreFocus = null;

    function naturalSize(svg) {
        var box = svg.viewBox && svg.viewBox.baseVal;
        if (box && box.width > 0 && box.height > 0) {
            return { width: box.width, height: box.height };
        }
        var rect = svg.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    }

    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    /* Mermaid's SVG carries ids for its markers, clip paths and labels, and
       Mermaid scopes the diagram's own stylesheet to the root id. A copy must
       therefore not share any of them: duplicate ids would make `url(#...)`
       references and assistive-technology lookups ambiguous. Every id in the
       copy is suffixed and every reference to it is rewritten to match. */
    function isolateIds(root) {
        var suffix = "-zoomed";
        var owners = [root].concat(Array.prototype.slice.call(root.querySelectorAll("[id]")));
        var lookup = {};
        var ids = [];

        owners.forEach(function (node) {
            var id = node.getAttribute("id");
            if (!id) {
                return;
            }
            ids.push(id);
            lookup[id] = id + suffix;
            node.setAttribute("id", id + suffix);
        });

        if (ids.length === 0) {
            return;
        }

        /* Match the longest id first and require a boundary after it, so `#foo`
           can never rewrite the prefix of a `#foobar` already renamed. */
        ids.sort(function (first, second) {
            return second.length - first.length;
        });
        var pattern = new RegExp("#(" + ids.map(escapeRegExp).join("|") + ")(?![\\w-])", "g");

        function rewrite(value, attributeName) {
            if (attributeName === "aria-labelledby" || attributeName === "aria-describedby") {
                return value
                    .split(/\s+/)
                    .map(function (id) {
                        return lookup[id] || id;
                    })
                    .join(" ");
            }
            return value.replace(pattern, function (match, id) {
                return "#" + lookup[id];
            });
        }

        function rewriteAttributes(node) {
            Array.prototype.forEach.call(node.attributes, function (attribute) {
                if (attribute.name === "id") {
                    return;
                }
                var value = rewrite(attribute.value, attribute.name);
                if (value !== attribute.value) {
                    node.setAttribute(attribute.name, value);
                }
            });
        }

        [root].concat(Array.prototype.slice.call(root.querySelectorAll("*"))).forEach(rewriteAttributes);
        Array.prototype.forEach.call(root.querySelectorAll("style"), function (node) {
            node.textContent = rewrite(node.textContent, "style");
        });
    }

    function copyForOverlay(svg) {
        var copy = svg.cloneNode(true);
        isolateIds(copy);
        return copy;
    }

    function onOverlayKeydown(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            closeZoom();
            return;
        }
        if (event.key !== "Tab") {
            return;
        }
        /* The dialog holds a single control, so keep focus on it. */
        event.preventDefault();
        var button = document.querySelector(".mermaid-zoom-close");
        if (button) {
            button.focus();
        }
    }

    function openZoom(figure) {
        var svg = figure.querySelector("pre.mermaid svg");
        if (!svg || overlay) {
            return;
        }

        var copy = copyForOverlay(svg);
        var size = naturalSize(svg);
        if (size.width > 0 && size.height > 0) {
            var maxWidth = Math.min(window.innerWidth * 0.9, ZOOM_MAX_WIDTH);
            var width = Math.min(maxWidth, size.width * ZOOM_MAX_SCALE);
            copy.style.width = Math.round(width) + "px";
            copy.style.height = Math.round((width * size.height) / size.width) + "px";
            copy.style.maxWidth = "none";
        }

        restoreFocus = document.activeElement;

        overlay = document.createElement("div");
        overlay.className = "mermaid-zoom";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");

        var stage = document.createElement("div");
        stage.className = "mermaid-zoom-stage";
        stage.appendChild(copy);

        var close = document.createElement("button");
        close.type = "button";
        close.className = "mermaid-zoom-close";
        close.setAttribute("aria-label", figure.dataset.closeLabel || "Close");
        close.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

        overlay.appendChild(stage);
        overlay.appendChild(close);
        document.body.appendChild(overlay);
        document.body.classList.add("mermaid-zoom-open");
        close.focus();

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay || close.contains(event.target)) {
                closeZoom();
            }
        });
        document.addEventListener("keydown", onOverlayKeydown);
    }

    function closeZoom() {
        if (!overlay) {
            return;
        }
        document.removeEventListener("keydown", onOverlayKeydown);
        document.body.classList.remove("mermaid-zoom-open");
        overlay.remove();
        overlay = null;

        if (restoreFocus && document.contains(restoreFocus) && typeof restoreFocus.focus === "function") {
            restoreFocus.focus();
        }
        restoreFocus = null;
    }

    Array.prototype.forEach.call(document.querySelectorAll(".mermaid-figure"), function (figure) {
        figure.addEventListener("click", function () {
            openZoom(figure);
        });
        figure.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") {
                return;
            }
            event.preventDefault();
            openZoom(figure);
        });
    });

    scheduleDraw();
})();
