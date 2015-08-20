/**
 * @since 150215 14:31
 * @author vivaxy
 */
var utf16to8 = function (str) {
        var out, i, len, c;
        out = '';
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },

    $url = $('#url'),
    $qr0 = $('#qr0'),
    $qr1 = $('#qr1'),
    $schema0 = $('#schema0'),
    $schema1 = $('#schema1'),

    generateQr = function () {
        // TODO use redirect for wechat to open in other app
        var schema0 = $schema0.val(),
            schema1 = $schema1.val(),
            url = $url.val();
        $qr0.html('').qrcode({
            // encode url
            text: utf16to8(schema0 + (schema0 === '' ? url : encodeURIComponent(url)))
        });
        $qr1.html('').qrcode({
            text: utf16to8(schema1 + (schema1 === '' ? url : encodeURIComponent(url)))
        });
        try {
            chrome.storage.sync.set({'schema': [schema0, schema1]}, function () {
                // Notify that we saved.
            });
        } catch (e) {
            console.log(e);
        }
    };

$url.on('keyup', generateQr);
$schema0.on('keyup', generateQr);
$schema1.on('keyup', generateQr);

try {
    // init input data
    chrome.storage.sync.get('schema', function (storage) {
        if (storage.schema === undefined) {
            storage.schema = ['', 'dianping://web?url='];
        }
        $schema0.val(storage.schema[0]);
        $schema1.val(storage.schema[1]);

        // generate url and qr code
        chrome.tabs.getSelected(null, function (tab) {
            $url.val(tab.url);
            $url.trigger('keyup');
        });
    });
} catch (e) {
    console.log(e);
}

setTimeout(function () {
    $('body').removeClass('pull-up');
}, 0);
