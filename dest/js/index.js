/**
 * @since 150215 14:31
 * @author vivaxy
 */

var defaultOptions = {
        schema: ['', 'dianping://web?url='],
        redirectOn: true,
        redirectPageUrl: 'http://vivaxy.github.io/qrcode-chrome/service/index.html'
    },
    urlInput = document.querySelector('.js-url'),
    init = function (options) {
        return Array.prototype.map.call(document.querySelectorAll('.js-qr-container'), function (qrEach, index) {
            return new QrModel({
                index: index,
                container: qrEach,
                urlInput: urlInput,
                schema: options.schema[index],
                redirectOn: options.redirectOn,
                redirectPageUrl: options.redirectPageUrl
            });
        });
    };
try {
    // init input data
    chrome.storage.sync.get(defaultOptions, function (storage) {
        init({
            schema: storage.schema,
            redirectOn: storage.redirectOn,
            redirectPageUrl: storage.redirectPageUrl
        });
        // generate url and qr code
        chrome.tabs.getSelected(null, function (tab) {
            urlInput.value = tab.url;
            var event = new Event('keyup');
            urlInput.dispatchEvent(event);
        });
    });
} catch (e) {
    init(defaultOptions);
}

setTimeout(function () {
    document.body.classList.remove('pull-up');
}, 0);
