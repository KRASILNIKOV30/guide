function deepClone <T> (source: T): { [k: string]: any } {
    const results: { [k: string]: any } = Array.isArray(source) ? [] : {};
    for (const P in source) {
        if (typeof source[P] === 'object') {
            results[P] = deepClone(source[P]);
        }
        else {
            results[P] = source[P];
        }
    }

    return results;
}

export { deepClone }