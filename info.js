// Setiod
// When manipulating collections of objects in the real world, we often use lists/arrays.
// Sometimes we need to represent some properties of the relation between the elements though, and the lists do not provide such possibility.
// This library not only provides the guarantee that a setoid is correct by construction, but also that the manipulations will not change its structure.
// Implements Equivalence relations between types
//Partial Ordered Set
/*
    1) Reflexitivity:- a <= a
    2) Antisymmetry:- a <=b & b <=a it implies a should be equal to b.
    3) Transitivity:- a <= b && b <= c the a <= c
*/
//Totally Ordered Set
/*
    1) Should be partial order set
    2) comparability:= Either a <= b or b <= a for any a, cb belongs to S.
*/
// The Ord Class
//The default declarations allow a user to create an Ord instance either with a type-specific compare function or with type-specific == and <= functions.
// Should implement compare function or equal and less than equal
// var Equality = {
// //  isEqual:: (a: A, b: A) -> Boolean
//     isEqual: (a, b) => a === b
// or
//     notEqual: (a, b) => a !== b 
// };
// var Ordering = {
//     isLte: (a, b) => a < b
// }
interface Equality<A> {
    isEqual: (a: A, b: A) => boolean
}

type Ordering =  EQ | LT | GT;
interface Ord<A> extends Equality {
    compare: (a: A, b: A) => Ordering
    min: (a: A, b: A) => A
    max: (a: A, b: A) => A
}


type comparing(instance of ord -> B) = ((a: A) -> B, b: A, c: A) => Ordering
comparing = (fn: (a: A, b: A) -> Ord a , x, y) => compare fn(x) fn(y) -- good to have
// A Haskell implementation of setoid - a set equipped with an equivalence relation.
// Setoid is a useful data structure when equivalence is chosen not to be equality.
// This allows to influence the membership of the elements in a setoid.
// Setoid is type --- data Setoid e a
// class EquivalenceBy e a where Source#
// Equivalence class. It reduces the data to the part which is then being tested for equality in a Setoid.
// In mathematics, a setoid (X, ~) is a set (or type) X equipped with an equivalence relation ~. A Setoid may also be called E-set, Bishop set, or extensional set.[1]

// A semigroup is a pair (A, *) in which A is a non-empty set and * is a binary associative operation on A, i.e. a function that takes two elements of A as input and returns an element of A as output
// (x * y) * z = x * (y * z)

interface Semigroup<A> {
    concat: (x: A, y: A) => A
}
// concatenation"
// "merging"
// "fusion"
// "selection"
// "addition"
// "substitution"