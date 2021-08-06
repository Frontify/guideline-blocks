import { ReactElement } from 'react';

export default function Empty(props: { editingEnabled: boolean }): ReactElement {
    return <>{props.editingEnabled ? 'Empty. Please add colors.' : ''}</>;
}
