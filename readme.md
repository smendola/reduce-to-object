reduceToObject
==============

Reduce an `Array` to an `Object` using a mapping function that maps each element of the array to a `{key: value}` pair.
The result of the operation is an object coalescing all these key/value pairs.

This utility is intended for use in situation where there is some uniquely identifying property (which might be computed) for each element of the source array. For example, an array of objects where each object has an "id" property that is unique. `reduceToObject` does not handle cases where multiple entries in the array map to the same key in the result; there are other utilities out there to handle those cases.  The advantage of `reduceToObject` in the case of unique mappings is that the results are `{key: value}` rather than `{key:[value]}`.

If two or more elements of the input array map to the same key, the last-mapped value (highest-indexed in the array) wins.

As an alternative to a mapping function, when reducing an array of objects you may give the name of a "key" property, and the name of a "value" property. This is analogous to things like `_.map(arr, 'prop')`, and `_.pick('foo', 'bar")`.

`reduceToObject` is not limited to picking properties out of objects, however. It allows both the keys and the values, in the resulting map, to be computed.

This method is meant to be mixed into lodash or underscore, however, it can be used by itself, and it does not introduce a dependency into either lodash or underscore.

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
_.mix({ reduceToObject: require('reduce-to-object') });
_.reduceToObject(myArr, 'foo', 'bar');
```

Examples
--------
First example. Let's say you have an array of User objects, looking something like this:
```javascript
const users = [
    { id: 1, username: 'jdoe', fullName: "John Doe", ...otherstuff...},
    { id: 2, username: 'ewillis', fullName: "Eric Eillis", ...otherstuff...},
];
```
And let's assume that `username` is unique in that array.

Let's say you want to produce a map of `username:fullname` pairs.  Following are three equivalent ways to do it:
```javascript
map = reduceToObject(users, (u) => ( { [u.username]: u.fullName }) );
map = reduceToObject(users, (u) => [u.username, u.fullName]);
map = reduceToObject(users, 'username', 'fullName');
```
The above is the simplest possible example, whre the mapping function does no computation at all, it just extracts fields from the items it processes, and for that, the (`arr`, `keyprop`, `valueprop`) call signature is the way to go; no mapping "function" per se is needed.

In the next example, some computation needs to be done, so a mapping funcion does need to be used.   _Both_ the key and the value of the mapping are computed.

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
