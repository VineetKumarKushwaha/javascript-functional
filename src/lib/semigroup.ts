import { Ord, min, max} from "./ordering";

/*
A semigroup is a pair (A, *) in which A is a non-empty set and * is a binary associative operation on A,
i.e. a function that takes two elements of A as input and returns an element of A as output

*: (x: A, y: A) => A
*/


export interface Semigroup<A> {
    concat: (x: A, y: A) => A
}

// Law:-

/**
 * Associativity
 */

export const semigroupSum: Semigroup<number> = {
    concat: (x, y) => x + y
}

export const semigroupProduct: Semigroup<number> = {
    concat: (x, y) => x * y
}

export const semigroupString: Semigroup<string> = {
    concat: (x, y) => x + y
}

export const semigroupArray: Semigroup<string> = {
    concat: (x, y) => x.concat(y)
}

export function getFirstSemigroup<A>(): Semigroup<A> {
    return { concat: (a) => a }
}

export function getLastSemigroup<A = never>(): Semigroup<A> {
    return { concat: (_, y) => y }
}
  
export function getMinThroughSemigroup<A>(O: Ord<A>): Semigroup<A> {
    return {
      concat: min(O)
    }
}
  
export function getMaxThroughSemigroup<A>(O: Ord<A>): Semigroup<A> {
    return {
        concat: max(O)
    }
}

export function getObjectSemigroup<A extends object>(): Semigroup<A> {
    return {
      concat: (x, y) => Object.assign({}, x, y)
    }
}
  

//Combinator pattern
/*
    there is some type T,
    some "primitive" values of type T,
    and some "combinators" which can combine values of type T in various ways to build up more complex values of type T
*/
function fromConcat<T>(concat: (x: T, y: T) => T): Semigroup<T> {
    return {
        concat: (x: T, y: T) => concat(x, y)
    }
}

export const getSemiGroupFromObject = <T extends {[key: string]: any}>(obj: { [key in keyof T]: Semigroup<T[key]>}): Semigroup<T> => {
    return fromConcat((x: T, y: T) => {
        const r: any = {}
        for (const key of Object.keys(obj)) {
            r[key] = obj[key].concat(x[key], y[key])
        }
        return r
    })
}

export const getFunctionSemigroup = <S>(S: Semigroup<S>): Semigroup<(a: any) => S> => {
    return ({
        concat: (f, g) => a => S.concat(f(a), g(a))
    })
}

export const semigroupAny: Semigroup<boolean> = {
    concat: (x, y) => x || y
}

export const semigroupAll: Semigroup<boolean> = {
    concat: (x, y) => x && y
}

export const fold = <A>(S: Semigroup<A>): ((a: A, as: Array<A>) => A) => {
    return (a, as) => as.reduce(S.concat, a)
}


// Maybe
/**
 *  Nothing Nothing -> Nothing
 *  Nothing Just(10) -> Nothing
 *  Just(20) Nothing -> Nothing
 *  Just(20) Just(30) -> what would be the value
 */