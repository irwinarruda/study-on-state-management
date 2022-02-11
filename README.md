# Study on State Management

Once you start creating large scale applications, you quickly learn that managing state gets messy and it doesn’t scale well. You can actualy use React Context Api, but for complex UI logic that can cause some performance issues.

Because of that, I wanted to learn about every state management project out there. That’s why I created this repository, the idea is to see how different state management libraries handle the same use case. I also wanted to check if it was possible to make every single of the libraries generic so that swapping between them doesn’t break any code.

Keep in mind that the project is not finished. It turns out that there are a lot of state management attempts. My idea is to keep adding projects to this repository.
<p align="center">
    <img width="600px" src="https://user-images.githubusercontent.com/68255804/153518392-dc5e94a2-aadf-4e24-942c-abbc2fdf088f.gif" />
</p>

## Context

[React Context Api](<[https://pt-br.reactjs.org/docs/context.html](https://pt-br.reactjs.org/docs/context.html)>) is built in to React and it’s good for a lot of applications. But when the application grows and starts to have complex business logic, it can cause performance problems with rendering since every state change would re-render every component that uses that context.

The **"Context API way"** of creating a state management system is the most connected to some React concepts like hooks. Because of that, I decided to use this as a baseline of what a generic state manager should look like. So I tried to transform all the other solutions into the **"Context API way"**.

## Context Selector

Context Selector is an idea that has been thought out to be [implemented in a future release of React](https://github.com/reactwg/react-18/discussions/84). So if we want to use this API before it is released, we can rely on [use-context-selector](https://github.com/dai-shi/use-context-selector). The selectors technically solve the performance issues since you are always selecting the components you want to use. The downside is that you always have to select the right data and create new hooks. Because of that Context Selector can be confusing. The way I implemented it is as follows.

The selectors are stored in an object like this.

```tsx
type UsePersonReturn = {
    people: Person[];
    selectedPerson: Person | null;
    addPerson: (person: Person) => void;
    selectPerson: (person: Person) => void;
};

const neededStates = {
    selectForm: ['addPerson'],
    selectList: ['people', 'selectPerson'],
    selectView: ['selectedPerson'],
} as const;

type NeededStatesKeys = keyof typeof neededStates;
```

Because of that, we only need one hook.

```tsx
const usePersonContext = <T extends NeededStatesKeys>(key: T) => {
    const hooks = useContextSelector(
        PersonsContext,
        genericSelector(neededStates[key] as any),
        shallowEqual,
    ) as Pick<UsePersonReturn, typeof neededStates[T][number]>;
    return hooks;
};
```

The way to use this hook would be to pass the selector string as argument.

```tsx
const { addPerson } = usePersonContext('selectForm');
```

This might not be the prettiest or the cleanest solution. But it's the most generic I could make because if you want to change the `usePersonContext` implementation, you would not have to change every single component that uses it, you would only have to ignore the key prop like this.

```tsx
const usePersonContext = (key?: string) => {
    // DO NOTHING WITH key;
    const hooks = {
        // Make another implementation.
    };
    return hooks;
};
```

This would leave unused code but wouldn't break anything.

## MobX

Out of all the solutions, this was by far the easiest to work with. You only create a simple class and that's it, you have a state management system in your app. [MobX](https://mobx.js.org/README.html) uses Proxy to manage data, so it can be integrated with any other javascript framework. It's as generic as possible. Not only that but it's integration with the **"Context API way"** is seemingless.

```tsx
class RootStore {
    private static instance: RootStore;
    public people: Person[];
    public selectedPerson: Person;
    constructor() {
        this.people = INITIAL_STATE.people;
        this.selectedPerson = INITIAL_STATE.selectedPerson;
        makeAutoObservable(this);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new RootStore();
        }
        return this.instance;
    }

    public addPerson(person: Person) {
        this.people.push(person);
    }

    public selectPerson(person: Person) {
        this.selectedPerson = { ...person };
    }
}

const usePersonContext = () => {
    const store = RootStore.getInstance();
    return store;
};
```

## MobX-State-Tree

[MobX-State-Tree](https://mobx-state-tree.js.org/intro/welcome) implements MobX in a structured way. Because of the defined structured, some features like tree snapshot or runtime type checking can be implemented and are great for scalability.

## Redux

[Redux](https://redux.js.org/introduction/getting-started) is one of the oldest state management libraries for React. Because of that, Redux has the biggest ecosystem arround it. Not only that but the Redux DevTolls is one of the best tools for debugging front-end applications that I've ever seen. It's not all good tho. Redux is one of the most dificult solutions to learn even with it's new Redux-Toolkit implementation.

Since it works with selectors, the best way I found to make it generic is as follows.

```tsx
const peopleSlice = createSlice({
    name: 'person',
    initialState: INITIAL_STATE,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            state.people.push(action.payload);
        },
        selectPerson: (state, action: PayloadAction<Person>) => {
            state.selectedPerson = { ...action.payload };
        },
    },
});

const store = configureStore({
    reducer: peopleSlice.reducer,
});
```

Now we can create a generic hook the same way we did with **Context Selector**.

```tsx
type UsePersonReturn = {
    people: Person[];
    selectedPerson: Person | null;
};

const neededStates = {
    none: [],
    selectList: ['people'],
    selectView: ['selectedPerson'],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

const usePersonContext = <T extends NeededStatesKeys = 'none'>(
    key = 'none' as T,
): Pick<UsePersonReturn, typeof neededStates[T][number]> & {
    addPerson(person: Person): void;
    selectPerson(person: Person): void;
} => {
    const hooks = useReduxSelector(
        genericSelector(neededStates[key] as any),
        shallowEqual,
    ) as Pick<UsePersonReturn, typeof neededStates[T][number]>;
    const dispatch = useAppDispatch();
    const addPerson = React.useCallback(
        (person: Person) => {
            dispatch(peopleSlice.actions.addPerson(person));
        },
        [dispatch],
    );
    const selectPerson = React.useCallback(
        (person: Person) => {
            dispatch(peopleSlice.actions.selectPerson(person));
        },
        [dispatch],
    );
    return { ...hooks, addPerson, selectPerson };
};
```

---
