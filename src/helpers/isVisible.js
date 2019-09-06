const isVisible = function ( partial, el ) {
          
    var $t            = el,
        $w            = window,
        viewTop       = $w.scrollY,
        viewBottom    = viewTop + $w.innerHeight,
        _top          = offset($t).top,
        _bottom       = _top + $t.getBoundingClientRect().height,
        compareTop    = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;
  
  return ( ( compareBottom <= viewBottom ) && ( compareTop >= viewTop ) );

};

function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export default isVisible;