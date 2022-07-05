/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ButtonType, MenuItemContentSize, Modal } from '@frontify/fondue';
import { capitalize } from 'lodash-es';
import { Form, FormDropdown, FormTextInput } from './Form';

export const AddSectionModal = ({
    isOpen,
    onClose,
    sections,
    onAddSection,
}: {
    isOpen: boolean;
    onClose: () => void;
    onAddSection: (section: string) => void;
    sections: string[];
}) => (
    <Form onSubmit={({ section, customSection }) => onAddSection(section === 'custom' ? customSection : section)}>
        {({ watch, submitForm }) => {
            const isCustom = watch('section') === 'custom';
            return (
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    shouldCloseOnInteractOutside={(element: HTMLElement) => !!element.dataset.isUnderlay}
                >
                    <Modal.Header>Add New Section</Modal.Header>
                    <Modal.Body>
                        <>
                            <FormDropdown
                                menuBlocks={[
                                    {
                                        id: 'menu',
                                        menuItems: [
                                            ...sections.map((section) => ({
                                                id: section,
                                                title: capitalize(section),
                                                size: MenuItemContentSize.Small,
                                            })),
                                            {
                                                id: 'custom',
                                                title: 'Custom',
                                                size: MenuItemContentSize.Small,
                                            },
                                        ],
                                    },
                                ]}
                                name="section"
                            />
                            {isCustom && <FormTextInput name="customSection" />}
                        </>
                    </Modal.Body>
                    <Modal.Footer
                        buttons={[
                            { onClick: onClose, type: ButtonType.Button, children: 'Cancel' },
                            { onClick: submitForm, type: ButtonType.Button, children: 'Submit' },
                        ]}
                    />
                </Modal>
            );
        }}
    </Form>
);
