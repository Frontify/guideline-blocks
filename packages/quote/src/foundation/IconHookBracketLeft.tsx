import { FC } from 'react';
import { getIconSize, IconProps, ICON_CLASS_NAME } from './utilities';

const IconHookBracketLeft: FC<IconProps> = ({ size }) => (
    <svg
        className={ICON_CLASS_NAME}
        width={getIconSize(size)}
        height={getIconSize(size)}
        viewBox="0 0 7 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6.07324 -4.06531e-07L0.212347 -9.18907e-07L0.212346 12L1.58483 12L1.58483 1.27975L6.07324 1.27975L6.07324 -4.06531e-07Z" />
    </svg>
);

export default IconHookBracketLeft;
