import { FC } from 'react';
import { getIconSize, IconProps, ICON_CLASS_NAME } from './utilities';

const IconSingleQuotes: FC<IconProps> = ({ size }) => (
    <svg
        className={ICON_CLASS_NAME}
        width={getIconSize(size)}
        height={getIconSize(size)}
        viewBox="0 0 14.66 25.301"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M 1.97 25.301 L 1.97 19.941 L 5.044 19.941 C 7.461 19.941 8.67 18.733 8.67 16.316 L 8.67 13.793 L 7.33 13.793 C 5.228 13.793 3.494 13.163 2.128 11.902 C 0.709 10.641 0 9.038 0 7.094 C 0 4.992 0.709 3.284 2.128 1.971 C 3.494 0.657 5.228 0 7.33 0 C 9.484 0 11.245 0.657 12.611 1.971 C 13.977 3.337 14.66 5.15 14.66 7.409 L 14.66 16.473 C 14.66 22.358 11.718 25.301 5.833 25.301 L 1.97 25.301 Z"></path>
    </svg>
);

export default IconSingleQuotes;
