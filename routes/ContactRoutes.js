const express = require('express');
const router = express.Router();
//const getContact = require("../controllers/contactController");

const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");

router.route("/").get(getContacts).post(createContact);

// router.route("/:id").get(getContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
// 

module.exports = router;
