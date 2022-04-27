/*
 ______ __ __ ___   ____ ___  ______  __    ____ _   __ ____ __
/_  __// // // _ \ / __// _ |/_  __/ / /   / __/| | / // __// /
 / /  / _  // , _// _/ / __ | / /   / /__ / _/  | |/ // _/ / /__
/_/  /_//_//_/|_|/___//_/ |_|/_/   /____//___/  |___//___//____/
 */

/***************
 Function calls
 ***************/

// List of links (could be replaced with other attributes)
listOfElements = document.querySelectorAll("a");

// List of all highlighted elements
highlightedElements = document.querySelectorAll("a[bgcol]");

// Call highlight function on scroll, no need to be throttled
window.addEventListener('scroll', throttle(highlight, 500));

// Call decode function on scroll, needs to be throttled
window.addEventListener('scroll', throttle(decode, 1000));

/********************************
 Hide "upcoming" on landing page
 ********************************/
if (window.location.pathname == "/") {
        document.getElementById("upcoming").style.opacity = 0;
    } else {
        document.getElementById("upcoming").style.opacity = 1;
    }
