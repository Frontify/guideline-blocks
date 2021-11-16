import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';

type ChecklistProps = {
    appBridge: AppBridgeNative;
};

type ChecklistItem = {
    text: string;
};

type Settings = {
    content: ChecklistItem[];
    padding: string;
    incompleteTextColor: string;
    incompleteCheckboxColor: string;
    completeTextColor: string;
    completeCheckboxColor: string;
    completedDecoration: string;
    highlightColor: string;
    dateVisible: boolean;
    progressBarVisible: boolean;
    progressBarType: string;
    progressBarFillColor: string;
    progressBarTrackColor: string;
};

export default function AnExampleBlock({ appBridge }: ChecklistProps): ReactElement {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    return (
        <div>
            {Object.keys(blockSettings).map((val) => (
                <p>{val}</p>
            ))}
        </div>
    );
}
