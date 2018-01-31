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
    let addr;
    let proxy;
    let manager1;
    let manager2;
    let interfaceHash;

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
        implementer = accounts[1];
        manager1 = accounts[2];
        manager2 = accounts[3];
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
        interfaceHash = await eip820.interfaceHash("IExampleInterface");
        assert.equal(interfaceHash, web3.utils.sha3("IExampleInterface"));
        await eip820.setInterfaceImplementer(addr, interfaceHash, implementer, {from: addr});
        const rImplementer = await eip820.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer);
    }).timeout(6000);

    it('should change manager', async () => {
        await eip820.setManager(addr, manager1, {from: addr});
        const rManager1 = await eip820.getManager(addr);
        assert.equal(rManager1, manager1);
    }).timeout(6000);

    it('manager should remove interface', async() => {
        await eip820.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager1, gas: 200000});
        const rImplementer = await eip820.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, "0x0000000000000000000000000000000000000000");
    }).timeout(6000);

    it('address should change back the interface', async() => {
        await eip820.setInterfaceImplementer(addr, interfaceHash, implementer, {from: manager1});
        const rImplementer = await eip820.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer);
    }).timeout(6000);

    it('manager should change manager', async() => {
        await eip820.setManager(addr, manager2, {from: manager1});
        const rManager2 = await eip820.getManager(addr);
        assert.equal(rManager2, manager2);
    }).timeout(6000);

    it('address should remove interface', async() => {
        await eip820.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager2, gas: 200000});
        const rImplementer = await eip820.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, "0x0000000000000000000000000000000000000000");
    }).timeout(6000);

    it('manager should set back interface', async() => {
        await eip820.setInterfaceImplementer(addr, interfaceHash, implementer, {from: manager2, gas: 200000});
        const rImplementer = await eip820.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer);
    }).timeout(6000);

    it('address should remove manager', async() => {
        await eip820.setManager(addr, 0, {from: manager2, gas: 200000});
        const rManager = await eip820.getManager(addr);
        assert.equal(rManager, addr);
    }).timeout(6000);

    it('manager should not be able to change interface', async() => {
        let errorDetected;
        try {
            await eip820.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager2, gas: 200000});
        } catch(e) {
            errorDetected = true;
        }
        assert(errorDetected, "Error not detected");
    }).timeout(6000);
});
