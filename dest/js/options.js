/**
 * @since 15-09-01 18:12
 * @author vivaxy
 */
'use strict';
var redirect = function (container) {
    var urlInput = container.querySelector('.js-url'),
        redirectSwitch = container.querySelector('.js-on'),
        saveButton = container.querySelector('.js-save');

    try {
        chrome.storage.sync.get({
            redirectPageUrl: 'http://vivaxy.github.io/qrcode-chrome/service/index.html',
            redirectOn: true
        }, function (storage) {
            urlInput.value = storage.redirectPageUrl;
            redirectSwitch.checked = storage.redirectOn;
        });
    } catch (e) {
        // not in chrome extension
    }

    saveButton.addEventListener('click', function () {
        try {
            chrome.storage.sync.set({
                redirectPageUrl: urlInput.value,
                redirectOn: redirectSwitch.checked
            }, function () {
                alert('redirect page url saved');
            });
        } catch (e) {
            // not in chrome extension
        }
    }, false);
};

redirect(document.querySelector('.js-redirect'));
