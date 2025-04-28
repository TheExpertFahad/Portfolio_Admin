const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname) || getExtensionFromMime(file.mimetype);
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
    }
});

function getExtensionFromMime(mimetype) {
    switch (mimetype) {
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/webp":
            return ".webp";
        default:
            return "";
    }
}

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp','image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
