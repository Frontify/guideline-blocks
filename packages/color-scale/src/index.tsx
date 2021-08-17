import '../../../node_modules/@frontify/arcade/dist/index.css';
import { AddButton } from './AddButton';
import { BlockSettings } from './BlockSettings';
import { Color } from './Color';
import { ColorList } from './ColorList';
import { ColorViewModel } from './ColorViewModel';
import { createNativeAppBridge } from '@frontify/app-bridge';
import { Editor, Context } from '@frontify/frontify-cli/types';
import { FC, ReactElement, useState, useEffect } from 'react';
import css from './styles.module.css';

type Props = {
    editor: Editor;
    blockSettings: BlockSettings;
    updateSettings: (updatedBlockSettings: BlockSettings) => void;
    context: Context;
};

const ColorScale: FC<Props> = (props: Props) => {
    const appBridge = createNativeAppBridge();
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState<ColorViewModel[]>([]);
    const [editingEnabled, setEditingEnabled] = useState<boolean>(props.editor.editingEnabled);
    props.editor.onEditingEnabledToggled = (value) => setEditingEnabled(value);

    const loadColors = async (): Promise<void> => {
        if (!props.blockSettings.colors) {
            return;
        }

        try {
            const result = await appBridge.colors.getColorsByIds(props.blockSettings.colors.map((c) => c.id));

            if (!props.blockSettings.colors) {
                return;
            }

            const colorViewModels: ColorViewModel[] = [];

            for (const color of props.blockSettings.colors) {
                const match = result.find((r) => Number(r.id) === color.id);
                if (match) {
                    colorViewModels.push({ color: match, width: color.width });
                }
            }

            setColors(colorViewModels);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect((): void => {
        loadColors();
    }, []);

    const update = (updatedColors: ColorViewModel[]): void => {
        props.updateSettings({
            colors: updatedColors.map(({ color, width }): Color => ({ id: Number(color.id), width })),
            size: props.blockSettings.size,
            style: props.blockSettings.style,
        });
    };

    const appendColor = (addedColor: ColorViewModel): void => {
        const updatedColors: ColorViewModel[] = [...colors, addedColor];
        setColors(updatedColors);
        update(updatedColors);
    };

    const removeColorAt = (index: number): void => {
        const updatedColors = colors.reduce<ColorViewModel[]>(
            (all, current, i) => (i === index ? all : [...all, current]),
            []
        );
        setColors(updatedColors);
        update(updatedColors);
    };

    const resizeColorAt = (index: number, width: number): void => {
        const updatedColors = colors.reduce<ColorViewModel[]>((all, current, i) => {
            if (i === index) {
                current.width = width;
            }
            return [...all, current];
        }, []);

        update(updatedColors);
    };

    const loaded: ReactElement = (
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
                    editingEnabled && 'Empty. Please add colors.'
                )}
            </div>
            {editingEnabled && <AddButton projectId={props.context.project.id} onConfirm={appendColor} />}
        </>
    );

    return <>{isLoading ? <>Loading...</> : loaded}</>;
};

export default ColorScale;
