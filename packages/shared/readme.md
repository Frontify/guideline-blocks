# Shared Package

## Code Structure

-   `components` (React components which are reused across multiple guideline-blocks)
-   `utilities` (Shared functionality without business logic)
-   `helpers` (Shared functionality with business logic)

You can get more informations in our [best practices guide](https://weare.frontify.com/auth/?referer=%2Fdocument%2F1405%23/getting-started/best-pratices).

## Development

Run `npm run build:watch` to make changes directly available to the linked packages.

## Using components

To use React components you need to modify the `tailwind.config.js` inside the consumer package the following way:

```
module.exports = {
    presets: [require('@frontify/guideline-blocks-settings/tailwind')],
    content: [
        'src/**/*.{ts,tsx}',
        '../shared/src/**/*.{ts,tsx}',
    ],
    corePlugins: {
        preflight: false,
    },
};
```
