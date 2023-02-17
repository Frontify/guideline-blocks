export const convertToNumber = (value: string) => {
    return +value.replace(/px|%/, '');
};
