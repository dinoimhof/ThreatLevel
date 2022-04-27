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
window.addEventListener('scroll', highlight);

// Call decode function on scroll, needs to be throttled
window.addEventListener('scroll', throttle(decode, 1000));

// Test comment to verify if file gets updated to the site
// Add another comment to verify synchronisation
