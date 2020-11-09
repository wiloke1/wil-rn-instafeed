import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    copy({
      targets: [
        { src: 'dist', dest: 'example/node_modules/wil-rn-instafeed' },
      ]
    }),
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      typescript: ttypescript,
    }),
    commonjs({
      namedExports: {
        'react-native': [
          'View',
          'Text',
          'Dimensions',
          'TouchableOpacity',
          'TextInput',
          'Platform',
          'StyleSheet',
        ],
        '@react-native-community/slider': ['Slider'],
        'react-is': ['isElement', 'isValidElementType', 'ForwardRef'],
      },
    }),
  ],
};
