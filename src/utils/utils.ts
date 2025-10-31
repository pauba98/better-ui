export const mergeClasses = (classes: (string | undefined | null)[]) => {
    return classes.filter(c => Boolean(c)).join(' ')
}