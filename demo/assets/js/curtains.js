/* ======================================================================= 
                             The Curtain Effect
   ======================================================================= */


var topPages = [{className: 'top', zIndex: 100},
		{tagName: 'header', zIndex: 100},
		{tagName: 'nav', zIndex: 100},
	       {tagName: 'footer', zIndex: 0}];


var pages = document.getElementsByClassName('page');

var heights = [0];

var pageNum = 1;



function setZindex(e) {
    var z = e.zIndex;

    if (e.id) {
	document.getElementById(e.id).style.zIndex = z;
    } else {
	if (e.tagName) {
	    var elems = document.getElementsByTagName(e.tagName);  
	    for (var i = 0; i < elems.length; i++) {
		elems[0].style.zIndex = z;
	    };
	} else {
	     if (e.className) {
		 var elems = document.getElementsByClassName(e.className); 
		 for (var i = 0; i < elems.length; i++) {
		     elems[0].style.zIndex = z;
		 };
	     };
	};
    };
};

function outerHeight(elem) {
    var style = window.getComputedStyle(elem, null);
    var h = parseInt(style.getPropertyValue("height"))
	+ parseInt(style.getPropertyValue("margin-top"))
	+ parseInt(style.getPropertyValue("margin-bottom"))
	+ parseInt(style.getPropertyValue("padding-top"))
	+ parseInt(style.getPropertyValue("padding-bottom"));
    return h;
};

function init() {

    var pageCont =  document.getElementsByClassName('pages')[0];
    var header = document.getElementsByTagName('header')[0];
    var footer = document.getElementsByTagName('footer')[0];

    for (var i = 0; i < topPages.length; i++) {
	setZindex(topPages[i]);
    };
    
    for (var i = 0; i < pages.length; i++) {
	page = pages[i];
	page.style.zIndex = 99 - i;
	page.style.position = (i === 0) ? "relative" : "fixed";
	page.style.top = '0px';
	if (i == pages.length - 1)
	    page.style.marginBottom = outerHeight(footer) + 'px';
	heights[i + 1] = heights[i] + outerHeight(page);
    };

    pageCont.style.height = heights[heights.length - 1] + 'px';
    
    pageCont.style.position = "absolute";
    pageCont.style.top = "0px";
    pageCont.style.left = "0px";

    header.style.position = 'relative';
    header.style.top = "0px";

    footer.style.position = 'fixed';
    footer.style.bottom = "0px";


};


init();


function curtain(e) {
    var winY = window.scrollY;

    if (winY > heights[pageNum] && pageNum  < heights.length) {
	pageNum += 1;
	pages[pageNum - 1].style.position = "relative";
	var id = pageNum > 1 ? window.location.pathname + '#' + pages[pageNum - 1].id : window.location.pathname;
	history.replaceState({home: id}, "page " + pageNum, id);
    } else {
	if (winY < heights[pageNum - 1]) {
	    pages[pageNum - 1].style.position = "fixed";
	    pageNum -= 1;
	    var id = pageNum > 1 ? window.location.pathname + '#' + pages[pageNum - 1].id : window.location.pathname;
	    history.replaceState({home: id}, "page " + pageNum, id);
	};
    };


};



window.addEventListener('scroll', curtain, false);


