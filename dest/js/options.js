/**
 * @since 15-09-01 18:12
 * @author vivaxy
 */
'use strict';
var size = function (container) {
        var name = 'size',
            largerSizeSwitch = container.querySelector('.js-on'),
            saveButton = container.querySelector('.js-save');
        try {
            chrome.storage.sync.get({
                largerSizeOn: true
            }, function (storage) {
                largerSizeSwitch.checked = storage.largerSizeOn;
            });
        } catch (e) {
            // not in chrome extension
        }
        saveButton.addEventListener('click', function () {
            try {
                chrome.storage.sync.set({
                    largerSizeOn: largerSizeSwitch.checked
                }, function () {
                    alert(name + ' saved');
                });
            } catch (e) {
                // not in chrome extension
            }
        }, false);
    },
    redirect = function (container) {
        var name = 'redirect',
            urlInput = container.querySelector('.js-url'),
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
                    alert(name + ' saved');
                });
            } catch (e) {
                // not in chrome extension
            }
        }, false);
    };

size(document.querySelector('.js-size'));
redirect(document.querySelector('.js-redirect'));
