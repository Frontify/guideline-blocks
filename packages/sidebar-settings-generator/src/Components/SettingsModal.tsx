/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonStyle, ButtonType, Modal, Stack } from '@frontify/fondue';
import { FC } from 'react';
import { ColorInputForm } from './ColorInputForm';
import { Form, FormDropdown } from './Form';
import { InputForm } from './InputForm';
import { SwitchForm } from './SwitchForm';

type SettingsProps = {
    show: boolean;
    onClose: () => void;
    onUpdateSettings: (setting: any) => void;
};

export const SettingsModal: FC<SettingsProps> = ({ show, onClose, onUpdateSettings }) => {
    const getInputFields = (type: string) => {
        switch (type) {
            case 'input':
                return <InputForm />;
            case 'switch':
                return <SwitchForm />;
            case 'colorInput':
                return <ColorInputForm />;
            default:
                return null;
        }
    };

    return (
        <Form onSubmit={onUpdateSettings}>
            {({ submitForm, watch }) => {
                const type = watch('type');

                return (
                    <Modal
                        isOpen={show}
                        onClose={onClose}
                        shouldCloseOnInteractOutside={(element) => !!element?.dataset?.isUnderlay}
                        shouldCloseOnBlur
                    >
                        <Modal.Header title="Add new Settings" />
                        <Modal.Body>
                            <Stack direction="column" spacing="s" padding="none">
                                <FormDropdown
                                    label={{ children: 'Block Type' }}
                                    name="type"
                                    menuBlocks={[
                                        {
                                            id: '1',
                                            menuItems: [
                                                { id: 'input', title: 'Input' },
                                                { id: 'switch', title: 'Switch' },
                                                { id: 'colorInput', title: 'Color Input' },
                                            ],
                                        },
                                    ]}
                                />
                                {type !== undefined && getInputFields(type)}
                            </Stack>
                        </Modal.Body>
                        <Modal.Footer
                            buttons={[
                                {
                                    onClick: onClose,
                                    type: ButtonType.Button,
                                    children: 'Cancel',
                                    style: ButtonStyle.Secondary,
                                },
                                { onClick: submitForm, type: ButtonType.Button, children: 'Submit' },
                            ]}
                        />
                    </Modal>
                );
            }}
        </Form>
    );
};
