import withLinaria from 'next-with-linaria';

import CopyWebpackPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,

    webpack(config, { isServer }) {
        if (!isServer) {
            // 1) serve all assets (chunks, workers, wasm) via HTTP
            config.output.publicPath = '/_next/';
            config.output.workerPublicPath = '/_next/';
            // 2) ensure WebAssembly is supported
            config.experiments = {
                ...config.experiments,
                asyncWebAssembly: true,
                syncWebAssembly: true,
            };
            // 3) profit
            config.output.chunkFilename = 'static/chunks/[name].[contenthash].js';
        }

        config.module.generator['asset/resource'] = config.module.generator['asset'];
        config.module.generator['asset/source'] = config.module.generator['asset'];
        delete config.module.generator['asset'];

        // config.module.rules.push(
        //     {
        //         test: /workerHelpers.*\.js$/,
        //         type: 'asset/resource',
        //         generator: {
        //             filename: 'static/chunks/[name].[contenthash][ext]'
        //         }
        //     },
        //     {
        //         test: /wasm_boids*\.js$/,
        //         type: 'asset/resource',
        //         generator: {
        //             filename: 'static/chunks/[name].[contenthash][ext]'
        //         }
        //     }
        // );
        //
        // config.plugins.push(
        //     new CopyWebpackPlugin({
        //         patterns: [
        //             {
        //                 from: 'node_modules/@kaichevannes/react-boids/dist/assets/wasm_boids-*.js',
        //                 to: '.next/static/chunks/[name][ext]',
        //             },
        //         ],
        //     })
        // );

        /* SVGR */
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            // Set this to false to require specifying width and height
                            dimensions: false,
                        }
                    }
                ],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },

    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/(.*)',

                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                ],
            },
        ];
    },
};

export default withLinaria(config);
