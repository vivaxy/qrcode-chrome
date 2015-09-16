/**
 * @since 150215 14:31
 * @author vivaxy
 */
var defaultOptions = {
        schema: ['', 'dianping://web?url='],
        redirectOn: true,
        largerSizeOn: true,
        redirectPageUrl: 'http://vivaxy.github.io/qrcode-chrome/service/index.html'
    },
    urlInput = document.querySelector('.js-url'),
    init = function (options) {
        if (options.largerSizeOn) {
            document.body.classList.remove('small');
        }
        setTimeout(function () {
            document.body.classList.remove('pull-up');
        }, 0);
        return Array.prototype.map.call(document.querySelectorAll('.js-qr-container'), function (qrEach, index) {
            return new QrModel({
                index: index,
                container: qrEach,
                urlInput: urlInput,
                schema: options.schema[index],
                redirectOn: options.redirectOn,
                size: options.largerSizeOn ? 360 : 240,
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
            largerSizeOn: storage.largerSizeOn,
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
