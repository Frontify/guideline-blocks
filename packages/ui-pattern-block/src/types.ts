/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Settings = {
    sandpackTemplate?: SandpackTemplate;
};

export enum SandpackTemplate {
    Angular = 'Angular',
    React = 'React',
    Solid = 'Solid',
    Svelte = 'Svelte',
    Vanilla = 'Vanilla',
    Vue = 'Vue',
}
