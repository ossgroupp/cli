require('dotenv').config();

const { writeFileSync } = require('fs');
const { resolve } = require('path');

const { Bootstrapper } = require('@osspim/import-utilities');

if (
  !process.env.OSSPIM_ACCESS_TOKEN_ID ||
  !process.env.OSSPIM_ACCESS_TOKEN_SECRET
) {
  throw new Error(
    'OSSPIM_ACCESS_TOKEN_ID and OSSPIM_ACCESS_TOKEN_SECRET must be set'
  );
}

function getFullSpec(instanceIdentifier) {
  const bootstrapper = new Bootstrapper();

  bootstrapper.setAccessToken(
    process.env.OSSPIM_ACCESS_TOKEN_ID,
    process.env.OSSPIM_ACCESS_TOKEN_SECRET
  );

  bootstrapper.setInstanceIdentifier(instanceIdentifier);

  console.log('⏳ Getting the full spec for ' + instanceIdentifier);

  return bootstrapper.createSpec();
}

function removeItemCatalogPath(item) {
  delete item.catalogPath;

  if (item.children) {
    item.children.forEach(removeItemCatalogPath);
  }
}

async function furniture() {
  const spec = await getFullSpec('furniture');

  const itemShop = spec.items.find((i) => i.catalogPath === '/shop');
  const itemStories = spec.items.find((i) => i.catalogPath === '/stories');
  const itemAbout = spec.items.find((i) => i.catalogPath === '/about');
  const itemAssets = spec.items.find((i) => i.catalogPath === '/assets');
  const itemFrontpage = spec.items.find(
    (i) => i.catalogPath === '/frontpage-2021'
  );

  // Only include a few shop sub folders
  itemShop.children = itemShop.children.filter((c) =>
    ['/shop/plants', '/shop/chairs'].includes(c.catalogPath)
  );

  spec.items = [itemShop, itemStories, itemAbout, itemFrontpage, itemAssets];

  // Remove references as we do not want to update existing items
  spec.items.forEach(removeItemCatalogPath);

  writeFileSync(
    resolve(__dirname, `./src/journeys/_shared/specs/furniture.json`),
    JSON.stringify(spec, null, 1),
    'utf-8'
  );

  console.log(`✔ furniture done`);
}

async function voyage() {
  const spec = await getFullSpec('voyage');

  // Remove references as we do not want to update existing items
  spec.items.forEach(removeItemCatalogPath);

  writeFileSync(
    resolve(__dirname, `./src/journeys/_shared/specs/voyage.json`),
    JSON.stringify(spec, null, 1),
    'utf-8'
  );

  console.log(`✔ voyage done`);
}

async function photofinder() {
  const spec = await getFullSpec('photofinder');

  // Remove references as we do not want to update existing items
  spec.items.forEach(removeItemCatalogPath);

  writeFileSync(
    resolve(__dirname, `./src/journeys/_shared/specs/photofinder.json`),
    JSON.stringify(spec, null, 1),
    'utf-8'
  );

  console.log(`✔ photofinder done`);
}

async function conference() {
  const spec = await getFullSpec('conference-boilerplate');

  // Remove references as we do not want to update existing items
  spec.items.forEach(removeItemCatalogPath);

  writeFileSync(
    resolve(__dirname, `./src/journeys/_shared/specs/conference-boilerplate.json`),
    JSON.stringify(spec, null, 1),
    'utf-8'
  );

  console.log(`✔ conference done`);
}

(async function createSpecs() {
  await furniture();
  await voyage();
  await photofinder();
  await conference();
  process.exit(0);
})();
