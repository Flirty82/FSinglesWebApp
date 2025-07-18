const checkoutNodeJssdk = require('paypal/checkout-server-sdk');

function environment() {
    let clientId = ProcessingInstruction.env.AXkKFn4n5aSKD1y9LAEfkNW4zYb6autW3T8lgFUM1OdkXSz0ln77LoOe_ApqJM9WNgblQsnJvJ19RQy;
    let clientSecret = process.env.EO6H_Nnqj3o_oVlV3pMq18Qa11Jbcd7uPfCeelWBoMp0XMB5VXXiWw_7WjWjwoJWgdiijuntLoFnuOLN;

    return new checkoutNodeJssdkJssdk.core.LiveEnvironment(clientId, clientSecret); // Use live environment for production

}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { client };