const TestRPC = require('ganache-cli');
const Web3 = require('web3');
const chai = require('chai');
const ERC820 = require('../index.js');
const ExampleImplementer = require("../build/contracts").ExampleImplementer;
const ExampleImplementer2 = require("../build/contracts").ExampleImplementer2;
const LegacyNoCB = require("../build/contracts").LegacyNoCB;
const LegacyCBNoReturn  = require("../build/contracts").LegacyCBNoReturn;
const LegacyCBReturnTrue  = require("../build/contracts").LegacyCBReturnTrue;
const LegacyCBReturnFalse  = require("../build/contracts").LegacyCBReturnFalse;
const Lisa = require("../build/contracts").Lisa;
const Homer = require("../build/contracts").Homer;

const assert = chai.assert;
const { utils } = Web3;
const log = (msg) => { if (process.env.MOCHA_VERBOSE) console.log(msg); };
const blocks = [];
const ERC165_Id = "0x01ffc9a7";
const Invalid_Id = "0xffffffff";
const Simpson_Id = "0x73B6B492";

describe('EIP165 Compatibility Test', () => {
    let testrpc;
    let web3;
    let accounts;
    let erc820Registry;
    let addr;
    let proxy;
    let implementer;
    let implementer2;
    let manager1;
    let manager2;
    let interfaceHash;
    let lisa;
    let homer;

    before(async () => {
        testrpc = TestRPC.server({
            ws: true,
            gasLimit: 5800000,
            total_accounts: 10,
        });

        testrpc.listen(8546, '127.0.0.1');

        web3 = new Web3('ws://localhost:8546');
        accounts = await web3.eth.getAccounts();
        addr = accounts[0];
        manager1 = accounts[2];
        manager2 = accounts[3];
    });

    after(async () => testrpc.close());

    it('should deploy ERC820', async () => {
        erc820Registry = await ERC820.deploy(web3, accounts[0]);
        assert.ok(erc820Registry.$address);
        log(erc820Registry.$address);
    }).timeout(20000);

    it('shold return noInterface for LegacyNoCB', async () => {
        const c = await LegacyNoCB.new(web3);
        assert.ok(c.$address);
        const r = await erc820Registry.implementsERC165InterfaceNoCache(c.address, ERC165_Id);
        assert.equal(r, false);
    });


    it('shold return noInterface for LegacyCBNoReturn', async () => {
        const c = await LegacyCBNoReturn.new(web3);
        assert.ok(c.$address);
        const r = await erc820Registry.implementsERC165InterfaceNoCache(c.address, ERC165_Id);
        assert.equal(r, false);
    });

    it('shold return noInterface for LegacyCBReturnTrue', async () => {
        const c = await LegacyCBReturnTrue.new(web3);
        assert.ok(c.$address);
        const r = await erc820Registry.implementsERC165InterfaceNoCache(c.address, ERC165_Id);
        assert.equal(r, false);
    });

    it('shold return noInterface for LegacyCBReturnFalse', async () => {
        const c = await LegacyCBReturnFalse.new(web3);
        assert.ok(c.$address);
        const r = await erc820Registry.implementsERC165InterfaceNoCache(c.address, ERC165_Id);
        assert.equal(r, false);
    });

    it('should return true on a good impl of eip165 Lisa', async () => {
        lisa = await Lisa.new(web3);
        assert.ok(lisa.$address);
        const r1 = await lisa.supportsInterface(ERC165_Id);
        assert.equal(r1, true);
        const r2 = await lisa.supportsInterface(Invalid_Id);
        assert.equal(r2, false);
        const r3 = await lisa.supportsInterface(Simpson_Id);
        assert.equal(r3, true);
        const r4 = await erc820Registry.implementsERC165InterfaceNoCache(lisa.$address, ERC165_Id);
        assert.equal(r4, true);
        const r5 = await erc820Registry.implementsERC165InterfaceNoCache(lisa.$address, Invalid_Id);
        assert.equal(r5, false);
        const r6 = await erc820Registry.implementsERC165InterfaceNoCache(lisa.$address, Simpson_Id);
        assert.equal(r6, true);
    });

    it('should return true on a good impl of eip165 Homer', async () => {
        homer = await Homer.new(web3);
        assert.ok(lisa.$address);
        const r1 = await lisa.supportsInterface(ERC165_Id);
        assert.equal(r1, true);
        const r2 = await lisa.supportsInterface(Invalid_Id);
        assert.equal(r2, false);
        const r3 = await lisa.supportsInterface(Simpson_Id);
        assert.equal(r3, true);
        const r4 = await erc820Registry.implementsERC165InterfaceNoCache(lisa.$address, ERC165_Id);
        assert.equal(r4, true);
        const r5 = await erc820Registry.implementsERC165InterfaceNoCache(lisa.$address, Invalid_Id);
        assert.equal(r5, false);
        const r6 = await erc820Registry.implementsERC165InterfaceNoCache(lisa.$address, Simpson_Id);
        assert.equal(r6, true);
    });

    it('shold be compatible with erc820', async () => {
        const g1 = await erc820Registry.$contract.methods.getInterfaceImplementer(lisa.$address, Simpson_Id).estimateGas();
//        console.log(g1);
        const a = await erc820Registry.getInterfaceImplementer(lisa.$address, Simpson_Id);
        assert.equal(a, lisa.$address);
        const nc = await erc820Registry.getInterfaceImplementer(lisa.$address, Invalid_Id);
        assert.equal(nc, "0x0000000000000000000000000000000000000000");
        const b = await erc820Registry.getInterfaceImplementer(lisa.$address, ERC165_Id);
        assert.equal(b, lisa.$address);
        await erc820Registry.updateERC165Cache(lisa.$address, Simpson_Id);
        const g2 = await erc820Registry.$contract.methods.getInterfaceImplementer(lisa.$address, Simpson_Id).estimateGas();
        assert(g2<g1/2);  // It is much lower the gas after caching!
//        console.log(g2 );
    });
});
