export const queryKeys = {
  user: {
    all: () => ['user'] as const,
    me: () => ['user', 'me'] as const,
  },
};

type TQueryKeyFactory = typeof queryKeys;

type TKeyOf<T> = T extends (...args: never[]) => infer TKey ? TKey : never;

export type TQueryKey = {
  [Domain in keyof TQueryKeyFactory]: TKeyOf<
    TQueryKeyFactory[Domain][keyof TQueryKeyFactory[Domain]]
  >;
}[keyof TQueryKeyFactory];
