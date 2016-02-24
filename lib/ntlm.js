"use strict";

var _ = require('lodash');
var soap = require('soap');

function ntlm(username, password, options) {
  console.log('ntlm', arguments)
    options = options || {};
    soap.ClientSSLSecurity.call(this, null, null, null, {
      rejectUnauthorized: options.rejectUnauthorized,
      strictSSL: options.strictSSL
    });
    _.merge(this.defaults, {
        username: username,
        password: password,
        domain: options.domain
    });
}

_.assignIn(ntlm.prototype, soap.ClientSSLSecurity.prototype);

ntlm.prototype.addHeaders = function(headers) {

};

ntlm.prototype.toXML = function() {
    return '';
};

ntlm.prototype.addOptions = function(options) {
    _.merge(options, this.defaults);
};

module.exports = ntlm;
