/* eslint-disable */
const { ethers, upgrades } = require('hardhat');
const Safe = require('@gnosis.pm/safe-core-sdk').default;
const EthersAdapter = require('@gnosis.pm/safe-ethers-lib').default;
// const semver = require('semver');
// const pkgInfos = require('../../../../build/integrations_bucket.json');
async function main() {
  const signer = await ethers.getSigner();
  const ethAdapter = new EthersAdapter({
    ethers,
    signer: signer
  })
  const safeSdk = await Safe.create({ ethAdapter, safeAddress: '0x4941D523fa837A536B8bed834F6e6c807FAba24C' });
  const IntegrationRegistry = await ethers.getContractFactory('IntegrationRegistry');
  // const IntRegistrar = await upgrades.deployProxy(IntegrationRegistry);
  // console.log('IntegrationRegistry deployed to:', IntRegistrar.address);
  const safe = '0x4941D523fa837A536B8bed834F6e6c807FAba24C';
  // await upgrades.admin.transferProxyAdminOwnership(safe);
  const integrationRegistry = await IntegrationRegistry.connect(
    '0x92a441451e34b428B943cd69F7f8eDA20b6d30A9',
  );
  await integrationRegistry.transferOwnership(safe);
  const d = await integrationRegistry.functions.release(
    "@akashaorg/app-akasha-integration",
    "v0.1",
    "0x0155171c33b359938f34ff430571aaba23715c7cc7ba49f2e54c5f0558fdb09a",
    0,
  );

  //await integrationRegistry.transferOwnership(safe);

  // for(const pkg of pkgInfos){
  //   if(typeof pkg.type !== "number"){
  //     continue;
  //   }
  //   const packageInfo = await integrationRegistry.getPackageInfo(pkg.id);
  //   let version;
  //   if(!packageInfo || !packageInfo.integrationName){
  //     version = 'v0.1.0';
  //   } else {
  //     const currentRelease = await integrationRegistry.getReleaseData(packageInfo.latestReleaseId);
  //     version = 'v' + semver.inc(currentRelease.version, 'minor');
  //   }
  //   console.log('deploying: ', pkg.name, ' version: ',version )
  //   await integrationRegistry.release(
  //     pkg.name,
  //     version,
  //     '0x'+pkg.ipfsManifest.substring(1),
  //     pkg.type,
  //   );
  //   console.log('deployed: ', pkg.name)
  // }
  // const readIntegrationRegistry = await ethers.getContractAt(
  //   'IntegrationRegistry',
  //   '0xFB0b97933e5e94b0b0b8dEF09403222b5009bDED',
  // );
  // const releases = await readIntegrationRegistry.getAllPackageIds(0, 15);
  // await integrationRegistry.release(
  //   'testPackageHehe',
  //   'v0.1.1',
  //   '0x0170171c23281b16a3c58934162488ad6d039df686eca806f21eba0cebd03486',
  //   0,
  // );
  // const packageId = await integrationRegistry.generateIntegrationId('testPackageHehe');
  // console.log('packageId', packageId);
  // const packageInfo = await integrationRegistry.getPackageInfo(packageId);
  // console.log('packageInfo', packageInfo);
  // const releaseData = await integrationRegistry.getReleaseData(packageInfo.latestReleaseId);
  // console.log('releaseData', releaseData);
  //await akRegistrar.deployed();

  // const proxyAddress = '0x80A254518169f9443BC79F14a9800c438b467df9';
  //
  // const IntegrationRegV1 = await ethers.getContractFactory('IntegrationRegistry');
  // console.log('Preparing upgrade...');
  // const integrationRegAddr = await upgrades.prepareUpgrade(proxyAddress, IntegrationRegV1);
  // console.log('IntegrationRegAddr at:', integrationRegAddr);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });