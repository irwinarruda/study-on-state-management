const genericSelector = <T extends string>(keys: T[]) => {
    return (ctx: Record<T, any>) => {
        const obj = {} as any;
        keys.forEach((key) => {
            obj[key] = ctx[key];
        });
        return obj;
    };
};

export { genericSelector };
