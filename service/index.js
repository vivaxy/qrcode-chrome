/**
 * @since 15-09-01 17:39
 * @author vivaxy
 */
'use strict';
var url = decodeURIComponent(location.hash.slice(1)),
    a = document.querySelector('a');
a.href = url;
a.textContent = url;
// `location.href` `window.location` same?
location.href = url;
