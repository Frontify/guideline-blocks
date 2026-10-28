/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';
import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import definition from './index';

export default { title: 'Blocks/Code Snippet', ...blockMeta(definition) };

const typescript = `type ButtonProps = {
    label: string;
    variant?: 'primary' | 'secondary';
    onClick: () => void;
};

export const Button = ({ label, variant = 'primary', onClick }: ButtonProps) => (
    <button className={\`btn btn--\${variant}\`} onClick={onClick}>
        {label}
    </button>
);`;

const css = `:root {
    --brand-primary: #4f46e5;
    --brand-radius: 8px;
}

.btn {
    padding: 12px 20px;
    border-radius: var(--brand-radius);
    background: var(--brand-primary);
    color: #fff;
}`;

const python = `from dataclasses import dataclass


@dataclass
class BrandColor:
    name: str
    hex: str

    def rgb(self) -> tuple[int, int, int]:
        value = self.hex.lstrip("#")
        return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


print(BrandColor("Indigo", "#4f46e5").rgb())`;

export const Empty: BlockStory = {};

export const TypeScript: BlockStory = {
    args: { content: typescript, language: 'typescript' },
};

export const CssGithubDark: BlockStory = {
    args: { content: css, language: 'css', theme: 'githubDark' },
};

export const PythonWithoutHeaderOrRowNumbers: BlockStory = {
    args: { content: python, language: 'python', theme: 'dracula', withHeading: false, withRowNumbers: false },
};

export const CustomBorder: BlockStory = {
    args: {
        content: typescript,
        language: 'tsx',
        theme: 'xcodeLight',
        hasBorder: true,
        borderStyle: BorderStyle.Dashed,
        borderWidth: '2px',
        borderColor: { red: 79, green: 70, blue: 229, alpha: 1 },
        extendedRadiusChoice: Radius.Large,
    },
};
