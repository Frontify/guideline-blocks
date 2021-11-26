import React, { ReactElement } from 'react';

export type ProgressHeaderProps = {
    value: string;
};

export default function ProgressHeader({ value }: ProgressHeaderProps): ReactElement {
    return (
        <div className="tw-pl-1.5">
            <span className="tw-font-bold tw-text-black-100">{value}</span>{' '}
            <span className="tw-black-80">Completed</span>
        </div>
    );
}
