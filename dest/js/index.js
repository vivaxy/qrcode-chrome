/**
 * @since 150215 14:31
 * @author vivaxy
 */

var defaultSchemaList = ['', 'dianping://web?url='],
    urlInput = document.querySelector('#url'),
    init = function (schemaList) {
        return Array.prototype.map.call(document.querySelectorAll('.qr-each'), function (qrEach, index) {
            return new QrModel({
                container: qrEach,
                urlInput: urlInput,
                schema: schemaList[index]
            });
        });
    };

try {
    // init input data
    chrome.storage.sync.get('schema', function (storage) {
        if (storage.schema === undefined) {
            storage.schema = defaultSchemaList;
        }
        init(storage.schema);
        // generate url and qr code
        chrome.tabs.getSelected(null, function (tab) {
            urlInput.value = tab.url;
            var event = new Event('keyup');
            urlInput.dispatchEvent(event);
        });
    });
} catch (e) {
    init(defaultSchemaList);
}

setTimeout(function () {
    document.body.classList.remove('pull-up');
}, 0);
