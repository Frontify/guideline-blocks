import { FC } from 'react';
import { getIconSize, IconProps, ICON_CLASS_NAME } from './utilities';

const IconDoubleChevronLeft: FC<IconProps> = ({ size }) => (
    <svg
        className={ICON_CLASS_NAME}
        width={getIconSize(size)}
        height={getIconSize(size)}
        viewBox="0 0 16 12"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8.48661 -6.83424e-07L8.48661 2.27313L2.6452 5.84141L2.6452 6.15859L8.48661 9.7533L8.48661 12L8.32802 12L0.715688 7.21586L0.715688 4.78414L8.32802 -6.97288e-07L8.48661 -6.83424e-07ZM15.5703 2.27313L9.70247 5.84141L9.70247 6.15859L15.5703 9.7533L15.5703 12L15.4117 12L7.77296 7.21586L7.77296 4.78414L15.4117 -7.80114e-08L15.5703 -6.4147e-08L15.5703 2.27313Z" />
    </svg>
);

export default IconDoubleChevronLeft;
