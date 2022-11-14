/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Template, useBlockAssets, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { ReactElement, useCallback } from 'react';
import 'tailwindcss/tailwind.css';
import { BlockProps, PreviewType, Settings } from './types';
import { Button, ButtonEmphasis, ButtonSize, EditorActions, IconPlus12, RichTextEditor, Text } from '@frontify/fondue';

const ACTIONS = [[EditorActions.BOLD, EditorActions.ITALIC, EditorActions.UNDERLINE]];

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId().toString();
    console.log(blockSettings, blockAssets);

    const onChangeText = (value: string, key: string) => setBlockSettings({ ...blockSettings, [key]: value });

    const onTemplateSelected = useCallback((result: Template) => {
        setBlockSettings({ ...blockSettings, template: result.id });
        appBridge.closeTemplateChooser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openTemplateChooser = () => appBridge.openTemplateChooser(onTemplateSelected);

    return (
        <div data-test-id="template-block">
            <div className="tw-border tw-rounded tw-border-black-20 tw-p-8">
                <div className="tw-mb-2">
                    <RichTextEditor
                        id={`${blockId}-title`}
                        value={blockSettings.title}
                        placeholder="Template Name"
                        onTextChange={(value) => onChangeText(value, 'title')}
                        actions={[]}
                        readonly={!isEditing}
                    />
                    <Text size={'small'}>0 pages</Text>
                </div>
                <RichTextEditor
                    id={`${blockId}-description`}
                    value={blockSettings.description}
                    placeholder="Use default Template description if available, add your own or leave it empty"
                    onTextChange={(value) => onChangeText(value, 'description')}
                    actions={ACTIONS}
                    readonly={!isEditing}
                />
            </div>

            {isEditing && blockSettings.previewType === PreviewType.None && (
                <div className="tw-mt-4 tw-flex tw-justify-end">
                    <Button
                        icon={<IconPlus12 />}
                        emphasis={ButtonEmphasis.Default}
                        size={ButtonSize.Small}
                        onClick={openTemplateChooser}
                    >
                        Add Template
                    </Button>
                </div>
            )}
        </div>
    );
};
