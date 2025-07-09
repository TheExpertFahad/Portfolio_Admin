const express = require('express');
const { GetEducationById, GetAllEducation } = require('../../Controller/AdminController/EducationController');
const { GetAllTestimonial } = require('../../Controller/AdminController/TestimonialController');
const router = express.Router();



router.get("/education/:id", GetEducationById);
router.get("/education-get-all", GetAllEducation);
router.get("/testimonial-get-all", GetAllTestimonial);

router.get('/', (req, res) => {
    res.send('Hello from Router!');
});

module.exports = { WebsiteRoutes: router };
