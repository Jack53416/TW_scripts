// webpack.config.js
const path = require('path');
const webpack = require('webpack');

const METADATA = `  // ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:8081/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @grant        GM_notification
// ==/UserScript==`

module.exports = {
    entry: './src/main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'coin-minter.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
        }, ],
    },
    plugins: [
        new webpack.BannerPlugin({
            raw: true,
            banner: METADATA
        })
    ]
};