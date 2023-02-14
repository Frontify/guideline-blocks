/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';

import { Settings } from './types';
import { TeaserTile } from './components/TeaserTile';

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    return (
        <div
            className="tw-relative"
            data-test-id="teaser-tile-block"
            style={{
                display: 'grid',
                gridAutoFlow: 'row',
                gridTemplateRows: 'auto',
                gridTemplateColumns: `repeat(${blockSettings.columns}, 1fr)`,
                gridGap: blockSettings.spacing ? blockSettings.spacingChoice : 0,
                gridAutoRows: blockSettings.height ? blockSettings.heightChoice : 100,
            }}
        >
            {/* <div style={{ background: 'red' }}>Item 1</div>
            <div style={{ background: 'blue' }}>Item 2</div>
            <div style={{ background: 'green' }}>Item 3</div>
            <div style={{ background: 'yellow' }}>Item 4</div> */}

            {[null, null].map((_, index) => (
                <TeaserTile appBridge={appBridge} key={index} index={index} />
            ))}
        </div>
    );
};
