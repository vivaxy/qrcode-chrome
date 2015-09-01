/**
 * @since 15-09-01 18:12
 * @author vivaxy
 */
'use strict';
var input = document.querySelector('input'),
    button = document.querySelector('button');

try {
    chrome.storage.sync.get({
        redirectPageUrl: 'http://vivaxy.github.io/qrcode-chrome/service/index.html'
    }, function (storage) {
        input.value = storage.redirectPageUrl;
    });
} catch (e) {
    // not in chrome extension
}

button.addEventListener('click', function () {
    try {
        chrome.storage.sync.set({
            redirectPageUrl: input.value
        }, function () {
            alert('redirect page url saved');
        });
    } catch (e) {
        // not in chrome extension
    }
}, false);