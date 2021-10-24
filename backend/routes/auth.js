const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    let obj = {
        a: 'this',
        number: 2
    }
    res.json(obj)
})

module.exports = router