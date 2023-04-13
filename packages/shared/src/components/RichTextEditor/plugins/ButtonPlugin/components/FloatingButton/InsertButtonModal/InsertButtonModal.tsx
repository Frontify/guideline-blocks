/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens, FormControl, useRichTextEditorContext } from '@frontify/fondue';
import React, { CSSProperties, ReactElement, ReactNode, useState } from 'react';
import { InsertModal } from '../../../../LinkPlugin/FloatingLink/InsertLinkModal/InsertModal';
import { useInsertModal } from './useInsertModal';

export const InsertButtonModal = () => {
    const modalProps = useInsertModal();
    const { state, onButtonStyleChange } = modalProps;
    const context = useRichTextEditorContext();

    const designTokens = context.designTokens as DesignTokens;

    return (
        <InsertModal {...modalProps} testId="floating-button-insert">
            <div className="tw-pt-5">
                <FormControl
                    label={{
                        children: 'Button Style',
                        htmlFor: 'buttonStyle',
                        required: true,
                    }}
                >
                    <HoverableButton
                        id="primary"
                        styles={designTokens.buttonPrimary}
                        isActive={state.buttonStyle === 'primary'}
                        onClick={() => onButtonStyleChange('primary')}
                    >
                        {state.text || 'Primary Button'}
                    </HoverableButton>

                    <HoverableButton
                        id="secondary"
                        styles={designTokens.buttonSecondary}
                        isActive={state.buttonStyle === 'secondary'}
                        onClick={() => onButtonStyleChange('secondary')}
                    >
                        {state.text || 'Secondary Button'}
                    </HoverableButton>

                    <HoverableButton
                        id="tertiary"
                        styles={designTokens.buttonTertiary}
                        isActive={state.buttonStyle === 'tertiary'}
                        onClick={() => onButtonStyleChange('tertiary')}
                    >
                        {state.text || 'Tertiary Button'}
                    </HoverableButton>
                </FormControl>
            </div>
        </InsertModal>
    );
};

type Props = {
    id: string;
    styles?: CSSProperties & { hover?: CSSProperties };
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
};

const HoverableButton = ({ id, styles, isActive, onClick, children }: Props): ReactElement => {
    const [hovered, setHovered] = useState(false);
    const getStyles = () => (styles && styles.hover && hovered ? { ...styles, ...styles.hover } : styles);

    return (
        <button
            data-test-id={`floating-button-insert-${id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={getStyles()}
            className={
                isActive ? 'tw-outline tw-outline-1 tw-outline-violet-60 tw-outline-offset-2 tw-w-fit' : 'tw-w-fit'
            }
        >
            {children}
        </button>
    );
};
