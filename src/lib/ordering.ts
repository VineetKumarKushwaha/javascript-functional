import { Equality } from "./equality";


// http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Ord.html
/*
    Haskell implementation has LQ, GT, EQ 
*/

type Ordering = 0 | 1 | -1;

export interface Ord<A> extends Equality<A> {
    compare: (x: A, y: A) => Ordering
    min: (x: A, y: A) => A,
    max: (x: A, y: A) => A
}

/*
    1) Reflexivity
    2) Antisymmetry
    3) Transitivity 

*/

const compare = <A>(x: A, y: A): Ordering => (x < y ? -1 : x > y ? 1 : 0)

export const numberOrd: Ord<number> = {
    isEqual: (x: number, y: number) => x === y,
    compare: (x: number, y: number) => compare(x, y),
    min: (x: number, y: number) => Math.min(x, y),
    max: (x: number, y: number) => Math.max(x, y)
};

export const stringOrd: Ord<string> = {
    isEqual: (x: string, y: string) => x === y,
    compare: (x: string, y: string) => compare(x.toLowerCase(), y.toLowerCase()),
    min: (x: string, y: string) => compare(x.toLowerCase(), y.toLowerCase()) ? x: y,
    max: (x: string, y: string) => compare(x.toLowerCase(), y.toLowerCase()) ? y: x
};

export const booleanOrd: Ord<boolean> = {
    isEqual: (x: boolean, y: boolean) => x === y,
    compare: (x: boolean, y: boolean) => compare(x, y),
    max: _ => true,
    min: _ => false
}

/** Combinator pattern */

export const min = <T>(ord: Ord<T>) => (x: T, y: T): T => ord.compare(x, y) === -1 ? x : y;
export const max = <T>(ord: Ord<T>) => (x: T, y: T): T => ord.compare(x, y) === -1 ? y : x;

function fnOrdering<T>(compare: (x: T, y: T) => Ordering): Ord<T> {
    return {
        min: (x: T, y: T): T => compare(x, y) === -1 ? x : y,
        max: (x: T, y: T): T => compare(x, y) === -1 ? y : x,
        isEqual: (x: T, y: T) => compare(x, y) === 0, 
        compare: (x: T, y: T) => compare(x, y)
    }
}

export const contraMap = <A, B>(f: (a: A) => B, fa: Ord<B>) =>
    fnOrdering((x: A, y: A) =>
        fa.compare(f(x), f(y)));

export const between = <A>(O: Ord<A>) => (low: A, high: A) => (x: A): boolean =>
    !(O.compare(low, x) === -1 || O.compare(high, x) === 1);

export const clamp = <A>(O: Ord<A>) => (low: A, high: A) => (x: A) : A => O.max(O.min(x, high), low);


/*
   getDualOrd reverse the sequence
*/
