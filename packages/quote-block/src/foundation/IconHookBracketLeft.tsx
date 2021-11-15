import { FC } from 'react';
import { IconProps, ICON_CLASS_NAME } from './utilities';

const IconHookBracketLeft: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 7 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6.073 0H.213v12h1.372V1.28h4.488V0z" />
    </svg>
);

export default IconHookBracketLeft;
