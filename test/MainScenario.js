const TestRPC = require('ethereumjs-testrpc');
const Web3 = require('web3');
const chai = require('chai');
const EIP820 = require('../index.js');
const ExampleImplementer = require("../js/ExampleImplementer.js");

const assert = chai.assert;
const { utils } = Web3;
const log = (msg) => { if (process.env.MOCHA_VERBOSE) console.log(msg); };
const blocks = [];

describe('EIP820 Test', () => {
    let testrpc;
    let web3;
    let accounts;
    let eip820Registry;
    let addr;
    let proxy;
    let implementer;
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
        manager1 = accounts[2];
        manager2 = accounts[3];
    });

    after(async () => {
        await testrpc.close();
    });

    it('should deploy EIP820', async () => {
        eip820Registry = await EIP820.deploy(web3, accounts[0]);
        assert.ok(eip820Registry.$address);
        log(eip820Registry.$address);
    }).timeout(20000);

    it('should deploy implementer', async () => {
        implementer = await ExampleImplementer.new(web3);
        assert.ok(implementer.$address);
    }).timeout(20000);

    it('should set an address', async () => {
        interfaceHash = await eip820Registry.interfaceHash("IExampleInterface");
        assert.equal(interfaceHash, web3.utils.sha3("IExampleInterface"));
        await eip820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: addr});
        const rImplementer = await eip820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('should change manager', async () => {
        await eip820Registry.setManager(addr, manager1, {from: addr});
        const rManager1 = await eip820Registry.getManager(addr);
        assert.equal(rManager1, manager1);
    }).timeout(6000);

    it('manager should remove interface', async() => {
        await eip820Registry.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager1, gas: 200000});
        const rImplementer = await eip820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, "0x0000000000000000000000000000000000000000");
    }).timeout(6000);

    it('address should change back the interface', async() => {
        await eip820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: manager1});
        const rImplementer = await eip820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('manager should change manager', async() => {
        await eip820Registry.setManager(addr, manager2, {from: manager1});
        const rManager2 = await eip820Registry.getManager(addr);
        assert.equal(rManager2, manager2);
    }).timeout(6000);

    it('address should remove interface', async() => {
        await eip820Registry.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager2, gas: 200000});
        const rImplementer = await eip820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, "0x0000000000000000000000000000000000000000");
    }).timeout(6000);

    it('Should not allow to set an interface an ivalid contract', async() => {
        let errorDetected;
        try {
            await eip820Registry.setInterfaceImplementer(addr, interfaceHash, eip820Registry.$address, {from: manager2, gas: 200000});
        } catch(e) {
            errorDetected = true;
        }
        assert(errorDetected, "Error not detected when seting an invalid contract");
    }).timeout(6000);

    it('manager should set back interface', async() => {
        await eip820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: manager2, gas: 200000});
        const rImplementer = await eip820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('address should remove manager', async() => {
        await eip820Registry.setManager(addr, 0, {from: manager2, gas: 200000});
        const rManager = await eip820Registry.getManager(addr);
        assert.equal(rManager, addr);
    }).timeout(6000);

    it('manager should not be able to change interface', async() => {
        let errorDetected;
        try {
            await eip820Registry.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager2, gas: 200000});
        } catch(e) {
            errorDetected = true;
        }
        assert(errorDetected, "Error not detected");
    }).timeout(6000);
});
