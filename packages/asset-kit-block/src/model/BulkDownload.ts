/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Annotation = {
    id: number;
    status: AnnotationStatus;
    comment_count: number;
    content: string;
    creator_id: number;
    creator_gravatar_hash: string;
    creator_image: string;
    creator_name: string;
    creator_role: string;
    created_localized_ago: string;
};

export enum AnnotationStatus {
    'Open' = 'OPEN',
    'Resolved' = 'RESOLVED',
    'All' = 'ALL',
}

export type AnnotationCount = {
    success: boolean;
    data?: {
        token: string;
    };
};
