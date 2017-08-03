const commonConfig = require('./build-utils/webpack.common');
const webpackMerge = require('webpack-merge');
module.exports = (env) => {

    const envConfig = require(`./build-utils/webpack.${env.env}.js`);
    
    return webpackMerge(commonConfig, envConfig);
}