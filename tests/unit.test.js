import {objectToCsv} from '../utils/utils.js'
import {getUsers} from '../databases/db.js'
import { isCSV } from './helpers.js'; 

describe('Unit test - objectToCsv method', () => {
    test('Test utils.objectToCsv method', () => {
        let testData = [
            {
            "id": 1,
            "forename": "Roy",
            "surname": "Fielding"
            },
            {
            "id": 2,
            "forename": "Tim",
            "surname": "Berners-Lee"
            }
        ]

        const csvData = objectToCsv(testData)
        expect(isCSV(csvData)).toBe(true);
    });
});

describe('Unit test - getUsers method', () => {
    let data = getUsers();
    
    test('Test db.getUsers method returns value in JSON format', () => {
        expect(Array.isArray(data)).toBe(true);;       
    });

    test('each element should be an object with correct keys', () => {
        for (const user of data) {
            expect(typeof user).toBe('object');
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('forename');
            expect(user).toHaveProperty('surname');
        }
    });

    test('user ids should be numbers', () => {
        for (const user of data) {
            expect(typeof user.id).toBe('number');
        }
    });
});

describe('Unit test - getUsers together with objectToCsv method', () => {
    test('Test utils.objectToCsv method', () => {
        const data = getUsers()
        const csvData = objectToCsv(data)
        expect(isCSV(csvData)).toBe(true);
    });
});