import '../src/styles.css';
import '@frontify/arcade/style';
import { dark, light } from './frontifyTheme';

export const parameters = {
    options: {
        storySort: {
            order: ['Components'],
        },
    },
    darkMode: {
        darkClass: 'tw-dark',
        classTarget: 'html',
        stylePreview: true,
        dark: { ...dark },
        light: { ...light },
    },
};
