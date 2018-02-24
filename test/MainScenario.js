const TestRPC = require('ganache-cli');
const Web3 = require('web3');
const chai = require('chai');
const ERC820 = require('../index.js');
const ExampleImplementer = require("../build/contracts").ExampleImplementer;
const ExampleImplementer2 = require("../build/contracts").ExampleImplementer2;

const assert = chai.assert;
const { utils } = Web3;
const log = (msg) => { if (process.env.MOCHA_VERBOSE) console.log(msg); };
const blocks = [];

describe('ERC820 Test', () => {
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

    it('should deploy implementer', async () => {
        implementer = await ExampleImplementer.new(web3);
        assert.ok(implementer.$address);
    }).timeout(20000);

    it('should deploy implementer2', async () => {
        implementer2 = await ExampleImplementer2.new(web3);
        assert.ok(implementer2.$address);
    }).timeout(20000);

    it('should set an address', async () => {
        interfaceHash = await erc820Registry.interfaceHash("ERC820ExampleImplementer2");
        assert.equal(interfaceHash, web3.utils.sha3("ERC820ExampleImplementer2"));
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: addr});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('should change manager', async () => {
        await erc820Registry.setManager(addr, manager1, {from: addr});
        const rManager1 = await erc820Registry.getManager(addr);
        assert.equal(rManager1, manager1);
    }).timeout(6000);

    it('manager should remove interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager1, gas: 200000});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, "0x0000000000000000000000000000000000000000");
    }).timeout(6000);

    it('address should change back the interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: manager1});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('manager should change manager', async() => {
        await erc820Registry.setManager(addr, manager2, {from: manager1});
        const rManager2 = await erc820Registry.getManager(addr);
        assert.equal(rManager2, manager2);
    }).timeout(6000);

    it('address should remove interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager2, gas: 200000});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, "0x0000000000000000000000000000000000000000");
    }).timeout(6000);

    it('Should not allow to set an interface an ivalid contract', async() => {
        let errorDetected;
        const tx = await erc820Registry.setInterfaceImplementer(addr, interfaceHash, erc820Registry.$address, {from: manager2, gas: 200000});
        assert.equal("0x00", tx.status)
    }).timeout(6000);

    it('manager should set back interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: manager2, gas: 200000});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('address should remove manager', async() => {
        await erc820Registry.setManager(addr, 0, {from: manager2, gas: 200000});
        const rManager = await erc820Registry.getManager(addr);
        assert.equal(rManager, addr);
    }).timeout(6000);

    it('manager should not be able to change interface', async() => {
        let errorDetected;
        const tx = await erc820Registry.setInterfaceImplementer(addr, interfaceHash, 0, {from: manager2, gas: 200000});
        assert.equal("0x00", tx.status);
    }).timeout(6000);
});
