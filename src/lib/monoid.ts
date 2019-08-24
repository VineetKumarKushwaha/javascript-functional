import { Semigroup, getSemiGroupFromObject, fold as semigroupFold, getFunctionSemigroup } from './semigroup';


/**
 * 
 * A Monoid is any Semigroup that happens to have a special value which is "neutral" with respect to concat
 */

export interface Monoid<A> extends Semigroup<A> {
    identity: A
}

/**
 *  Law:-
 *  Associativity
 *  Right identity: concat(x, empty) = x, for all x in A
 *  Left identity: concat(empty, x) = x, for all x in A
*/

export const monoidSum: Monoid<number> = {
    concat: (x, y) => x + y,
    identity: 0
}


export const monoidProduct: Monoid<number> = {
    concat: (x, y) => x * y,
    identity: 1
}

export const monoidString: Monoid<string> = {
    concat: (x, y) => x + y,
    identity: ""
}

export const monoidAll: Monoid<boolean> = {
    concat: (x, y) => x && y,
    identity: true
}

export const monoidAny: Monoid<boolean> = {
    concat: (x, y) => x || y,
    identity: false
}


/**
 * 
 * All semigroup are not Monoids
 * const semigroupSpace: Semigroup<string> = {
        concat: (x, y) => x + ' ' + y
    }
    We can't find an empty value such that concat(x, empty) = x.
 */

 //Combinator pattern
/*
    there is some type T,
    some "primitive" values of type T,
    and some "combinators" which can combine values of type T in various ways to build up more complex values of type T
*/

export const getMonoidFromObject = <T extends {[key: string]: any}>(obj: { [key in keyof T]: Monoid<T[key]>}): Monoid<T> => {
    const empty: any = {}
    for (const key of Object.keys(obj)) {
        empty[key] = obj[key].identity
    }
    return {
        concat: getSemiGroupFromObject(obj).concat,
        identity: empty
    }
}

export const fold = <T>(mon: Monoid<T>) : ((as: Array<T>) => T) => {
    return (as) => semigroupFold(mon)(mon.identity, as);
}

export const getFunctionMonoid = <M>(mon: Monoid<M>): Monoid<(a: any) => M> => {
    return ({
      concat: getFunctionSemigroup(mon).concat,
      identity: () => mon.identity
    })
  }
  
//   type Point = {
//     x: number
//     y: number
//   }
// const isPositiveX = (p: Point): boolean => p.x >= 0
// const isPositiveY = (p: Point): boolean => p.y >= 0

// const t: Monoid<(p: Point) => boolean> = getFunctionMonoid(monoidAll)

// t.concat(isPositiveX, isPositiveY)

export interface Endomorphism<A> {
    (a: A): A
}

export function identity<A>(a: A): A {
    return a
}
export const getEndomorphismMonoid = <A>(a: A): Monoid<Endomorphism<A>> => {
    return {
      concat: (x, y) => a => x(y(a)), //compose
      identity: identity
    }
}
  