import { ReactElement, useState, useEffect } from 'react';
import { Editor, HttpClient, Context } from '@frontify/frontify-cli/types';
import { createNativeAppBridge } from '@frontify/app-bridge';
import { BlockSettings } from './BlockSettings';
import ColorList from './ColorList';
import Empty from './Empty';
import AddButton from './AddButton';
import '../../../node_modules/@frontify/arcade/dist/index.css';
import { ColorViewModel } from './ColorViewModel';
import { Color } from './Color';
import css from './styles.module.css';

interface Props {
    blockId: number;
    editor: Editor;
    blockSettings: BlockSettings;
    updateSettings: (updatedBlockSettings: BlockSettings) => void;
    httpClient: HttpClient;
    context: Context;
}

export default function ColorScale(props: Props): ReactElement {
    const appBridge = createNativeAppBridge();
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState<ColorViewModel[]>([]);
    const [editingEnabled, setEditingEnabled] = useState<boolean>(props.editor.editingEnabled);
    props.editor.onEditingEnabledToggled = (value) => setEditingEnabled(value);

    useEffect(() => {
        if (props.blockSettings.colors) {
            appBridge.colors
                .getColorsByIds(props.blockSettings.colors.map((c) => c.id))
                .then((result) => {
                    if (!props.blockSettings.colors) {
                        return;
                    }

                    const colorViewModels: ColorViewModel[] = [];

                    for (const color of props.blockSettings.colors) {
                        const match = result.find((r) => Number(r.id) === color.id);
                        if (match) {
                            colorViewModels.push({
                                color: match,
                                width: color.width,
                            });
                        }
                    }

                    setColors(colorViewModels);
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    const update = (updatedColors: ColorViewModel[]): void => {
        props.updateSettings({
            colors: updatedColors.map((c): Color => {
                return {
                    id: Number(c.color.id),
                    width: c.width,
                };
            }),
            size: props.blockSettings.size,
            style: props.blockSettings.style,
        });
    };

    const appendColor = (addedColor: ColorViewModel): void => {
        const updatedColors: ColorViewModel[] = colors.map((color) => color);
        updatedColors.push(addedColor);
        setColors(updatedColors);
        update(updatedColors);
    };

    const removeColorAt = (index: number): void => {
        const updatedColors: ColorViewModel[] = [];

        colors.forEach((c, i) => {
            if (i !== index) {
                updatedColors.push(c);
            }
        });

        setColors(updatedColors);
        update(updatedColors);
    };

    const resizeColorAt = (index: number, width: number): void => {
        const updatedColors: ColorViewModel[] = [];

        colors.forEach((c, i) => {
            if (i === index) {
                c.width = width;
            }
            updatedColors.push(c);
        });

        update(updatedColors);
    };

    const loaded = (
        <>
            <div className={css.colorListContainer}>
                {colors.length > 0 ? (
                    <ColorList
                        removeColorAt={removeColorAt}
                        resizeColorAt={resizeColorAt}
                        blockSettings={props.blockSettings}
                        editingEnabled={editingEnabled}
                        colors={colors}
                    />
                ) : (
                    <Empty editingEnabled={editingEnabled} />
                )}
            </div>
            {editingEnabled ? (
                <AddButton projectId={props.context.project.id} httpClient={props.httpClient} onConfirm={appendColor} />
            ) : (
                ''
            )}
        </>
    );

    const loading = <>Loading...</>;

    return <div>{isLoading ? loading : loaded}</div>;
}
