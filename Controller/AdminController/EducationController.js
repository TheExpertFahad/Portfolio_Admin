const EducationModal = require("../../Models/AdminModels/EducationModal");

module.exports.AddEducation = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({ message: "degree, institute, duration are required" });
  }
  const { degree, institute, startDate, endDate, degree_level } = req.body;

  if (!degree || !institute || !startDate || !endDate || !degree_level) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    const educationDoc = await EducationModal.create({
      degree: degree,
      institute: institute,
      startDate: startDate,
      endDate: endDate,
      degree_level: degree_level,
    });

    res.status(201).json({
      message: "Education added successfully",
      finalresult: true,
      data: educationDoc,
    });
  } catch (error) {
    console.error("AddEducation error:", error);
    res.status(500).json({
      message: "Something went wrong",
      finalresult: false,
    });
  }
};

module.exports.GetEducationById = async (req, res) => {


  console.log(req.params);
  try {
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({
              message: 'Education ID is required',
              finalresult: false,
          });
      }

      const education = await EducationModal.findById(id);

      if (!education) {
          return res.status(404).json({
              message: 'Education not found',
              finalresult: false,
          });
      }

      res.status(200).json({
          message: 'Education returned successfully',
          data: education,
          finalresult: true,
      });
  } catch (err) {
      res.status(500).json({
          message: 'Something Went wrong',
          finalresult: false,
      });
  }
};

module.exports.UpdateEducation = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { degree, institute, startDate, endDate, degree_level } = req.body;
  try {
    const updatedEducation = await EducationModal.findByIdAndUpdate(id, { degree, institute, startDate, endDate, degree_level }, { new: true });

    if (!updatedEducation) {
      return res.status(404).json({ message: "Education not found", finalresult: false });
    }

    res.status(200).json({
      message: "Education updated successfully",
      finalresult: true,
      data: updatedEducation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      finalresult: false,
    });
  }
};

module.exports.GetAllEducation = async (req, res) => {
  let { pageNo, pageSize } = req.body;

  // Set default values if not provided
  pageNo = parseInt(pageNo) || 1;
  pageSize = parseInt(pageSize) || 10;

  const skip = (pageNo - 1) * pageSize;

  try {
      const allEducation = await EducationModal.find()
          .skip(skip)
          .limit(pageSize);

      const totalRecords = await EducationModal.countDocuments();

      res.status(200).json({
          message: 'Education returned successfully',
          data: allEducation,
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

module.exports.DeleteEducationById = async (req, res) => {
  console.log("DeleteEducationById");
  try {
      const education = await EducationModal.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Education deleted successfully",
      finalresult: true,
      data: education,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      finalresult: false,
    });
  }
}