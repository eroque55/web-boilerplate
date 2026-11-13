module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('prettier-plugin-classnames'),
    require.resolve('prettier-plugin-merge'),
  ],
  tailwindStylesheet: './src/theme/global.css',
  tailwindAttributes: ['className'],
  tailwindFunctions: ['cn'],
  customFunctions: ['cn'],
  classnamesPrintWidth: 120,
};
