const express = require('express');
const { Signup, Login, ForgotPassword, ResetPassword } = require('../../Controller/AdminController/AuthController');
const { AllAccount, UpdateAccount, AddAccount } = require('../../Controller/AdminController/AccountController');
const { authMiddleware } = require('../../Middleware/AdminMiddleware/AdminAuthMiddleware');
const upload = require('../../Utils/multer-config');
const { AddProject, GetAllProject, GetProjectById, DeleteProjectById, UpdateProject } = require('../../Controller/AdminController/ProjectController');
const { AddCv, UpdateCv, GetCv } = require('../../Controller/AdminController/CreateCv');
const { AddEducation, GetEducationById, GetAllEducation, UpdateEducation, DeleteEducationById } = require('../../Controller/AdminController/EducationController');
const router = express.Router();
const { TestimonialAdd, GetAllTestimonial, GetTestimonialById, UpdateTestimonial, DeleteTestimonialById } = require('../../Controller/AdminController/TestimonialController');
const { ThumbnailAdd, GetAllThumbnail, GetThumbnailById, UpdateThumbnail, DeleteThumbnailById } = require('../../Controller/AdminController/ThumbnailController');
// Public Routes (No authentication required)
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/forgot-password', ForgotPassword);
router.post('/reset-password', ResetPassword);

// Protected Routes (Require authentication)
router.use(authMiddleware);
// Apply authMiddleware to all routes below this line


router.post('/project-add', upload.fields([{ name: 'image', maxCount: 1 }]), AddProject);
router.post('/project-get-all', GetAllProject);
router.get('/project/:id', GetProjectById);
router.delete('/project-delete', DeleteProjectById);
router.put('/project-update/:id', upload.fields([{ name: 'image', maxCount: 1 }]), UpdateProject);



router.get('/account', AllAccount);
router.post('/account', AddAccount);
router.put('/account', UpdateAccount);


router.post("/cv", AddCv);
router.put("/cv/:id", UpdateCv);
router.get("/cv", GetCv);


router.post("/education-add", AddEducation);
router.get("/education/:id", GetEducationById);
router.post("/education-get-all", GetAllEducation);
router.put("/education-update/:id", UpdateEducation);
router.delete("/education-delete/:id", DeleteEducationById);

router.post("/testimonial-add", upload.fields([{ name: 'avatar', maxCount: 1 }]), TestimonialAdd);
router.get("/testimonial/:id", GetTestimonialById);
router.post("/testimonial-get-all", GetAllTestimonial);
router.put("/testimonial-update/:id", upload.fields([{ name: 'avatar', maxCount: 1 }]), UpdateTestimonial);
router.delete("/testimonial-delete/:id", DeleteTestimonialById);

router.post("/thumbnail-add", upload.fields([{ name: 'thumbnail', maxCount: 1 }]), ThumbnailAdd);
router.get("/thumbnail/:id", GetThumbnailById);
router.post("/thumbnail-get-all", GetAllThumbnail);
router.put("/thumbnail-update/:id", upload.fields([{ name: 'thumbnail', maxCount: 1 }]), UpdateThumbnail);
router.delete("/thumbnail-delete/:id", DeleteThumbnailById);

router.get('/', (req, res) => {
    res.send('Hello from Router!');
});

module.exports = { AdminRoutes: router };
