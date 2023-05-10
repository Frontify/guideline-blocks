/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { InsertModal, useInsertModal } from './';

export const InsertLinkModal = () => <InsertModal {...useInsertModal()} testId="floating-link-insert" />;
