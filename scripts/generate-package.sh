npm run convert-svg;
pushd output;
npm ci
npm run build:types;
# npm version patch
popd;
npm run build
cp output/package.json dist/;
# npm pack ./dist
# npm publish ./dist