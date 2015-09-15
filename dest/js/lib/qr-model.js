/**
 * @since 15-08-22 11:55
 * @author vivaxy
 */
'use strict';
var QrModel = function (options) {
    var _this = this;
    this.index = options.index;
    this.container = options.container;
    this.urlInput = options.urlInput;
    this.schema = options.schema;
    this.redirectOn = options.redirectOn;
    this.redirectPageUrl = options.redirectPageUrl;
    this.schemaInput = this.container.querySelector('.js-input');
    this.qrCodeContainer = this.container.querySelector('.js-qr');

    this.schemaInput.value = this.schema;
    this.qrcode = new QRCode(this.qrCodeContainer, {
        text: this.getText(),
        width: 360,
        height: 360,
        colorDark: 'rgba(0, 0, 0, 1)',
        colorLight: 'rgba(0, 0, 0, 0)',
        typeNumber: -1
    });
    this.urlInput.addEventListener('keyup', _this.update.bind(_this), false);
    this.schemaInput.addEventListener('keyup', function () {
        _this.schema = _this.schemaInput.value;
        _this.update.call(_this);
        try {
            chrome.storage.sync.get({
                schema: []
            }, function (storage) {
                var schema = storage.schema;
                schema[_this.index] = _this.schema;
                chrome.storage.sync.set({schema: schema}, function () {
                    // saved
                });
            });
        } catch (e) {
        }
    }, false);
};

QrModel.prototype = {
    constructor: QrModel,
    update: function () {
        this.qrcode.makeCode(this.getText());
        return this;
    },
    getText: function () {
        var url = this.urlInput.value,
            precessedUrl = this.schema === '' ? url : encodeURIComponent(url),
            redirectUrl = this.redirectPageUrl + '#' + encodeURIComponent(this.schema + precessedUrl);
        if (this.redirectOn) {
            return this.schema === '' ? redirectUrl : this.schema + encodeURIComponent(redirectUrl);
        } else {
            return this.schema + precessedUrl;
        }
    }
};
