const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        main: './index.html',
        custom: './custom-page.html',
        order: './order.html',
      }
    }
  }
});
