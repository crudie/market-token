const Token = artifacts.require('MarketToken.sol');

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Token);

    const token = await Token.deployed();

    const owner = await token.owner();

    console.log('**************************************************');
    console.log(' -- PLEASE, COPY THE INFORMATION BELOW');
    console.log('Token address: ' + token.address);
    console.log('Token owner: ' + owner);
    console.log('**************************************************');
};