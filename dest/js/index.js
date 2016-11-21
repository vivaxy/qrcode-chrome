/**
 * @since 150215 14:31
 * @author vivaxy
 */
var defaultOptions = {
    scheme: ['', 'dianping://web?url='],
    redirectOn: false,
    largerSizeOn: true,
    redirectPageUrl: 'http://vivaxy.github.io/qrcode-chrome/service/index.html'
};
var urlInput = document.querySelector('.js-url');
var init = function(options) {
    if (options.largerSizeOn) {
        document.body.classList.remove('small');
    }
    setTimeout(function() {
        document.body.classList.remove('pull-up');
    }, 0);
    return Array.prototype.map.call(document.querySelectorAll('.js-qr-container'), function(qrEach, index) {
        return new QrModel({
            index: index,
            container: qrEach,
            urlInput: urlInput,
            // chrome.storage.sync.get scheme result might be `null`
            scheme: options.scheme[index] || '',
            redirectOn: options.redirectOn,
            size: options.largerSizeOn ? 360 : 240,
            redirectPageUrl: options.redirectPageUrl
        });
    });
};
try {
    // init input data
    chrome.storage.sync.get(defaultOptions, function(storage) {
        init({
            scheme: storage.scheme,
            redirectOn: storage.redirectOn,
            largerSizeOn: storage.largerSizeOn,
            redirectPageUrl: storage.redirectPageUrl
        });
        // generate url and qr code
        chrome.tabs.getSelected(null, function(tab) {
            urlInput.value = tab.url;
            var event = new Event('keyup');
            urlInput.dispatchEvent(event);
        });
    });
} catch (e) {
    init(defaultOptions);
}
