const {
  selectLop,
  CreateLop,
  updateLop,
  deleteLop,
  createLopExcel,
} = require("../../services/AdminServices/CRUDLop");

const getAllLopcontroller = async (req, res) => {
  try {
    let results = await selectLop(selectLop);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllLop",
      EC: -1,
      DT: [],
    });
  }
};

const creatNEWLopcontroller = async (req, res) => {
  try {
    const datalop = req.body;
    const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    if (!TENCHUONGTRINH || !datalop.Lop.MALOP) {
      return res.status(400).json({
        EM: " mã lớp hoặc chương trình bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await CreateLop(datalop, TENCHUONGTRINH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller creatNEWLop",
      EC: -1,
      DT: [],
    });
  }
};

const createLopcontrollerExcel = async (req, res) => {
  try {
    const dataexcel = req.body;
    if (!dataexcel.TENBOMON || !dataexcel.MALOP || !dataexcel.TENCHUONGTRINH) {
      return res.status(400).json({
        EM: " mã lớp hoặc chương trình hoặc tên bộ môn bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await createLopExcel(dataexcel);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllLop",
      EC: -1,
      DT: [],
    });
  }
};

const updateLOPcontroller = async (req, res) => {
  try {
    const MALOP = req.params.MALOP;
    const datalop = req.body;
    if (!MALOP) {
      return res.status(400).json({
        EM: " mã lớp  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await updateLop(MALOP, datalop);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateLOP",
      EC: -1,
      DT: [],
    });
  }
};

const deleteLOPcontroller = async (req, res) => {
  try {
    const MALOP = req.query.MALOP;

    let results = await deleteLop(MALOP);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateLOP",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getAllLopcontroller,
  creatNEWLopcontroller,
  updateLOPcontroller,
  deleteLOPcontroller,
  createLopcontrollerExcel,
};
