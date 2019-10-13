module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "for-direction": "error",   //for (var i = 10; i >= 0; i++) {}
        "no-dupe-keys": "error",
        "no-dupe-args": "error", // function(a,b,a)
        "no-duplicate-case": "error",  //no duplicate case in switch case   
        "valid-typeof": "error",    //typeof name === "strnig"
        "curly": "error"     // curly braces required in if else statement
    }
};