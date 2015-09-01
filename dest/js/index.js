/**
 * @since 150215 14:31
 * @author vivaxy
 */

var defaultSchemaList = ['', 'dianping://web?url='],
    defaultRedirectPageUrl = 'http://vivaxy.github.io/qrcode-chrome/service/index.html',
    urlInput = document.querySelector('#url'),
    init = function (schemaList, redirectPageUrl) {
        return Array.prototype.map.call(document.querySelectorAll('.qr-each'), function (qrEach, index) {
            return new QrModel({
                index: index,
                container: qrEach,
                urlInput: urlInput,
                schema: schemaList[index],
                redirectPageUrl: redirectPageUrl
            });
        });
    };
try {
    // init input data
    chrome.storage.sync.get({
        schema: defaultSchemaList,
        redirectPageUrl: defaultRedirectPageUrl
    }, function (storage) {
        init(storage.schema, storage.redirectPageUrl);
        // generate url and qr code
        chrome.tabs.getSelected(null, function (tab) {
            urlInput.value = tab.url;
            var event = new Event('keyup');
            urlInput.dispatchEvent(event);
        });
    });
} catch (e) {
    init(defaultSchemaList, defaultRedirectPageUrl);
}

setTimeout(function () {
    document.body.classList.remove('pull-up');
}, 0);
