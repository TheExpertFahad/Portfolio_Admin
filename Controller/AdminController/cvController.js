const Cv = require("../../Models/AdminModels/CvSchema");

module.exports.AddCv = async (req, res) => {
  try {
    const data = req.body;
    const newCv = new Cv(data);
    await newCv.save();

    res.status(201).json({
      message: "CV added successfully",
      finalresult: true,
      data: newCv,
    });
  } catch (error) {
    console.error("AddCv error:", error);
    res.status(500).json({
      message: "Something went wrong",
      finalresult: false,
    });
  }
};

module.exports.UpdateCv = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCv = await Cv.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCv) {
      return res.status(404).json({ message: "CV not found", finalresult: false });
    }

    res.status(200).json({
      message: "CV updated successfully",
      finalresult: true,
      data: updatedCv,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      finalresult: false,
    });
  }
};

module.exports.GetCv = async (req, res) => {
  try {
    const cv = await Cv.findOne(); // If you only have one CV
    res.status(200).json({
      message: "CV fetched successfully",
      finalresult: true,
      data: cv,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      finalresult: false,
    });
  }
};
s