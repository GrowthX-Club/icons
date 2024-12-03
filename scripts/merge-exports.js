#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import { stdin, stdout } from 'process';
import readline from 'readline';

const rl = readline.Interface(stdin, stdout);

const folderPath = process.env.npm_config_path;

const filePaths = [];

const getAllFilePaths = directory => {
  fs.readdirSync(directory).forEach(subDirectory => {
    if (!subDirectory.startsWith('.')) {
      const absolutePath = path.join(directory, subDirectory);

      if (fs.statSync(absolutePath).isDirectory())
        return getAllFilePaths(absolutePath);
      else if (
        absolutePath.endsWith('index.js') ||
        absolutePath.endsWith('index.ts')
      )
        return filePaths.push(absolutePath);
    }
  });
};

const initialize = () => {
  if (!folderPath) {
    rl.close();
    return console.log(
      "\u001b[1;31m \nError \u001b[0m\n\nYou haven't mentioned path."
    );
  }

  getAllFilePaths(folderPath);

  if (folderPath.length === 0) {
    rl.close();
    return console.log('\u001b[1;31m \nError \u001b[0m\n\nEmpty folder.');
  }

  const ext = filePaths[0].split('.')[1];

  let exportData = '';
  const folderRegex = new RegExp(`^${folderPath}`);

  const rootIndex = ['js', 'ts'].map(el => `${folderPath}/index.${el}`);

  const rootPath = filePaths.find(filePath => rootIndex.includes(filePath));

  const rootContent = rootPath ? fs.readFileSync(rootPath).toString() : '';
  const paths = filePaths.filter(path => path !== rootPath);
  for (const filePath of paths) {
    let content = fs.readFileSync(filePath).toString();

    const updatedPath = filePath
      .replaceAll(/(\\|\/\/)/g, '/')
      .replace(folderRegex, '.')
      .replaceAll(/\/index\.(ts|js)/g, '');

    content = content.replaceAll(
      /from ("|')\.\/.+("|')/g,
      `from "${updatedPath}"`
    );

    if (rootContent.includes(content)) {
      rl.close();
      return console.log(
        '\u001b[1;31m \nError \u001b[0m\n\nImport statement already present.'
      );
    }

    exportData += content;
  }

  if (rootPath) {
    fs.appendFileSync(rootPath, exportData);
    console.log(exportData);
  } else {
    const newFile = fs.createWriteStream(`${folderPath}/index.${ext}`);

    newFile.write(exportData);
  }
  rl.close();
};

initialize();
