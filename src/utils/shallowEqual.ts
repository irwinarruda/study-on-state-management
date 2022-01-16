/**
 * Shallow compare based on React's https://github.com/facebook/react/blob/v16.8.6/packages/shared/shallowEqual.js
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;

function shallowEqual(objA: any, objB: any): boolean {
    if (Object.is(objA, objB)) {
        return true;
    }

    if (
        typeof objA !== "object" ||
        objA === null ||
        typeof objB !== "object" ||
        objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !Object.is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false;
        }
    }

    return true;
}

export { shallowEqual };
