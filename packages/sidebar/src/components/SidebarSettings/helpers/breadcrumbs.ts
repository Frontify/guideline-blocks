/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Breadcrumb } from '@frontify/arcade';

export const getBlockBreadcrumbs = ($block: JQuery, blockName: string): Breadcrumb[] => {
    return [
        { label: $block.closest('body').data('documentTitle') },
        { label: $block.closest('.page').find('.js-page-title').html() },
        { label: $block.closest('section').find('.js-b-section__title').html() },
        { label: blockName, bold: true },
    ].filter((breadcrumb) => breadcrumb.label);
};

export const getSectionBreadcrumbs = ($section: JQuery): Breadcrumb[] => {
    return [
        { label: $section.closest('body').data('documentTitle') },
        { label: $section.closest('.page').find('.js-page-title').html() },
        { label: 'Heading', bold: true },
    ];
};
