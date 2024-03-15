npm run convert-svg;
pushd output;
npm run build;
npm version patch
popd;
cp output/package.json dist/;
npm pack ./dist