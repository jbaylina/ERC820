const output = require('../build/solcStandardOutput.json');
const fs = require('fs');

fs.writeFileSync('ERC820Registry_metadata.json', output.contracts['./contracts/ERC820Registry.sol'].ERC820Registry.metadata);
