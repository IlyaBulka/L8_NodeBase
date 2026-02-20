
export function sortIgnoringSpaces(arr) {
    return [...arr].sort((a, b) => {
        const aClean = a.replace(/\s+/g, '');
        const bClean = b.replace(/\s+/g, '');
        if (aClean < bClean) return -1;
        if (aClean > bClean) return 1;
        return 0;
    });
}