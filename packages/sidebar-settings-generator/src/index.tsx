import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Color, RichTextEditor } from '@frontify/fondue';
import { FC } from 'react';
import { DEFAULT_BACKGROUND_COLOR, FULL_WIDTH } from './settings';
import style from './style.module.css';

type Settings = {
    width: string;
    backgroundColor: Color;
    textValue: string;
    showRichTextEditor: boolean;
};

type Props = {
    appBridge: AppBridgeNative;
};

const toRgbaString = (color: Color): string => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

const AnExampleBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        width = FULL_WIDTH,
        showRichTextEditor = true,
        backgroundColor = DEFAULT_BACKGROUND_COLOR,
        // plate (rich text editor plugin) element structure
        textValue = JSON.stringify([
            {
                type: 'p',
                children: [
                    { text: `A custom block with background color: ${backgroundColor.name || backgroundColor}` },
                ],
            },
        ]),
    } = blockSettings;
    const isEditing = useEditorState(appBridge);

    const onTextChange = (value: string): Promise<void> => setBlockSettings({ ...blockSettings, textValue: value });

    const customStyles = {
        width,
        backgroundColor: toRgbaString(backgroundColor),
    };

    return (
        <div className={style.container} style={customStyles}>
            <RichTextEditor
                onTextChange={onTextChange}
                readonly={!isEditing || !showRichTextEditor}
                value={textValue}
                placeholder="Type your text here"
            />
        </div>
    );
};

export default AnExampleBlock;
