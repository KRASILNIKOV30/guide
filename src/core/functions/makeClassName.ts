export function makeClassName(baseName: string, mods: Record<string, (string|boolean)>): string {
    const arr = [baseName]
    Object.keys(mods).forEach(mod => {
        const value = mods[mod]
        if (typeof value == 'string') {
            arr.push(`${baseName}--${mod}--${value}`)
        }
        else if (typeof value == 'boolean' && value) {
            arr.push(`${baseName}--${mod}`)
        }
    })
    return arr.join(' ')
}