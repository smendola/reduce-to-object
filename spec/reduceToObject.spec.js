const
  _ = require('lodash'),
  reduceToObject = require('./..');

describe('reduceToObject', () => {
    const
        arr = [
            { uid: 1, un: 'joe', fn: 'Joe B.' },
            { uid: 2, un: 'bob', fn: 'Robert R.' }
        ];

    it('reduces an array to object', () => {
        const obj = reduceToObject(arr, (u) => ({ [u.un]: u.fn }));
        expect(obj).toEqual({
            joe: 'Joe B.',
            bob: 'Robert R.'
        });
    });

    it('can skip elememts', () => {
        const
            obj = reduceToObject(arr, (u) => {
                if (u.uid > 1) {
                    return {};
                }
                return { [u.un]: u.fn };
            });
        expect(obj).toEqual({ joe: 'Joe B.' });
    });

    it('treats undefined as skip', () => {
        const
            // eslint-disable-next-line consistent-return
            obj = reduceToObject(arr, (u) => {
                if (u.uid < 2) {
                    return { [u.un]: u.fn };
                }
            });
        expect(obj).toEqual({ joe: 'Joe B.' });
    });

    it('supports [name, value] style mapper function return', () => {
        const obj = reduceToObject(arr, (u) => ([u.un, u.fn]));
        expect(obj).toEqual({
            joe: 'Joe B.',
            bob: 'Robert R.'
        });
    });

    it('supports "nameProp", "valueProp" as mapper', () => {
        const obj = reduceToObject(arr, 'un', 'fn');
        expect(obj).toEqual({
            joe: 'Joe B.',
            bob: 'Robert R.'
        });
    });

    it('last dupe wins', () => {
        const
            dupes = [].concat(arr, { uid: 3, un: 'joe', fn: 'Winner' }),
            obj = reduceToObject(dupes, (u) => {
                return { [u.un]: u.fn };
            });
        expect(obj).toEqual({
            joe: 'Winner',
            bob: 'Robert R.'
        });
    });

    it('can extend underscore', () => {
        _.mixin({reduceToObject});
        const res = _.reduceToObject([1, 2], (n) => [`a${n}`, n]);
        expect(res).toEqual({ a1: 1, a2: 2 });
    });
});
