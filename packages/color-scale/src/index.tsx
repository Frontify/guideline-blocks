import '@frontify/arcade/style';
import { AddButton } from './AddButton';
import { BlockSettings } from './BlockSettings';
import { Color } from './Color';
import { ColorList } from './ColorList';
import { ColorViewModel } from './ColorViewModel';
import { AppBridgeNative } from '@frontify/app-bridge';
import { FC, useState, useEffect } from 'react';
import { useEditorState } from '@frontify/app-bridge/react';
import css from './styles.module.css';

type Props = {
    appBridge: AppBridgeNative;
};

const ColorScale: FC<Props> = ({ appBridge }) => {
    const blockSettings = appBridge.getBlockSettings<BlockSettings>();
    const editingEnabled = useEditorState();
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState<ColorViewModel[]>([]);

    const loadColors = async (): Promise<void> => {
        if (!blockSettings.colors) {
            return;
        }

        try {
            const result = await appBridge.getColorsByIds(blockSettings.colors.map((c) => c.id));
            const colorViewModels = blockSettings.colors.reduce<ColorViewModel[]>((all, { id, width }) => {
                const match = result.find((r) => Number(r.id) === id);
                return match ? [...all, { color: match, width }] : all;
            }, []);

            setColors(colorViewModels);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect((): void => {
        loadColors();
    }, []);

    const update = (updatedColors: ColorViewModel[]): void => {
        appBridge.updateBlockSettings({
            colors: updatedColors.map(({ color, width }): Color => ({ id: Number(color.id), width })),
            size: blockSettings.size,
            style: blockSettings.style,
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

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <>
            <div className={css.colorListContainer}>
                {colors.length > 0 ? (
                    <ColorList
                        removeColorAt={removeColorAt}
                        resizeColorAt={resizeColorAt}
                        blockSettings={blockSettings}
                        editingEnabled={editingEnabled}
                        colors={colors}
                    />
                ) : (
                    editingEnabled && 'Empty. Please add colors.'
                )}
            </div>
            {editingEnabled && (
                <AddButton appBridge={appBridge} projectId={appBridge.getProjectId()} onConfirm={appendColor} />
            )}
        </>
    );
};

export default ColorScale;
