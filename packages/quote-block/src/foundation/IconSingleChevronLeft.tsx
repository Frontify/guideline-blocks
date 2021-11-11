import { FC } from 'react';
import { getIconSize, IconProps, ICON_CLASS_NAME } from './utilities';

const IconSingleChevronLeft: FC<IconProps> = ({ size }) => (
    <svg
        className={ICON_CLASS_NAME}
        width={getIconSize(size)}
        height={getIconSize(size)}
        viewBox="0 0 10 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.50606 12L0.619141 7.26386V4.76275L9.50606 0H9.6657V2.23503L2.69453 5.85366V6.17295L9.6657 9.79157V12H9.50606Z" />
    </svg>
);

export default IconSingleChevronLeft;
