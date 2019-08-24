// Setoid
// Taken from haskell http://hackage.haskell.org/package/base-4.12.0.0/docs/Data-Eq.html

export interface Equality<T> {
    isEqual: (x: T, y: T) => boolean
}

/*
Defintion:-


Rules:-
    Reflexivity
        x == x = True
    Symmetry
        x == y = y == x
    Transitivity
        if x == y && y == z = True, then x == z = True

*/

const equal = <T>(a: T, b: T): boolean =>  {
    return a === b
}

export const stringEquality: Equality<string> = { isEqual: equal }
export const numberEquality: Equality<number> = { isEqual: equal }
export const booleanEquality: Equality<boolean> = { isEqual: equal }


//Combinator pattern
/*
    there is some type T,
    some "primitive" values of type T,
    and some "combinators" which can combine values of type T in various ways to build up more complex values of type T
*/
function doMultipleEqualityCheck<T>(equals: (x: T, y: T) => boolean): Equality<T> {
    return {
        isEqual: (x: T, y: T) => equals(x, y)
    }
}

export const equalityCombinator = <T extends {[key: string]: any}>(obj: { [key in keyof T]: Equality<T[key]>}): Equality<T> => {
    return doMultipleEqualityCheck((x: T, y: T) => Object.keys(obj).every(k => obj[k].isEqual(x[k], y[k])))
}


// const vectorEquality = equalityCombinator({
//     x: numberEquality,
//     y: numberEquality
// })

// vectorEquality.isEqual({x: 238, y: 324}, {x: 394, y: 342432})



export const contraMap = <A, B>(f: (a: A) => B, fa: Equality<B>) =>
    doMultipleEqualityCheck((x: A, y: A) =>
        fa.isEqual(f(x), f(y)))


// type User = {
//     userId: number
//     name: string
// }

// const eqUser = contraMap((user: User) => user.userId, numberEquality)

// eqUser.isEqual({ userId: 324324, name: ""}, { userId: 324324, name: "" })
// TODO: need to implement contravariant functor
// export contraMap = (fa, f) => (x, y) => fa.equals(f(x), f(y))
// Make it Contravariant
// contramap
// will do with functors.

// export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any


// export interface URItoKind<A> {}
// export type URIS = keyof URItoKind<any>


  
//   export interface Contravariant1<F extends URIS> {
//     readonly URI: F
//     readonly contramap: <A, B>(fa: Kind<F, A>, f: (b: B) => A) => Kind<F, B>
//   }
  
  
// export const URI = 'Eq'

// export type URI = typeof URI
// export const eq: Contravariant1<URI> = {
//     URI,
//     contramap: (fa, f) => fromEquals((x, y) => fa.equals(f(x), f(y)))
//   }

// contramap: (fa, f) => fromEquals((x, y) => fa.equals(f(x), f(y)))
