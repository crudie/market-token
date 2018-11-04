const Token = artifacts.require("./MarketToken.sol");

const name = 'Market Token';
const symbol = 'MTT';
const decimals = 18;

// 999 tokens for the owner
const ownerSupply = 999;

contract('MarketToken', (accounts) => {
    const owner = accounts[0];
    const anotherAccount = accounts[1];

    let contract;

    beforeEach(async () => {
        // Deploy contract
        contract = await Token.new({
            from: owner
        });

        // Mint some tokens to the owner
        await contract.mint(owner, ownerSupply);
    });

    it('makes sure that the contract was deployed', () => {
        assert.ok(contract.address);
    });

    it('checks params', async () => {
        let contractName = await contract.name();
        let contractSymbol = await contract.symbol();
        let contractDecimals = await contract.decimals();

        assert.strictEqual(name, contractName);
        assert.strictEqual(symbol, contractSymbol);
        assert.strictEqual(decimals, contractDecimals.toNumber());
    });

    it('sends tokens to another account', async () => {
        // 10 tokens
        const amount = 10;

        // First check if the first account would lose his tokens
        const ownerBeforeBalance = await contract.balanceOf(owner);

        assert.strictEqual(
            ownerSupply,
            ownerBeforeBalance.toNumber()
        );

        await contract.transfer(anotherAccount, amount, {from: owner, gas: '1000000'});

        const ownerAfterBalance = await contract.balanceOf(owner);

        assert.strictEqual(
            ownerSupply - amount,
            ownerAfterBalance.toNumber()
        );

        const anotherCurrentBalance = await contract.balanceOf(anotherAccount);

        assert.strictEqual(amount, anotherCurrentBalance.toNumber());
    });

    describe('Check mint cases', async () => {
        it('checks that only minter can mint tokens', async () => {
            try {
                await contract.mint(anotherAccount, 10, {
                    from: anotherAccount
                });
            } catch (err) {
                assert(err);

                return;
            }

            assert(false);
        });


        it('mints token to another account', async () => {
            const amount = 10;

            const beforeBalance = await contract.balanceOf(anotherAccount);

            assert.strictEqual(
                0,
                beforeBalance.toNumber()
            );

            await contract.mint(anotherAccount, amount, {
                from: owner
            });

            const afterBalance = await contract.balanceOf(anotherAccount);

            assert.strictEqual(
                amount,
                afterBalance.toNumber()
            );
        });

        it('checks that minter cannot mint new tokens after renounceMinter', async () => {
            await contract.renounceMinter({
                from: owner
            });

            try {
                await contract.mint(anotherAccount, 10, {
                    from: owner
                });
            } catch (err) {
                assert(err);

                return;
            }

            assert(false);
        });
    });
});