# Shared Package

## Code Structure

-   `components` (React components which are reused across multiple guideline-blocks)
-   `utilities` (Shared functionality without business logic)
-   `helpers` (Shared functionality with business logic)

You can get more informations in our [best practices guide](https://www.notion.so/Best-Practises-e0627785ffad4b9fa94bb7b20f91a673).

## Development

Run `npm run build:watch` to make changes directly available to the linked packages.

## Using components

To use React components you need to modify the `tailwind.config.js` inside the consumer package the following way:

```
module.exports = {
    presets: [require('@frontify/fondue/tailwind'), require('../../tailwind.config')],
    content: ['src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
```
