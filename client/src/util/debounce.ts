export function debounce<T extends Function>(cb: T, wait: number) {
    var h : NodeJS.Timeout;
    let callable = (...args: any) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return callable;
}