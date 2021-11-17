export type Rule<T> = {
    errorMessage: string;
    validate: (value: T) => boolean;
};
