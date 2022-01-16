const genericSelector = <T extends any>(ctx: T, keys: readonly (keyof T)[]) => {
    const obj = {} as any;
    keys.forEach((key) => {
        obj[key] = ctx[key];
    });
    return obj;
};

export { genericSelector };
