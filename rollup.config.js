import { terser } from 'rollup-plugin-terser';

export default [
  // Development build (non-minified)
  {
    input: 'src/js/index.js',
    output: {
      file: 'dist/ohok.js',
      format: 'umd',
      name: 'Ohok',
      sourcemap: true
    }
  },
  // Production build (minified)
  {
    input: 'src/js/index.js',
    output: {
      file: 'dist/ohok.min.js',
      format: 'umd',
      name: 'Ohok',
      sourcemap: true
    },
    plugins: [terser()]
  }
];
