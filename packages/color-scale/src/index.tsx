import '../../../node_modules/@frontify/arcade/dist/index.css';
import { AddButton } from './AddButton';
import { BlockSettings } from './BlockSettings';
import { Color } from './Color';
import { ColorList } from './ColorList';
import { ColorViewModel } from './ColorViewModel';
import { createNativeAppBridge } from '@frontify/app-bridge';
import { FC, ReactElement, useState, useEffect } from 'react';
import { useEditorState } from '@frontify/app-bridge/dist/react';
import css from './styles.module.css';

type Props = {
    blockSettings: BlockSettings;
    updateSettings: (updatedBlockSettings: BlockSettings) => void;
};

const ColorScale: FC<Props> = (props: Props) => {
    const appBridge = createNativeAppBridge();
    const editingEnabled = useEditorState();
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState<ColorViewModel[]>([]);

    const loadColors = async (): Promise<void> => {
        if (!props.blockSettings.colors) {
            return;
        }

        try {
            const result = await appBridge.colors.getColorsByIds(props.blockSettings.colors.map((c) => c.id));
            const colorViewModels = props.blockSettings.colors.reduce<ColorViewModel[]>((all, { id, width }) => {
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
            {editingEnabled && <AddButton projectId={appBridge.context.getProjectId()} onConfirm={appendColor} />}
        </>
    );

    return <>{isLoading ? <>Loading...</> : loaded}</>;
};

export default ColorScale;
