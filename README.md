# ERC820 Registry Implementation
[![Build Status](https://travis-ci.org/jbaylina/ERC820.svg?branch=master)](https://travis-ci.org/jbaylina/ERC820)
[![npm version](https://img.shields.io/npm/v/erc820.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/erc820)
[![npm downloads](https://img.shields.io/npm/dt/erc820.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/erc820)
[![Solidity version](https://img.shields.io/badge/Solidity-v0.4.24-ff69b4.svg?style=flat-square&maxAge=3600)](https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html)
[![EIP](https://img.shields.io/badge/EIP-820-lightgrey.svg?style=flat-square&maxAge=3600)](https://eips.ethereum.org/EIPS/eip-820)

*Universal registry smart contract where any address (contract or regular account) can register which interface it supports and which smart contract is responsible for its implementation.*

## Proposal
The official proposal can be found at: [eips.ethereum.org/EIPS/eip-820][ERC820].

## ERC820 Registry

This repository contains the official implementation of the [ERC820 registry] as defined in the [standard][ERC820].

The address of the registry is `0xa691627805d5FAE718381ED95E04d00E20a1fea6` on all chains.

## Authors
 - Jordi Baylina [@jbaylina](https://github.com/jbaylina)
 - Jacques Dafflon [@jacquesd](https://github.com/jacquesd)


[ERC820]: https://eips.ethereum.org/EIPS/eip-820
[ERC820 registry]: https://github.com/jbaylina/eip820/blob/master/contracts/ERC820Registry.sol
