const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

function environment() {
    let clientId = process.env.AxkKI4n5aSKD1y9LAEfkNW4zYb6autW3T8lgFUM1OdxXSkz0ln77LoOe_ApqJM9WNgblQsnJrJ19RQy;
    let clientSecret = process.env.EO6H_Nnqj3o_oVlV3pMq18Qa11Jbcd7uPfCeelWBoMiWw_7WjWjwoJWgdiijuntLoFnuOLN;

    return new checkoutNode.Jssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { client };

const environment = () => {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
}