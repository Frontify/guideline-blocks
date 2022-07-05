/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FormControl, IconAdd, Modal } from '@frontify/fondue';
import { FC } from 'react';
import { Form, FormDropdown } from './Form';

type SettingsProps = {
    show: boolean;
    onClose: () => void;
};

export const SettingsModal: FC<SettingsProps> = ({ show, onClose }) => {
    return (
        <Modal
            isOpen={show}
            onClose={onClose}
            shouldCloseOnInteractOutside={(element) => !!element.dataset.isUnderlay}
            shouldCloseOnBlur
        >
            <Modal.Header title="Add new Settings" />
            <Modal.Body>
                <Form onSubmit={(data) => console.log(data)}>
                    <FormDropdown
                        label={{ children: 'Block Type' }}
                        name="type"
                        menuBlocks={[{ id: '1', menuItems: [{ id: '1', title: 'title' }] }]}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};
