// run command: node -test
import { describe, test, before } from 'node:test';
import assert from 'node:assert/strict';

// adjust the import paths to your project structure
import { objectToCsv} from '../routes/utils.js';
import { isCSV } from './helpers.js'; 
import { getUsers } from '../routes/db.js';

describe('Unit test - objectToCsv method', () => {
  test('Test utils.objectToCsv method', () => {
    const testData = [
      { id: 1, forename: 'Roy',  surname: 'Fielding' },
      { id: 2, forename: 'Tim',  surname: 'Berners-Lee' }
    ];

    const csvData = objectToCsv(testData);
    assert.ok(isCSV(csvData)); //If value is falsy (false, 0, '', null, undefined, NaN), it throws an AssertionError.
  });
});

describe('Unit test - getUsers method', () => {
  let data;

  before(() => {
    data = getUsers();
  });

  test('returns array', () => {
    assert.ok(Array.isArray(data)); //Array.isArray returns true if data is an actual array ([]),
  });

  test('elements have correct keys', () => {
    for (const user of data) {
      assert.equal(typeof user, 'object'); //typeof user returns a string describing the variable’s type.
      assert.notEqual(user, null); //This ensures user is not null.
      assert.ok(Object.hasOwn(user, 'id')); //Object.hasOwn(obj, prop) returns true if the object directly defines the property
      assert.ok(Object.hasOwn(user, 'forename'));
      assert.ok(Object.hasOwn(user, 'surname'));
    }
  });

  test('ids are numbers', () => {
    for (const user of data) {
      assert.equal(typeof user.id, 'number');
    }
  });
});

describe('getUsers + objectToCsv', () => {
  test('produces valid CSV', async () => {
    const data = await getUsers();
    const csvData = objectToCsv(data);
    assert.ok(isCSV(csvData));
  });
});     
