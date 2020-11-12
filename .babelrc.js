module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                debug: false,
                targets: {
                    browsers: ['> 1%', 'not IE < 12']
                },
                "corejs": "3",
                useBuiltIns: 'usage'
            }
        ], 
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-syntax-dynamic-import"
    ]
}