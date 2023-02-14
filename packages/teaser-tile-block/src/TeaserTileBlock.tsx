/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/fondue-tokens/styles';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Settings } from './types';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { TeaserTile } from './components/TeaserTile';

const MOCK_TILES = [{ id: '1234' }, { id: '5678' }];

export const TeaserTileBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    return (
        <div data-test-id="teasertile-block" className="tw-relative">
            {MOCK_TILES.map(({ id }) => (
                <TeaserTile appBridge={appBridge} key={id} id={id} />
            ))}
        </div>
    );
};
