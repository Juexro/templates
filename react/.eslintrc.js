module.exports = {
    extends: [
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended'
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    env: {
      browser: true,
      node: true,
      jasmine: true,
      jest: true,
      es6: true,
    },
    settings: {
      react: {
        version: '17.0.1',
      },
    },
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint', 'react'],
    // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  
    rules: {
      'no-await-in-loop': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/prop-types': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-indent': 0,
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: false,
          assignment: false,
        },
      ],
      'react/jsx-filename-extension': 0,
      'react/state-in-constructor': 0,
      'react/jsx-props-no-spreading': 0,
      'react/destructuring-assignment': 0, // TODO: remove later
      'react/require-default-props': 0,
      'react/sort-comp': 0,
      'react/display-name': 0,
      'react/static-property-placement': 0,
      'react/no-find-dom-node': 0,
      'react/no-unused-prop-types': 0,
      'react/default-props-match-prop-types': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/anchor-has-content': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/media-has-caption': 0,
      // label-has-for has been deprecated
      // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
      'jsx-a11y/label-has-for': 0,
  
      'comma-dangle': ['error', 'always-multiline'],
      'consistent-return': 0, // TODO: remove later
      'no-param-reassign': 0, // TODO: remove later
      'no-underscore-dangle': 0,
      // for (let i = 0; i < len; i++)
      'no-plusplus': 0,
      // https://eslint.org/docs/rules/no-continue
      // labeledLoop is conflicted with `eslint . --fix`
      'no-continue': 0,
      // ban this for Number.isNaN needs polyfill
      'no-restricted-globals': 0,
      'max-classes-per-file': 0,
  
      // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
      'no-use-before-define': 0,
      '@typescript-eslint/no-use-before-define': 2,
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': [
        2,
        {
          ignoreTypeValueShadow: true,
        },
      ],
      // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
      'no-undef': 0,
  
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'func-names': 'off',
      'no-restricted-properties': 'off',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-console': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/no-array-index-key': 'off',

      // 自定义
      'comma-dangle': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-inferrable-types': 'off'
    },
    globals: {
      gtag: true,
    },
  };
  