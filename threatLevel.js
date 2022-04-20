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
    let FilterA = document.querySelectorAll('a[bgcol]');
    let selectedA = FilterA[Math.floor(Math.random() * FilterA.length)];
    let color = selectedA.getAttribute("bgcol");

    if (selectedA.style.backgroundColor.toLowerCase() == color.toLowerCase()) {
        selectedA.style.backgroundColor = "transparent";
    } else {
        if (Math.random() > 0.5) {
            selectedA.style.backgroundColor = color;
        }
    }
}

// Decode function
function decode() {
    const randomLink = listOfLinks[Math.floor(Math.random() * listOfLinks.length)];
    const decode = new TextScramble(randomLink);
    const output = randomLink.textContent;
    decode.setText(output);
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

/***************
 Function calls
 ***************/

// List of links (could be replaced with other attributes)
const listOfLinks = document.querySelectorAll("a");

// Set interval for highlight function
setInterval(highlight, 500);

// Call decode function on scroll, needs to be throttled
window.addEventListener('scroll', throttle(decode, 1000));