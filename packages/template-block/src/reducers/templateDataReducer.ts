/* (c) Copyright Frontify Ltd., all rights reserved. */

export enum TemplateDataActionType {
    UPDATE_TITLE = 'UPDATE_TITLE',
    UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
}

type Action =
    | { type: TemplateDataActionType.UPDATE_TITLE; payload: { newValue: string; prevValue?: string } }
    | { type: TemplateDataActionType.UPDATE_DESCRIPTION; payload: { newValue: string; prevValue?: string } };

interface TemplateDataState {
    templateTitle: string;
    templateDescription: string;
}

export const templateDataReducer = (state: TemplateDataState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case TemplateDataActionType.UPDATE_TITLE: {
            const newTitleValue = payload.prevValue ? payload.prevValue : payload.newValue;

            return {
                ...state,
                templateTitle: newTitleValue,
            };
        }
        case TemplateDataActionType.UPDATE_DESCRIPTION: {
            const newDescriptionValue = payload.prevValue ? payload.prevValue : payload.newValue;

            return {
                ...state,
                templateDescription: newDescriptionValue,
            };
        }
        default:
            return state;
    }
};
