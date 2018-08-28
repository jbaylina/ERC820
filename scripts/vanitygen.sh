#! /bin/bash

rm -rf tmp
mkdir tmp
for i in {0..15}; do
  mkdir -p "./tmp/${i}/contracts"
  cp contracts/ERC820Registry.sol "./tmp/${i}/contracts/"
done

for VALUE in `seq 0 16 32768`; do
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: ${VALUE}/1" tmp/0/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+1))/1" tmp/1/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+2))/1" tmp/2/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+3))/1" tmp/3/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+4))/1" tmp/4/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+5))/1" tmp/5/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+6))/1" tmp/6/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+7))/1" tmp/7/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+8))/1" tmp/8/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+9))/1" tmp/9/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+10))/1" tmp/10/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+11))/1" tmp/11/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+12))/1" tmp/12/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+13))/1" tmp/13/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+14))/1" tmp/14/contracts/ERC820Registry.sol
  sed -i '' -Ee "s/^\/\/ IV:.+$/\/\/ IV: $((${VALUE}+15))/1" tmp/15/contracts/ERC820Registry.sol

  pushd ./tmp/0 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/1 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/2 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/3 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  wait
  pushd ./tmp/4 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/5 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/6 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/7 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  wait
  pushd ./tmp/8 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/9 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts --quiet &
  popd > /dev/null
  pushd ./tmp/10 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts  --quiet &
  popd > /dev/null
  pushd ./tmp/11 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts  --quiet &
  popd > /dev/null
  wait
  pushd ./tmp/12 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts  --quiet &
  popd > /dev/null
  pushd ./tmp/13 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts  --quiet &
  popd > /dev/null
  pushd ./tmp/14 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts  --quiet &
  popd > /dev/null
  pushd ./tmp/15 > /dev/null
  npx solcpiler -i ./contracts/ERC820Registry.sol --solc-version="v0.4.24+commit.e67f0147" \
    --insert-file-names none --output-artifacts-dir artifacts  --quiet &
  popd > /dev/null
  wait

  node scripts/vanitygen-info.js "${VALUE}" | tee -a addrs.txt

  rm -rf tmp/0/build tmp/0/artifacts \
    tmp/1/build tmp/1/artifacts \
    tmp/2/build tmp/2/artifacts \
    tmp/3/build tmp/3/artifacts \
    tmp/4/build tmp/4/artifacts \
    tmp/5/build tmp/5/artifacts \
    tmp/6/build tmp/6/artifacts \
    tmp/7/build tmp/7/artifacts \
    tmp/8/build tmp/8/artifacts \
    tmp/9/build tmp/9/artifacts \
    tmp/10/build tmp/10/artifacts \
    tmp/11/build tmp/11/artifacts \
    tmp/12/build tmp/12/artifacts \
    tmp/13/build tmp/13/artifacts \
    tmp/14/build tmp/14/artifacts \
    tmp/15/build tmp/15/artifacts

done
