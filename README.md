# ERC820 Pseudo-introspection Registry Contract
[![Build Status](https://travis-ci.org/jbaylina/ERC820.svg?branch=master)](https://travis-ci.org/jbaylina/ERC820)
[![License](https://img.shields.io/github/license/jbaylina/ERC820.svg?style=flat-square&maxAge=3600)](https://github.com/jbaylina/ERC820/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/erc820.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/erc820)
[![npm downloads](https://img.shields.io/npm/dt/erc820.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/erc820)
[![Solidity version](https://img.shields.io/badge/Solidity-v0.4.24-ff69b4.svg?style=flat-square&maxAge=3600)](https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html)
[![EIP](https://img.shields.io/badge/EIP-820-lightgrey.svg?style=flat-square&maxAge=3600)](https://eips.ethereum.org/EIPS/eip-820)

*Universal registry smart contract where any address (contract or regular account) can register which interface it supports and which smart contract is responsible for its implementation.*

## Proposal
The official proposal can be found at: [eips.ethereum.org/EIPS/eip-820][ERC820].

## ERC820 Registry

This repository contains the official implementation of the [ERC820 registry] as defined in the [standard][ERC820].

The address of the registry on all chains is:
```
0x820Afdf355177C099f0251e96A8e8B2974307381
```

## ERC820 Implementer

The [ERC820 implementer interface] is the interface any contract MUST implement if said contract implements an interface on behalf of another address via ERC820.

## Authors
 - Jordi Baylina [@jbaylina][jbaylina]
 - Jacques Dafflon [@jacquesd][jacquesd]

## License

> The [ERC820 registry] is part of the  [ERC820 standard][ERC820] and is therefore in the public domain via [CC0].

The authors waive all copyright and related or neighboring rights for the rest of this repository's content via [CC0]. A copy of the [CC0] waiver is included in the [LICENSE] file.


[ERC820]: https://eips.ethereum.org/EIPS/eip-820
[ERC820 registry]: https://github.com/jbaylina/ERC820/blob/master/contracts/ERC820Registry.sol
[ERC820 implementer interface]: https://github.com/jbaylina/erc820/blob/master/contracts/ERC820ImplementerInterface.sol
[jbaylina]: https://github.com/jbaylina
[jacquesd]: https://github.com/jacquesd
[CC0]: http://creativecommons.org/publicdomain/zero/1.0/
[LICENSE]: https://github.com/jbaylina/erc820/blob/master/LICENSE
