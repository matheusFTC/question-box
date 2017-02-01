var crypto = require("crypto");

module.exports = function (app) {
    const algorithm = app.parameters.encryption.algorithm;
    const secret = app.parameters.encryption.secret;
    const inputEncoding = app.parameters.encryption.inputEncoding;
    const outputEncoding = app.parameters.encryption.outputEncoding;

    var encryption = {};

    encryption.encrypt = function (value) {
        var cipher = crypto.createCipher(algorithm, secret);
        var crypted = cipher.update(value, inputEncoding, outputEncoding);

        crypted += cipher.final(outputEncoding);

        return crypted;
    };

    encryption.decrypt = function (value) {
        var decipher = crypto.createDecipher(algorithm, secret);
        var decrypted = decipher.update(value, outputEncoding, inputEncoding);

        decrypted += decipher.final(inputEncoding);

        return decrypted;
    };

    return encryption;
};