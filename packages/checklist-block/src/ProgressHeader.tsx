import React, { ReactElement } from 'react';
import { ProgressHeaderProps } from './types';

export default function ProgressHeader({ value }: ProgressHeaderProps): ReactElement {
    return (
        <div>
            <span className="tw-font-bold tw-text-black-100">{value}</span>{' '}
            <span className="tw-black-80">completed</span>
        </div>
    );
}
