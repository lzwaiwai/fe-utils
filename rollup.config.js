// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: './libs/main.js',
  format: 'umd',
  dest: 'fe-utils.js', // equivalent to --output
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  moduleName: 'feUtils',
  sourceMap: true
};
