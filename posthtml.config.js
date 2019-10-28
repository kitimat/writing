module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        BUILD_ID: process.env.BUILD_ID || "dev"
      }
    }
  }
};
