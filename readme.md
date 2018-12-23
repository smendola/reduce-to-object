reduceToObject
==============

Reduce an `Array` to an `Object` using a mapping function that maps each element of the array to a `{key: value}` pair.
The result of the operation is an object coalescing all these key/value pairs.

This utility is intended for use in situation where there is some uniquely identifying property (which might be computed) for each element of the source array. For example, an array of objects where each object has an "id" property that is unique. `reduceToObject` does not support cases where multiple entries in the array map to the same key in the result; there are other utilities out there to handle those cases.  The advantage of `reduceToObject` in the case of unique mappings is that the results are `{key: value}` rather than `{key:[value]}`.

This is done by way of a "mapping function" that is iterated over each element of the array, and is expected to return a single name/value pair represeting that element in the final result. The final result is an object combining all the pairs produced in this way.

The mapping function must return a single such pair (if at all). Behavior is undefined if the mapping function returns more than that.

The mapping function _may_ return an empty object, or `undefined`, in which case the source element in the array will be "skipped", and not be represented in the reduced result.

If two or more elements of the input array map to the same key, the last-mapped value (highest-indexed in the array) wins.

As an alternative to a mapping function, when reducing an array of objects you may give the name of a "key" property, and the name of a "value" property to be found in the objects. This is analogous to things like `_.map(arr, 'prop')`, and `_.pick('foo', 'bar")` in underscore/lodash.

`reduceToObject` is not limited to picking properties out of objects, however. It allows either or both the keys and the values, in the resulting map, to be computed.

This method is meant to be mixed into lodash or underscore; however, it can be used by itself, and it does not introduce a dependency into either lodash or underscore.

Install
-------
```
$ npm install reduce-to-object
```

Import
------
```javascript
const reduceToObject = require('reduce-to-object');
const res = reduceToObject(myArray, 'foo', 'bar')
```

Mix into lodash / underscore
----------------------------
If desired:
```javascript
_.mixin({ reduceToObject: require('reduce-to-object') });
_.reduceToObject(myArr, 'foo', 'bar');
```

Examples
--------
First example. Let's say you have an array of User objects, each with a unique `username`; something like this:
```javascript
const users = [
    { id: 1, username: 'jdoe', fullName: "John Doe", ...otherstuff...},
    { id: 2, username: 'ewillis', fullName: "Eric Willis", ...otherstuff...},
];
```

Let's say you want to produce a map of `username:fullname` pairs, like this:
```javascript
{
    jdoe: "John Doe",
    ewillis: "Eric Willis"
}
```

Following are three equivalent ways to do it:
```javascript
map = reduceToObject(users, (u) => ( { [u.username]: u.fullName }) );
map = reduceToObject(users, (u) => [u.username, u.fullName]);
map = reduceToObject(users, 'username', 'fullName');
```
The above is the simplest possible example, where the mapping function does no computation at all, it simply extracts fields from the items it processes. For that, the (`arr`, `keyprop`, `valueprop`) call signature is the way to go; no mapping "function" per se is needed.

In the next example, some computation needs to be done, so a mapping funcion does need to be used. _Both_ the key and the value of the mapping are computed.

```javascript
hashMap = reduceToObject(documents, (doc) => {
    const
        docHash = hash256(doc.body);
        docInfo = { id: doc.id, title: doc.title }
    return { [docHash]: docInfo };
});
```
The above creates a mapping from the hash of a document's content to the id and title of the document.

To Do
-----
Ability to mix this into Backbone.Collection as well.
