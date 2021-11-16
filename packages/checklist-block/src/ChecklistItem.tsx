import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { IconCaretDown, IconCaretUp, IconSize } from '@frontify/arcade';
import RemoveButton from './RemoveButton';
import MockTextEditor from './MockTextEditor';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';

type ChecklistItemProps = {
    text: string;
    createdAt?: string;
    updatedAt?: string;
    completed: boolean;
    textColor: string;
    checkboxColor: string;
    readonly: boolean;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
    onRemove: () => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
};

export default function ChecklistItem({
    text,
    completed,
    readonly,
    onChange,
    onBlur,
    onRemove,
    onIncrement,
    onDecrement,
}: ChecklistItemProps): ReactElement {
    return (
        <div className="tw-flex">
            <div className="tw-flex-auto">
                <MockTextEditor
                    readonly={readonly}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={text}
                    placeholder="Add new checklist item"
                />
            </div>
            <div className="tw-flex-none tw-flex">
                <IncrementButton onClick={onIncrement} />
                <DecrementButton onClick={onDecrement} />
                <RemoveButton onClick={onRemove} />
            </div>
        </div>
    );
}
