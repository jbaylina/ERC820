const TestRPC = require('ethereumjs-testrpc');
const Web3 = require('web3');
const chai = require('chai');
const EIP820 = require('../index.js');

const assert = chai.assert;
const { utils } = Web3;
const log = (msg) => { if (process.env.MOCHA_VERBOSE) console.log(msg); };
const blocks = [];

describe('EIP820 Test', () => {
    let testrpc;
    let web3;
    let accounts;
    let eip820;

    before(async () => {
        testrpc = TestRPC.server({
            ws: true,
            gasLimit: 5800000,
            total_accounts: 10,
        });

        testrpc.listen(8546, '127.0.0.1');

        web3 = new Web3('ws://localhost:8546');
        accounts = await web3.eth.getAccounts();
    });

    after(async () => {
        await testrpc.close();
    });

    it('should deploy EIP820', async () => {
        eip820 = await EIP820.deploy(web3, accounts[0]);
        assert.ok(eip820.$address);
        log(eip820.$address);
    }).timeout(20000);

    it('should set an address', async () => {
        await eip820.setInterfaceImplementer(web3.utils.sha3("IExampleInterface"), accounts[2], {from: accounts[0]});
        const addr = await eip820.getInterfaceImplementer(accounts[0], web3.utils.sha3("IExampleInterface"));
        assert(addr, accounts[2]);
    }).timeout(6000);

});
