const Thumbnail = require('../../Models/AdminModels/ThumbnailModal');
module.exports.ThumbnailAdd = async (req, res) => {

    console.log(req.files)
    const { showThumbnail, viewType, title, link, description } = req.body;

    if (!showThumbnail || !viewType || !title || !link || !description) {
        return res.status(400).json({
            message: "All fields are required",
            finalresult: false,
        });
    }
    

    if (!req.files || !req.files.thumbnail || req.files.thumbnail.length === 0) {
        return res.status(400).json({
            message: 'Image file is required',
            finalresult: false,
        });
    }

    const thumbnailFile = req.files.thumbnail[0].filename;

    try {
        const newThumbnail = new Thumbnail({
            showThumbnail,
            viewType,
            title,
            link,
            thumbnail: thumbnailFile,
            description,
        });

        await newThumbnail.save();
        res.status(201).json({
            message: 'Thumbnail saved successfully',
            finalresult: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};


module.exports.UpdateThumbnail = async (req, res) => {
    try {
        const { id } = req.params;
        const { showThumbnail, viewType, title, link, description } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Thumbnail ID is required",
                finalresult: false,
            });
        }

        if (!showThumbnail || !viewType || !title || !link || !description) {
            return res.status(400).json({
                message: "All fields (showThumbnail, viewType, title, link, description) are required",
                finalresult: false,
            });
        }

      
        const imageFile = req.files?.image?.[0];

        const updatedData = {
            showThumbnail,
            viewType,
            title,
            description,
            link,
        };

        if (imageFile) {
            updatedData.image = imageFile.filename;
        }

        const updatedThumbnail = await Thumbnail.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedThumbnail) {
            return res.status(404).json({
                message: "Thumbnail not found",
                finalresult: false,
            });
        }

        return res.status(200).json({
            message: "Thumbnail updated successfully",
            finalresult: true,
            thumbnail: updatedThumbnail,
        });
    } catch (err) {
        console.error("UpdateThumbnail error:", err);
        return res.status(500).json({
            message: "Internal server error",
            finalresult: false,
        });
    }
};



module.exports.GetAllThumbnail = async (req, res) => {
    let { pageNo, pageSize } = req.body;

    // Set default values if not provided
    pageNo = parseInt(pageNo) || 1;
    pageSize = parseInt(pageSize) || 10;

    const skip = (pageNo - 1) * pageSize;

    try {
        const allThumbnails = await Thumbnail.find()
            .skip(skip)
            .limit(pageSize);

        const totalRecords = await Thumbnail.countDocuments();

        res.status(200).json({
            message: 'Thumbnails returned successfully',
            data: allThumbnails,
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

module.exports.GetThumbnailById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Thumbnail ID is required',
                finalresult: false,
            });
        }

        const thumbnail = await Thumbnail.findById(id);

        if (!thumbnail) {
            return res.status(404).json({
                message: 'Thumbnail not found',
                finalresult: false,
            });
        }

        res.status(200).json({
            message: 'Thumbnail returned successfully',
            data: thumbnail,
            finalresult: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};
module.exports.DeleteThumbnailById = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Thumbnail ID is required' });
        }

        const thumbnail = await Thumbnail.findByIdAndDelete(id);

        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }

        res.status(200).json({ message: 'Thumbnail returned successfully', data: thumbnail });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};
