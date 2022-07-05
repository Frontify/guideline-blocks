/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonStyle, ButtonType, Modal, Stack } from '@frontify/fondue';
import { FC } from 'react';
import { Form, FormDropdown, FormSwitch, FormTextInput } from './Form';

type SettingsProps = {
    show: boolean;
    onClose: () => void;
    onUpdateSettings: (setting: any) => void;
};

export const SettingsModal: FC<SettingsProps> = ({ show, onClose, onUpdateSettings }) => {
    const getInputFields = (type: string) => {
        switch (type) {
            case 'input':
                return (
                    <>
                        <FormTextInput name="id" label={{ children: 'ID' }} placeholder="ID" />
                        <FormTextInput
                            name="placeholder"
                            label={{ children: 'Placeholder' }}
                            placeholder="Placeholder"
                        />
                        <FormTextInput
                            name="defaultValue"
                            label={{ children: 'Default Value' }}
                            placeholder="Default Value"
                        />
                        <FormTextInput name="label" label={{ children: 'Label' }} placeholder="Label" />
                        <FormTextInput name="info" label={{ children: 'Info' }} placeholder="Info" />
                    </>
                );
            case 'switch':
                return (
                    <>
                        <FormTextInput name="id" label={{ children: 'ID' }} placeholder="ID" />
                        <FormTextInput name="label" label={{ children: 'Label' }} placeholder="Label" />
                        <FormTextInput name="info" label={{ children: 'Info' }} placeholder="Info" />
                        <FormSwitch name="defaultValue" label="Default Value" />
                    </>
                );
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
                            <Stack direction="column" spacing="m" padding="none">
                                <FormDropdown
                                    label={{ children: 'Block Type' }}
                                    name="type"
                                    menuBlocks={[
                                        {
                                            id: '1',
                                            menuItems: [
                                                { id: 'input', title: 'Input' },
                                                { id: 'switch', title: 'Switch' },
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
                        ></Modal.Footer>
                    </Modal>
                );
            }}
        </Form>
    );
};
