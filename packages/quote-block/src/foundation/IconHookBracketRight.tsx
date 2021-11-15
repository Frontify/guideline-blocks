import { FC } from 'react';
import { IconProps, ICON_CLASS_NAME } from './utilities';

const IconHookBracketRight: FC<IconProps> = ({ style }) => (
    <svg
        style={style}
        className={ICON_CLASS_NAME}
        viewBox="0 0 7 12"
        fill="currentColor"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M.212 12h5.86V0H4.7v10.72H.212V12z" />
    </svg>
);

export default IconHookBracketRight;
