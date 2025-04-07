const { getDefaultConfig } = require('expo/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Loại bỏ "svg" khỏi assetExts và thêm vào sourceExts
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts.push('svg');

  // Chỉ định transformer cho SVG
  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');


  return wrapWithReanimatedMetroConfig(config);
})();

