const {
  createKhoa,
  selectKhoa,
  updateKhoa,
  deleteKhoa,
  selectOneKhoa,
} = require("../../services/AdminServices/CRUDKhoa");

const {
  selectBomon_MAKHOA,
  selectBomon_TENKHOA,
  selectBomon,
  createBomon,
  updateBomon,
  deleteBomon,
} = require("../../services/AdminServices/CRUDBomon");
//Controller for KHOA
const getAllKHOA = async (req, res) => {
  try {
    let results = await selectKhoa();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllKHOA",
      EC: -1,
      DT: [],
    });
  }
};

const getOneKHOA = async (req, res) => {
  try {
    const makhoa = req.body.MAKHOA;
    if (!makhoa) {
      return res.status(400).json({
        EM: " makhoa  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await selectOneKhoa(makhoa);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getOneKHOA",
      EC: -1,
      DT: [],
    });
  }
};

const createKHOA = async (req, res) => {
  try {
    // const makhoa = req.body.makhoa;
    const tenkhoa = req.body.tenkhoa;
    if (!tenkhoa) {
      return res.status(400).json({
        EM: " tenkhoa  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await createKhoa(tenkhoa);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createKHOA",
      EC: -1,
      DT: [],
    });
  }
};

const updateKHOA = async (req, res) => {
  try {
    const makhoa = req.params.makhoa;
    if (!makhoa) {
      return res.status(400).json({
        EM: " makhoa  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    const tenkhoa = req.body.tenkhoa;
    let results = await updateKhoa(makhoa, tenkhoa);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateKHOA",
      EC: -1,
      DT: [],
    });
  }
};

const deleteKHOA = async (req, res) => {
  try {
    const makhoa = req.query.makhoa;
    if (!makhoa) {
      return res.status(400).json({
        EM: " makhoa  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await deleteKhoa(makhoa);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller deleteKHOA",
      EC: -1,
      DT: [],
    });
  }
};
//===========================================================================
//Controller for BOMON
const getAllBOMON = async (req, res) => {
  try {
    let results = await selectBomon();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllBOMON",
      EC: -1,
      DT: [],
    });
  }
};
const getOnlyBoMon_TENKHOA = async (req, res) => {
  try {
    const TENKHOA = req.params.TENKHOA;
    if (!TENKHOA) {
      return res.status(400).json({
        EM: " TENKHOA  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await selectBomon_TENKHOA(TENKHOA);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getOnlyBoMon_TENKHOA",
      EC: -1,
      DT: [],
    });
  }
};
const getOnlyBoMon = async (req, res) => {
  try {
    const MAKHOA = req.body.MAKHOA;
    if (!MAKHOA) {
      return res.status(400).json({
        EM: " MAKHOA  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await selectBomon_MAKHOA(MAKHOA);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getOnlyBoMon",
      EC: -1,
      DT: [],
    });
  }
};
const createBOMON = async (req, res) => {
  try {
    const makhoa = req.body.MAKHOA;
    const tenbomon = req.body.TENBOMON;
    // console.log(makhoa);
    // console.log(tenbomon);
    if (!MAKHOA || !tenbomon) {
      return res.status(400).json({
        EM: " MAKHOA ,tenbomon bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await createBomon(makhoa, tenbomon);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createBOMON",
      EC: -1,
      DT: [],
    });
  }
};

const updateBOMON = async (req, res) => {
  try {
    const mabomon = req.params.mabomon;
    // console.log("check mabomon", mabomon);
    const makhoa = req.body.makhoa;
    const tenbomon = req.body.tenbomon;
    if (!mabomon) {
      return res.status(400).json({
        EM: "mabomon bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await updateBomon(mabomon, makhoa, tenbomon);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateBOMON",
      EC: -1,
      DT: [],
    });
  }
};

const deleteBOMON = async (req, res) => {
  try {
    const mabomon = req.query.mabomon;
    // console.log(mabomon);
    if (!mabomon) {
      return res.status(400).json({
        EM: "mabomon bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await deleteBomon(mabomon);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller deleteBOMON",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getAllKHOA,
  getOneKHOA,
  createKHOA,
  updateKHOA,
  deleteKHOA,
  getAllBOMON,
  createBOMON,
  updateBOMON,
  deleteBOMON,
  getOnlyBoMon,
  getOnlyBoMon_TENKHOA,
};
