const Project = require('../../Models/AdminModels/ProjectModal');
module.exports.AddProject = async (req, res) => {

    console.log(req.body, 'AddProject ------------')
    const { name, type, title, description, link } = req.body;

    if (!name || !type || !title || !description || !link) {
        return res.status(400).json({
            message: "All fields are required",
            finalresult: false,
        });
    }

    if (!req.files || !req.files.image || req.files.image.length === 0) {
        return res.status(400).json({
            message: 'Image file is required',
            finalresult: false,
        });
    }

    const image = req.files.image[0].filename;

    try {
        const newProject = new Project({
            name,
            type,
            title,
            description,
            link,
            image,
        });

        await newProject.save();
        res.status(201).json({
            message: 'Project saved successfully',
            finalresult: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};

module.exports.UpdateProject = async (req, res) => {
    console.log(req.files, 'UpdateProject ------------');
    try {
        const { id } = req.params;
        const { name, type, title, description, link } = req.body;

        // Validate required fields
        if (!id) {
            return res.status(400).json({
                message: "Project ID is required",
                finalresult: false,
            });
        }

        if (!name || !type || !title || !description || !link) {
            return res.status(400).json({
                message: "All fields (name, type, title, description, link) are required",
                finalresult: false,
            });
        }

        const imageFile = req.files?.image?.[0];

        const updatedData = {
            name,
            type,
            title,
            description,
            link,
        };

        if (imageFile) {
            updatedData.image = imageFile.filename; // Only update image if uploaded
        }

        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({
                message: "Project not found",
                finalresult: false,
            });
        }

        return res.status(200).json({
            message: "Project updated successfully",
            finalresult: true,
            project: updatedProject,
        });
    } catch (err) {
        console.error("UpdateProject error:", err);
        return res.status(500).json({
            message: "Internal server error",
            finalresult: false,
        });
    }
};




module.exports.GetAllProject = async (req, res) => {
    let { pageNo, pageSize } = req.body;

    // Set default values if not provided
    pageNo = parseInt(pageNo) || 1;
    pageSize = parseInt(pageSize) || 10;

    const skip = (pageNo - 1) * pageSize;

    try {
        const allProjects = await Project.find()
            .skip(skip)
            .limit(pageSize);

        const totalRecords = await Project.countDocuments();

        res.status(200).json({
            message: 'Projects returned successfully',
            data: allProjects,
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

module.exports.GetProjectById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'Project ID is required',
                finalresult: false,
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found',
                finalresult: false,
            });
        }

        res.status(200).json({
            message: 'Project returned successfully',
            data: project,
            finalresult: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};
module.exports.DeleteProjectById = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Project ID is required' });
        }

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project returned successfully', data: project });
    } catch (err) {
        res.status(500).json({
            message: 'Something Went wrong',
            finalresult: false,
        });
    }
};
