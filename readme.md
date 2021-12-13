# Guideline Blocks

## Local block development

### Requirements:

-   Node 16.x.x
-   Access to a Frontify styleguide

### Setup

1. Clone this repository
    ```
    $ git clone git@github.com:Frontify/guideline-blocks.git`
    ```
2. Install the dependencies
    ```
    $ npm install && npm run bootstrap
    ```
3. Start your block.
    ```
    $ npm run serve example
    ```
4. Go to your Frontify styleguide
5. Switch to edit mode
   ![Styleguide Edit mode](./docs/styleguide-edit-mode.png)
6. Click on the plus icon and add a "Local Block Development" block
   ![Local block development](./docs/local-block-development.png)
7. Choose port (default is 5600) and click OK
### Troubleshooting

If you encounter any error with the CLI, you can troubleshoot the problem with the following steps:

1. Clone the `frontify-cli` repository
    ```
    $ git clone git@github.com:Frontify/frontify-cli.git
    ```
2. Install the dependencies
    ```
    $ npm install
    ```
3. Build the CLI
    ```
    $ npm run build
    ```
4. Link the package (in `frontify-cli`)
    ```
    $ npm link .
    ```
5. Link the frontify cli (in `guideline-blocks`)
    ```
    $ npm link @frontify/frontify-cli
    ```
6. Try to run your local CLI build

### Create a new release

Use `npm run publish` to create a new version.
