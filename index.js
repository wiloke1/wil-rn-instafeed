const { exec } = require('child_process');
const chokidar = require('chokidar');

const isDev = process.env.NODE_ENV === 'dev';

chokidar.watch('./src').on('change', (event, path) => {
  console.log(`change file`, event, event.replace(/^src/g, 'dist').replace(/\w*\.tsx/g, ''));
  // exec(`ttsc ${event} --outDir ${event.replace(/^src/g, 'dist').replace(/\w*\.tsx/g, '')} && babel src --out-dir dist`, () => {
  //   console.log('done');
  // });
  // const command = isDev ? `ttsc --outDir node_modules/wil-rn-instafeed && babel src --out-dir node_modules/wil-rn-instafeed` : `ttsc && babel src --out-dir dist`
  exec(`yarn build`, () => {
    console.log('done');
  });
});
