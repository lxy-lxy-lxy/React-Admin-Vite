module.exports = {
        tabWidth: 2,
        overrides: [
                {
                        "files": "*.css",
                        "options": {
                                "parser": "css",
                                "tabWidth": 2,
                                "singleQuote": true,
                                "trailingComma": "none"
                        }
                },
                {
                        "files": "*.scss",
                        "options": {
                                "parser": "scss",
                                "tabWidth": 2,
                                "singleQuote": true,
                                "trailingComma": "none"
                        }
                },
        ]
};
