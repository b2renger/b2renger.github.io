// Global variables holding the page's patch and sketch.
var patch, sketch, docH, docW, level;

// This function downloads the sketch and the patch for `level`, and executes
// `callback()` when the download is complete.
var downloadSketchAndPatch = function(level, callback) {
    var callback = callback || function() {};
    $.get('pd/'+level+'.pd', function(patchFile) {
        patch = Pd.compat.parse(patchFile);
        console.log('WebPd patch ready');
        if (sketch) callback();
    });
    $.get('pde/'+level+'.pde', function(sketchFile) {
        sketch = new Processing('canvas', sketchFile);
        console.log('Processing.js sketch ready');
        if (patch) callback();
    });
}

// This returns query param `name`, for example with url 'www.mysite.com?arg1=bla&arg2=blo'
// `getQueryParam(arg1)` returns 'bla'.
function getQueryParam(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


// Executed when the DOM is ready
$(function() {
    docH = $(window).height();
    docW = $(window).width();
    level = getQueryParam('level');
});
