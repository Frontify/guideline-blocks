/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { FC } from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import 'tailwindcss/tailwind.css';
import { ColorBlockType, Props, Settings } from './types';

export const ColorScaleBlock: FC<Props> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<any>(appBridge);
    const [showCompleted] = useState(true);
    const [calculatedWidths, setCalculatedWidths] = useState(false);
    const [editedColor, setEditedColor]: any = useState();
    const colorOptionsRef: any = useRef();
    const colorScaleBlockRef: any = useRef();
    const colorPickerRef: any = useRef();

    return (
        <div data-test-id="example-block">
            <span className="tw-text-text tw-underline">A custom block in violet and underlined</span>
        </div>
    );
};
