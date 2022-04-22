/*
 ______ __ __ ___   ____ ___  ______  __    ____ _   __ ____ __
/_  __// // // _ \ / __// _ |/_  __/ / /   / __/| | / // __// /
 / /  / _  // , _// _/ / __ | / /   / /__ / _/  | |/ // _/ / /__
/_/  /_//_//_/|_|/___//_/ |_|/_/   /____//___/  |___//___//____/
 */

/***************
 Functions
 ***************/

// Highlight function
function highlight() {
    let highlightElement = highlightedElements[Math.floor(Math.random() * highlightedElements.length)];
    let highlightColor = highlightElement.getAttribute("bgcol");
    if (isInViewport(highlightElement)) {
        if (highlightElement.style.backgroundColor.toLowerCase() == highlightColor.toLowerCase()) {
            highlightElement.style.backgroundColor = "transparent";
        } else {
            if (Math.random() > 0.6) {
                highlightElement.style.backgroundColor = highlightColor;
            }
        }
    }
}

// Decode function
function decode() {
    let decodeElement = listOfElements[Math.floor(Math.random() * listOfElements.length)];
    let decodeText = decodeElement.textContent;
    if (isInViewport(decodeElement)) {
        let textScramble = new TextScramble(decodeElement);
        textScramble.setText(decodeText);
    } else {
        decode();
    }
}

// Throttle function
function throttle(func, wait) {
    let time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            func();
            time = Date.now();
        }
    }
}

// Function to verify if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}

// Text scramble effect - more or less copy paste :)
class TextScramble {
    constructor(element) {
        this.el = element
        this.chars = '▉                  '
        this.update = this.update.bind(this)
    }

    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({from, to, start, end})
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
    }

    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {from, to, start, end, char} = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span>${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}