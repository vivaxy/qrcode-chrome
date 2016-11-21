/**
 * @since 15-08-22 11:55
 * @author vivaxy
 */
'use strict';
var QrModel = function(options) {
    var _this = this;
    var INPUT_SELECTOR = '.js-input';
    var QR_SELECTOR = '.js-qr';
    var INPUT_ACTION_TRIGGER_EVENT = 'keyup';
    this.index = options.index;
    this.container = options.container;
    this.urlInput = options.urlInput;
    this.scheme = options.scheme;
    this.size = options.size || 360;
    this.redirectOn = options.redirectOn;
    this.redirectPageUrl = options.redirectPageUrl;
    this.schemeInput = this.container.querySelector(INPUT_SELECTOR);
    this.qrCodeContainer = this.container.querySelector(QR_SELECTOR);

    this.schemeInput.value = this.scheme;
    this.qrcode = new QRCode(this.qrCodeContainer, {
        text: this.getText(),
        width: this.size,
        height: this.size,
        colorDark: 'rgba(0, 0, 0, 1)',
        colorLight: 'rgba(0, 0, 0, 0)'
    });
    this.urlInput.addEventListener(INPUT_ACTION_TRIGGER_EVENT, _this.update.bind(_this));
    this.schemeInput.addEventListener(INPUT_ACTION_TRIGGER_EVENT, function() {
        _this.scheme = _this.schemeInput.value;
        _this.update.call(_this);
        try {
            chrome.storage.sync.get({
                scheme: []
            }, function(storage) {
                var scheme = storage.scheme;
                scheme[_this.index] = _this.scheme;
                chrome.storage.sync.set({scheme: scheme}, function() {
                    // saved
                });
            });
        } catch (e) {
        }
    });
};

QrModel.prototype = {
    constructor: QrModel,
    update: function() {
        this.qrcode.makeCode(this.getText());
        return this;
    },
    getText: function() {
        var url = this.urlInput.value,
            precessedUrl = this.scheme === '' ? url : encodeURIComponent(url),
            redirectUrl = this.redirectPageUrl + '#' + encodeURIComponent(this.scheme + precessedUrl);
        if (this.redirectOn) {
            return this.scheme === '' ? redirectUrl : this.scheme + encodeURIComponent(redirectUrl);
        } else {
            return this.scheme + precessedUrl;
        }
    }
};
