const transpileModule = require('next-transpile-modules')(['react-babylonjs', '@babylonjs/core', '@babylonjs/gui']);

module.exports = transpileModule();
