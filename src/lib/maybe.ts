import { Maybe } from "../index";

/**
 * 
 * Functors
 * 
 */

// export interface MaybeBe {
//     map:  fa -> (a -> b) -> fb
// }

export interface None {
    _: 'None'
}
export interface Some<A> {
    _: 'Just'
    value: A
}

export type Maybe<A> = None | Some<A>

export const Nothing: Maybe<never> = { _: 'None' }
 
export const Just = <A>(a: A): Maybe<A> => {
    return { _: 'Just', value: a }
}

export function isExist<A>(fa: Maybe<A>): fa is Some<A> {
    return fa._ === 'Just'
}

export function isNone<A>(fa: Maybe<A>): fa is None {
    return fa._ === 'None'
}

export function fold<A, B>(onNone: () => B, onSome: (a: A) => B): (ma: Maybe<A>) => B {
    return ma => (isNone(ma) ? onNone() : onSome(ma.value))
}

export function fromNullable<A>(a: A | null | undefined): Maybe<A> {
    return a == null ? Nothing : Just(a)
}


export function toNullable<A>(ma: Maybe<A>): A | null {
    return isNone(ma) ? null : ma.value
}

export const map = (fn) => {

}

Maybe.map((a) => ).