const TestRPC = require('ganache-cli');
const Web3 = require('web3');
const chai = require('chai');
const ERC820 = require('../index.js');
const ExampleImplementer = require("../artifacts/contracts").ExampleImplementer;
const ExampleClient = require("../artifacts/contracts").ExampleClient;

const assert = chai.assert;
chai.use(require('chai-as-promised')).should();
const { utils } = Web3;
const log = (msg) => { if (process.env.MOCHA_VERBOSE) console.log(msg); };
const blocks = [];
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe('ERC820 Test', () => {
    let testrpc;
    let web3;
    let accounts;
    let erc820Registry;
    let addr;
    let proxy;
    let implementer;
    let client;
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

    it('should deploy the example implementer', async () => {
        implementer = await ExampleImplementer.new(web3);
        assert.ok(implementer.$address);
    }).timeout(20000);

    it('should deploy the example client', async () => {
        client = await ExampleClient.new(web3);
        assert.ok(client.$address);
    }).timeout(20000);

    it('should set an address', async () => {
        interfaceHash = await erc820Registry.interfaceHash("ERC820ExampleClient");
        assert.equal(interfaceHash, web3.utils.sha3("ERC820ExampleClient"));
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: addr});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('should change manager', async () => {
        await erc820Registry.setManager(ZERO_ADDRESS, manager1, {from: addr});
        const rManager1 = await erc820Registry.getManager(addr);
        assert.equal(rManager1, manager1);
    }).timeout(6000);

    it('manager should remove interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, ZERO_ADDRESS, {from: manager1, gas: 200000});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, ZERO_ADDRESS);
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
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, ZERO_ADDRESS, {from: manager2, gas: 200000});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, ZERO_ADDRESS);
    }).timeout(6000);

    it('Should not allow to set an interface an invalid contract', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, erc820Registry.$address, {from: manager2, gas: 200000})
          .should.be.rejectedWith('revert');
    }).timeout(6000);

    it('manager should set back interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, implementer.$address, {from: manager2, gas: 200000});
        const rImplementer = await erc820Registry.getInterfaceImplementer(addr, interfaceHash);
        assert.equal(rImplementer, implementer.$address);
    }).timeout(6000);

    it('address should remove manager', async() => {
        await erc820Registry.setManager(addr, ZERO_ADDRESS, {from: manager2, gas: 200000});
        const rManager = await erc820Registry.getManager(addr);
        assert.equal(rManager, addr);
    }).timeout(6000);

    it('manager should not be able to change interface', async() => {
        await erc820Registry.setInterfaceImplementer(addr, interfaceHash, ZERO_ADDRESS, {from: manager2, gas: 200000})
          .should.be.rejectedWith('revert');
    }).timeout(6000);
});
