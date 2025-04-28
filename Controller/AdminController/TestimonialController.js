const Testimonial = require('../../Models/AdminModels/TestimonialModal');
module.exports.TestimonialAdd = async (req, res) => {

    console.log(req.body)
    const { quote, name, designation } = req.body;

    if (!quote || !name || !designation) {
        return res.status(400).json({
            message: "All fields are required",
            finalresult: false,
        });
    }

    if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {
        return res.status(400).json({
            message: 'Image file is required',
            finalresult: false,
        });
    }

    const avatarFile = req.files.avatar[0].filename;

    try {
        const newTestimonial = new Testimonial({
            avatar: avatarFile,
            quote,
            name,
            designation,
        });

        await newTestimonial.save();
        res.status(201).json({
            message: 'Testimonial saved successfully',
            finalresult: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};


module.exports.UpdateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { quote, name, designation } = req.body;

        // Validate required fields
        if (!id) {
            return res.status(400).json({
                message: "Project ID is required",
                finalresult: false,
            });
        }

        if (!name || !designation || !quote) {
            return res.status(400).json({
                message: "All fields (name, designation, quote) are required",
                finalresult: false,
            });
        }

        const avatarFile = req.files?.avatar?.[0];
        if (!avatarFile) {
            return res.status(400).json({
                message: "Image file is required",
                finalresult: false,
            });
        }


        const updatedData = {
            name,
            designation,
            quote,
            avatar: avatarFile.filename, // main image is required
        };

        // Update in DB
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTestimonial) {
            return res.status(404).json({
                message: "Testimonial not found",
                finalresult: false,
            });
        }

        return res.status(200).json({
            message: "Testimonial updated successfully",
            finalresult: true,
            testimonial: updatedTestimonial, // optional: return updated doc
        });
    } catch (err) {
        console.error("UpdateTestimonial error:", err);
        return res.status(500).json({
            message: "Internal server error",
            finalresult: false,
        });
    }
};



module.exports.GetAllTestimonial = async (req, res) => {
    let { pageNo, pageSize } = req.body;

    // Set default values if not provided
    pageNo = parseInt(pageNo) || 1;
    pageSize = parseInt(pageSize) || 10;

    const skip = (pageNo - 1) * pageSize;

    try {
        const allTestimonials = await Testimonial.find()
            .skip(skip)
            .limit(pageSize);

        const totalRecords = await Testimonial.countDocuments();

        res.status(200).json({
            message: 'Testimonials returned successfully',
            data: allTestimonials,
            totalRecords: totalRecords,
            currentPage: pageNo,
            totalPages: Math.ceil(totalRecords / pageSize),
            finalresult: true,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};

module.exports.GetTestimonialById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Testimonial ID is required',
                finalresult: false,
            });
        }

        const testimonial = await Testimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({
                message: 'Testimonial not found',
                finalresult: false,
            });
        }

        res.status(200).json({
            message: 'Testimonial returned successfully',
            data: testimonial,
            finalresult: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};
module.exports.DeleteTestimonialById = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Testimonial ID is required' });
        }

        const testimonial = await Testimonial.findByIdAndDelete(id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.status(200).json({ message: 'Testimonial returned successfully', data: testimonial });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};
