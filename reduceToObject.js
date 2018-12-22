/**
 * Reduce an Array to an Object using a mapping function
 * that maps each element of the array to a {key:value} pair.
 * The result of the operation is an object coalescing all these key/value pairs.
 * If two or more elements of the input array map to the same key, the last-mapped
 * value (highest-indexed in the array) wins.
 *
 * As an alternative to a mapping function, when reducing an array of objects, or a
 * Backbone collection, you may give the name of a 'name' prop, and the name of a 'value'
 * prop. This is analogous to things like _.map(arr, 'prop'), myColl.map('prop'), and
 * myColl.pick('foo', 'bar")
 *
 * This method is meant to be mixed into underscore.
 *
 * @param {Array} arr The array to be reduced
 * @param {function} mapper A mapping function, which accepts an element of the array, and returns an object.
 *                  The returned object should contain a single property/value.
 *                  - Returning an empty object is OK; it means this element is not represented in the final result.
 *                  - Returning nothing (i.e. undefined) is also OK and has the same effect as empty object.
 *                  - Returning an object with multiple properties is considered "misbehavior", but this
 *                    is not trapped. Result is unspecified; you take your chances.
 *                  Alternatively, instead of {[name]: value}, the mapper can return [name, value];
 *                  (more or less necessary in pre-ES6 environments)
 *
 * @returns {Object} The mapped results
 *
 * @example reduceToObject(users, u => ( {[u.login}: u.name} ))
 * @example reduceToObject(users, u => ( [u.login, u.name] ))
 * @example reduceToObject(users, 'login', 'name')
 */
function reduceToObject (arr, mapper, valProp = undefined) {
    if (typeof mapper === 'string') {
        const nameProp = mapper;
        return reduceToObject(arr, item => [item[nameProp], item[valProp]]);
    }
    return arr.reduce((acc, item, idx) => {
        let mapped = mapper(item, idx);

        if (Array.isArray(mapped)) {
            const [k, v] = mapped;
            mapped = { [k]: v };
        }

        return Object.assign({}, acc, mapped);
    }, {});
}

module.exports = reduceToObject;
