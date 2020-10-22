'use strict'
const express = require('express')
const employe = require('../controllers/employeController')
const router = express.Router()

router.get(`/api/v1/employe`, employe.index)
router.post(`/api/v1/employe`, employe.store)
router.get(`/api/v1/employe/:id`, employe.show)
router.put(`/api/v1/employe/:id`, employe.update)
router.delete(`/api/v1/employe/:id`, employe.destroy)

module.exports = router