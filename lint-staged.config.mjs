const config = {
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': [
    'eslint --fix --no-warn-ignored',
    'prettier --write',
  ],
  '*.{json,md,css,yml,yaml}': 'prettier --write',
};

export default config;
