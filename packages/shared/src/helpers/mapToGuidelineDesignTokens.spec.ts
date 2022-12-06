/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { mapToGuidelineDesignTokens } from './mapToGuidelineDesignTokens';

const mockedDesignTokens = {
    heading1: {
        family: 'Arial',
        weight: '700',
        size: '40px',
        line_height: '44px',
        margin_top: '4px',
        margin_bottom: '4px',
        uppercase: '1',
    },
    heading2: {
        family: 'Arial',
        weight: '500',
        size: '30px',
        line_height: '34px',
        margin_top: '4px',
        margin_bottom: '4px',
        uppercase: '1',
    },
    heading3: {
        family: 'Arial',
        weight: '400',
        size: '28px',
        line_height: '32px',
        margin_top: '2px',
        margin_bottom: '2px',
        uppercase: '1',
    },
    heading4: {
        family: 'Arial',
        weight: '300',
        size: '24px',
        line_height: '28px',
        margin_top: '2px',
        margin_bottom: '2px',
        uppercase: '1',
        underline: '1',
    },
    custom1: {
        family: 'Helvetica Neue',
        size: '24px',
        letterspacing: '2px',
    },
    custom2: {
        family: 'Helvetica Neue',
        size: '28px',
        letterspacing: '2px',
        italic: '1',
        underline: '1',
    },
    custom3: {
        family: 'Roboto',
    },
    body: {
        size: '14px',
        color: '#333',
    },
    link: {
        underline: '1',
    },
    quote: {
        italic: '1',
    },
    buttonPrimary: {
        family: 'inherit',
        size: '13px',
        color: 'rgba(102,102,102,1)',
        color_hover: 'rgba(76, 76, 76, 1)',
        background_color: 'rgba(230,230,230,1)',
        border_color: 'rgba(207, 207, 207, 1)',
        border_color_hover: 'rgba(155, 155, 155, 1)',
        frame: {
            top: '10rem',
            right: '20',
            bottom: '10',
            left: '20',
        },
        background_color_hover: 'rgba(172, 172, 172, 1)',
    },
    buttonSecondary: {},
    buttonTertiary: {
        size: '14px',
        color: 'rgb(255, 246, 0)',
        frame: {
            top: '11',
            left: '21',
            right: '21',
            bottom: '11',
        },
        family: 'Arial',
        italic: '1',
        weight: '900',
        uppercase: '1',
        color_hover: 'rgb(194, 185, 223)',
        line_height: '1.4',
        border_color: 'rgb(0, 255, 21)',
        border_width: '3px',
        border_radius: '6px',
        background_color: 'rgb(255, 0, 0)',
        border_color_hover: 'rgb(255, 7, 212)',
        background_color_hover: 'rgb(0, 0, 0)',
    },
    callout: {
        info: 'rgb(0, 255, 21)',
        note: 'rgb(255, 246, 0)',
        tip: 'rgb(255, 7, 212)',
        warning: 'rgb(255, 0, 0)',
    },
};

const expectedTransformedDesignTokens = {
    heading1: {
        fontFamily: 'Arial',
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '44px',
        marginTop: '4px',
        marginBottom: '4px',
        textTransform: 'uppercase',
    },
    heading2: {
        fontFamily: 'Arial',
        fontWeight: '500',
        fontSize: '30px',
        lineHeight: '34px',
        marginTop: '4px',
        marginBottom: '4px',
        textTransform: 'uppercase',
    },
    heading3: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: '28px',
        lineHeight: '32px',
        marginTop: '2px',
        marginBottom: '2px',
        textTransform: 'uppercase',
    },
    heading4: {
        fontFamily: 'Arial',
        fontWeight: '300',
        fontSize: '24px',
        lineHeight: '28px',
        marginTop: '2px',
        marginBottom: '2px',
        textTransform: 'uppercase',
        textDecoration: 'underline',
    },
    custom1: {
        fontFamily: 'Helvetica Neue',
        fontSize: '24px',
        letterSpacing: '2px',
    },
    custom2: {
        fontFamily: 'Helvetica Neue',
        fontSize: '28px',
        letterSpacing: '2px',
        fontStyle: 'italic',
        textDecoration: 'underline',
    },
    custom3: {
        fontFamily: 'Roboto',
    },
    p: {
        fontSize: '14px',
        color: '#333',
    },
    link: {
        textDecoration: 'underline',
    },
    quote: {
        fontStyle: 'italic',
    },
    buttonPrimary: {
        hover: {
            color: 'rgba(76, 76, 76, 1)',
            backgroundColor: 'rgba(172, 172, 172, 1)',
            borderColor: 'rgba(155, 155, 155, 1)',
        },
        fontFamily: 'inherit',
        fontSize: '13px',
        backgroundColor: 'rgba(230,230,230,1)',
        paddingTop: '10rem',
        paddingRight: '20px',
        paddingBottom: '10px',
        paddingLeft: '20px',
        color: 'rgba(102,102,102,1)',
        borderColor: 'rgba(207, 207, 207, 1)',
    },
    buttonSecondary: {},
    buttonTertiary: {
        hover: {
            color: 'rgb(194, 185, 223)',
            borderColor: 'rgb(255, 7, 212)',
            backgroundColor: 'rgb(0, 0, 0)',
        },
        fontSize: '14px',
        color: 'rgb(255, 246, 0)',
        paddingTop: '11px',
        paddingRight: '21px',
        paddingBottom: '11px',
        paddingLeft: '21px',
        fontFamily: 'Arial',
        fontStyle: 'italic',
        fontWeight: '900',
        textTransform: 'uppercase',
        lineHeight: '1.4',
        borderColor: 'rgb(0, 255, 21)',
        borderWidth: '3px',
        borderRadius: '6px',
        backgroundColor: 'rgb(255, 0, 0)',
    },
    callout: {
        info: 'rgb(0, 255, 21)',
        note: 'rgb(255, 246, 0)',
        tip: 'rgb(255, 7, 212)',
        warning: 'rgb(255, 0, 0)',
    },
};

/**
 * @vitest-environment happy-dom
 */
describe('mapToGuidelineDesignTokens', () => {
    it('should transform design tokens', () => {
        expect(mapToGuidelineDesignTokens(mockedDesignTokens)).toMatchObject(expectedTransformedDesignTokens);
    });

    it('should transform uppercase to textTransform', () => {
        const result = mapToGuidelineDesignTokens({ body: { uppercase: '1' } });
        expect(result).toMatchObject({ p: { textTransform: 'uppercase' } });
    });

    it('should transform italic to fontStyle', () => {
        const result = mapToGuidelineDesignTokens({ body: { italic: '1' } });
        expect(result).toMatchObject({ p: { fontStyle: 'italic' } });
    });

    it('should transform underline to textDecoration', () => {
        const result = mapToGuidelineDesignTokens({ body: { underline: '1' } });
        expect(result).toMatchObject({ p: { textDecoration: 'underline' } });
    });

    it('should transform color value', () => {
        const result = mapToGuidelineDesignTokens({ body: { color: '#fff' } });
        expect(result).toMatchObject({ p: { color: '#fff' } });
    });
});
