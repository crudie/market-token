const PrivateKeyProvider = require("truffle-privatekey-provider");
const privateKey = process.env.NETWORK_PRIVATE_KEY;
const endPoint = process.env.NETWORK_ENDPOINT;

module.exports = {
    networks: {
        live: {
            provider: () => {
                return new PrivateKeyProvider(privateKey, endPoint);
            },
            network_id: 4
        },
    }
};