export const defaultKeyExtractor = <T extends { id: number | string }>(item: T) => item.id.toString()
