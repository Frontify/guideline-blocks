import { ReactElement } from 'react';

export default function Empty(props: { editingEnabled: boolean }): ReactElement {
    return <div>{props.editingEnabled ? 'Empty. Please add colors.' : 'Empty'}</div>;
}
