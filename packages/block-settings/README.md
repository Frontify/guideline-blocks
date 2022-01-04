# Block Settings

Provides the block settings types for the guideline-blocks.

## Example

```ts
import { Bundle, Settings } from '@frontify/guideline-blocks-settings';
import { IconEnum } from '@frontify/arcade';

const Settings: Settings = {
    main: [
        {
            id: 'example',
            type: 'dropdown',
            size: 'Large',
            defaultValue: 'solid',
            choices: [
                {
                    value: 'noline',
                    icon: IconEnum.LineSpacer,
                    label: 'Spacer (no line)',
                },
                {
                    value: 'solid',
                    icon: IconEnum.LineSolid,
                    label: 'Line',
                },
            ],
            onChange: (bundle: Bundle): void => {
                const blockWidth = Number(bundle.getBlock('widthCustom')?.value);
                if (!Number.isNaN(blockWidth)) {
                    bundle.setBlockValue('widthCustom', `${blockWidth}%`);
                }
            },
        },
    ],
```
