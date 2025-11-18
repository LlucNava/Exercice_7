import express from 'express';
const router = express.Router();

// import your "database simulator"
import { getUsers, getUserById, createUser, updateUser } from '../databases/db.js'
import { objectToCsv } from '../utils/utils.js'

/* GET /users */
router.get('/', function(req, res, next) {
    const data = getUsers()
    const format = req.accepts(['application/json', 'text/csv'])
    switch(format) {
        case 'text/csv':
            const csv = objectToCsv(data)
            res.type('text/csv').status(200).send(csv)
            break
        case 'application/json':
            res.status(200).json(data)
            break
        default:
            res.status(415).end() // Unsupported media type
    }    
})

/* GET /users/{id} */
router.get('/:id', function(req, res, next) {
    let id = Number(req.params.id)
    let result = getUserById( id )
    if (result) {
      res.status(200).json(result)      // 200 OK
    } else {
      res.status(404).end()             // 404 Not found
    }
})

/* POST a new data. */
router.post('/', (req, res, next) => {
    let newItem = req.body
    
    // Validation rules
    if (
        !newItem ||
        typeof newItem.forename !== 'string' ||
        typeof newItem.surname !== 'string' ||
        newItem.forename.trim() === '' ||
        newItem.surname.trim() === ''
    ) {
        return res.status(422).json({ error: 'Invalid input: both forename and surname must be non-empty strings.' });
    }

    const validItem = {
        forename: newItem.forename.trim(),
        surname: newItem.surname.trim()
    };

    try {
        if( createUser( validItem ))
            return res.status(200) // new data
        else 
            return res.status(201) // data updated 
    } catch( error ) {
        res.status(422) // Unprocessable Content
    }
})

/* put a new data. */
router.put('/:id', (req, res, next) => {
    let id = Number(req.params.id)
    let newItem = req.body
    
    // Validation rules
    if (
        !newItem ||
        typeof newItem.forename !== 'string' ||
        typeof newItem.surname !== 'string' ||
        newItem.forename.trim() === '' ||
        newItem.surname.trim() === ''
    ) {
        return res.status(422).json({ error: 'Invalid input: both forename and surname must be non-empty strings.' });
    }

    const validItem = {
        forename: newItem.forename.trim(),
        surname: newItem.surname.trim()
    };

    try {
        if( updateUser( id, validItem ))
            res.status(201).end()
        else
            res.status(200).end()
    } catch( error ) {
        res.status(422) // Unprocessable Content
    }
})

export default router