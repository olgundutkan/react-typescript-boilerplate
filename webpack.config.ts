import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import PATHS from './config/path';
import packageJson from './package.json';
import dotenv from 'dotenv';
import fs from 'fs';

const webpackConfiguration = (env: { PRODUCTION?: boolean }) => {
    const isProd = !!env?.PRODUCTION;
    const envPath = isProd ? '.env.production' : '.env.development';
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
    } else {
        dotenv.config();
    }

    const appMetadata = {
        title: process.env.APP_TITLE || 'My App',
        version: packageJson.version || '1.0.0',
        description: packageJson.description || 'A React application.',
    };

    const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

    interface WebpackConfiguration extends Configuration {
        devServer?: DevServerConfiguration;
    }

    const config: WebpackConfiguration = {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'source-map',
        entry: ['./src/index.tsx'],
        output: {
            path: PATHS.dist,
            filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
            chunkFilename: isProd ? '[name].chunk.[contenthash:8].js' : '[name].chunk.js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.scss'],
            alias: {
                '@api': PATHS.api,
                '@components': PATHS.components,
                '@pages': PATHS.pages,
                '@store': PATHS.store,
                '@utils': PATHS.utils,
                '@styles': PATHS.styles,
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.module\.s[ac]ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { modules: true }
                        },
                        'sass-loader'
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: /\.module\.s[ac]ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/media/[name].[contenthash:8][ext]',
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name][ext]'
                    }
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(PATHS.public, 'index.html'),
                favicon: path.resolve(PATHS.public, 'favicon.png'),
                title: appMetadata.title,
                meta: {
                    description: appMetadata.description,
                    version: appMetadata.version
                },
                minify: true
            }),
            new DefinePlugin({
                'process.env.APP_TITLE': JSON.stringify(appMetadata.title),
                'process.env.APP_VERSION': JSON.stringify(appMetadata.version),
                'process.env.APP_DESCRIPTION': JSON.stringify(appMetadata.description),
                'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000/api'),
                'process.env.OPEN_ID': process.env.OPEN_ID || false,
                'process.env.API_TIMEOUT': JSON.stringify(process.env.API_TIMEOUT || '5000'),
                'process.env.API_RETRY_COUNT': JSON.stringify(process.env.API_RETRY_COUNT || '2'),
                'process.env.API_RETRY_DELAY': JSON.stringify(process.env.API_RETRY_DELAY || '1000'),
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './public/assets/styles',
                        to({ context, absoluteFilename }) {
                            const name = path.basename(absoluteFilename || '', path.extname(absoluteFilename || ''));
                            const ext = path.extname(absoluteFilename || '');
                            const hash = require('crypto').createHash('md5').update(name).digest('hex').slice(0, 8);
                            return `assets/styles/${name}.${hash}${ext}`;
                        }
                    },
                    {
                        from: './public/assets/fonts',
                        to({ context, absoluteFilename }) {
                            const name = path.basename(absoluteFilename || '', path.extname(absoluteFilename || ''));
                            const ext = path.extname(absoluteFilename || '');
                            const hash = require('crypto').createHash('md5').update(name).digest('hex').slice(0, 8);
                            return `assets/fonts/${name}.${hash}${ext}`;
                        }
                    }
                ]
            }),
            ...(isProd ? [new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: path.resolve(PATHS.dist, 'build-report.html')
            })] : [])
        ],
        ...!isProd && {
            devServer: {
                static: {
                    directory: PATHS.public,
                },
                port: PORT,
                open: {
                    app: {
                        name: "Google Chrome",
                    },
                },
                hot: true,
            }
        },
        ...(isProd && {
            optimization: {
                moduleIds: 'named',
                chunkIds: 'named',
                minimize: true,
                minimizer: [
                    new CssMinimizerPlugin(),
                    new TerserPlugin({
                        terserOptions: {
                            compress: true,
                            mangle: true,
                            format: {
                                comments: false,
                            },
                        },
                        extractComments: false,
                    }),
                ],
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all',
                        },
                        mui: {
                            test: /[\\/]node_modules[\\/]@mui[\\/]/,
                            name: 'app',
                            chunks: 'all',
                        }
                    }
                },
                runtimeChunk: {
                    name: 'runtime',
                },
            },
        })

    };

    return config;
};

export default webpackConfiguration;