const {
  selectDanhMucQuyDoi,
  selectOnlyDanhMucQuyDoi,
  createDanhMucQuyDoi,
  updateDanhMucQuyDoi,
  deleteDanhMucQuyDoi,
} = require("../../services/AdminServices/AdminServiceGioChuan/CRUDDanhMucSP");
const {
  selectLoaiDanhMuc,
  createLoaiDanhMuc,
  updateLoaiDanhMuc,
  deleteLoaiDanhMuc,
  selectLoaiDanhMuc_TRANGTHAI,
} = require("../../services/AdminServices/AdminServiceGioChuan/CRUDLoaiDanhMuc");
const {
  selectLoaiTacGia,
  createLoaiTacGia,
  updateLoaiTacGia,
  deleteLoaiTacGia,
} = require("../../services/AdminServices/AdminServiceGioChuan/CRUDLoaiTacGia");
const {
  selectQuyDinh,
  createQuyDinh,
  updateQuyDinh,
  deleteQuyDinh,
  selectQuyDinh_TRANGTHAI,
} = require("../../services/AdminServices/AdminServiceGioChuan/CRUDQuyDinh");
const {
  selectTyLeQuyDoi,
  createTyLeQuyDoi,
  updateTyLeQuyDoi,
  deleteTyLeQuyDoi,
} = require("../../services/AdminServices/AdminServiceGioChuan/CRUDTyLe");

const {
  select_Co_Quy_Dinh,
  create_Co_Quy_Dinh,
  create_Co_Quy_Dinh_excel,
  select_Co_Quy_Dinh_truyenREQ,
} = require("../../services/AdminServices/AdminServiceGioChuan/CRUDCo_Quy_Dinh");

const getAllQuyDinh = async (req, res) => {
  try {
    let results = await selectQuyDinh();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const getOnlyDanhMucQuyDoi = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("check id", id);
    const results = await selectOnlyDanhMucQuyDoi(id);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};
const getDanhMucQuyDoi = async (req, res) => {
  try {
    const results = await selectDanhMucQuyDoi();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const addDanhMucQuyDoi = async (req, res) => {
  const {
    MA_LOAI_DANH_MUC,
    GIO_CHUAN,
    NOI_DUNG_DANH_MUC,
    ISBN,
    WOS_SCOUPUS,
    HANG_WOS_SCOUPUS,
    LOI_NHUAN,
    DON_VI_TINH,
    GIAI_THUONG,
    XEP_HANG_QUARTILES,
    NAM_THUC_HIEN,
    TRANG_THAI_DANH_MUC,
    GHI_CHU_DANH_MUC,
  } = req.body;

  try {
    const results = await createDanhMucQuyDoi(
      MA_LOAI_DANH_MUC,
      GIO_CHUAN,
      NOI_DUNG_DANH_MUC,
      ISBN,
      WOS_SCOUPUS,
      HANG_WOS_SCOUPUS,
      LOI_NHUAN,
      DON_VI_TINH,
      GIAI_THUONG,
      XEP_HANG_QUARTILES,
      NAM_THUC_HIEN,
      TRANG_THAI_DANH_MUC,
      GHI_CHU_DANH_MUC
    );

    return res.status(201).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const editDanhMucQuyDoi = async (req, res) => {
  const {
    MA_LOAI_DANH_MUC,
    GIO_CHUAN,
    NOI_DUNG_DANH_MUC,
    ISBN,
    WOS_SCOUPUS,
    HANG_WOS_SCOUPUS,
    LOI_NHUAN,
    DON_VI_TINH,
    GIAI_THUONG,
    XEP_HANG_QUARTILES,
    NAM_THUC_HIEN,
    TRANG_THAI_DANH_MUC,
    GHI_CHU_DANH_MUC,
  } = req.body;
  const { id } = req.params;

  try {
    const results = await updateDanhMucQuyDoi(
      id,
      MA_LOAI_DANH_MUC,
      GIO_CHUAN,
      NOI_DUNG_DANH_MUC,
      ISBN,
      WOS_SCOUPUS,
      HANG_WOS_SCOUPUS,
      LOI_NHUAN,
      DON_VI_TINH,
      GIAI_THUONG,
      XEP_HANG_QUARTILES,
      NAM_THUC_HIEN,
      TRANG_THAI_DANH_MUC,
      GHI_CHU_DANH_MUC
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const removeDanhMucQuyDoi = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await deleteDanhMucQuyDoi(id);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};
// ----------START----------QUY DINH------------------------------
const getQuyDinh = async (req, res) => {
  try {
    const results = await selectQuyDinh();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const getAllQuyDinh_TRANGTHAI = async (req, res) => {
  try {
    const TRANG_THAI_QUY_DINH = req.body.TRANG_THAI_QUY_DINH;
    let results = await selectQuyDinh_TRANGTHAI(TRANG_THAI_QUY_DINH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const addQuyDinh = async (req, res) => {
  const { TEN_QUY_DINH } = req.body;

  try {
    const results = await createQuyDinh(TEN_QUY_DINH);
    return res.status(201).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const editQuyDinh = async (req, res) => {
  const { TRANG_THAI_QUY_DINH } = req.body;
  const { id } = req.params;

  try {
    const results = await updateQuyDinh(id, TRANG_THAI_QUY_DINH);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const removeQuyDinh = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await deleteQuyDinh(id);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};
// -------------END-------QUY DINH------------------------------

// -------------START-------LOAI DANH MUC------------------------------
const getLoaiDanhMuc = async (req, res) => {
  try {
    const results = await selectLoaiDanhMuc();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const getLoaiDanhMuc_TRANGTHAI = async (req, res) => {
  try {
    const TRANG_THAI_DANH_MUC = req.body.TRANG_THAI_DANH_MUC;
    const results = await selectLoaiDanhMuc_TRANGTHAI(TRANG_THAI_DANH_MUC);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const addLoaiDanhMuc = async (req, res) => {
  const { TEN_LOAI_DANH_MUC } = req.body;

  try {
    const results = await createLoaiDanhMuc(TEN_LOAI_DANH_MUC);
    return res.status(201).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const editLoaiDanhMuc = async (req, res) => {
  const { TRANG_THAI_DANH_MUC } = req.body;
  const { id } = req.params;

  try {
    const results = await updateLoaiDanhMuc(id, TRANG_THAI_DANH_MUC);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const removeLoaiDanhMuc = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await deleteLoaiDanhMuc(id);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};
// --------------------LOAI DANH MUC--------------END----------------

//   -----START-----------LOAI TÁC GIẢ-----------------------------------
const getLoaiTacGia = async (req, res) => {
  try {
    const results = await selectLoaiTacGia();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const addLoaiTacGia = async (req, res) => {
  const { TEN_LOAI_TAC_GIA } = req.body;

  try {
    const results = await createLoaiTacGia(TEN_LOAI_TAC_GIA);
    return res.status(201).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const editLoaiTacGia = async (req, res) => {
  const { TEN_LOAI_TAC_GIA } = req.body;
  const { id } = req.params;

  try {
    const results = await updateLoaiTacGia(id, TEN_LOAI_TAC_GIA);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const removeLoaiTacGia = async (req, res) => {
  const { id } = req.params;
  // console.log("id", id);
  try {
    const results = await deleteLoaiTacGia(id);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};
//   ----------------LOAI TÁC GIẢ----------------END-------------------

// -------START-------TY LE QUY DOI------------------------------------
const getTyLeQuyDoi = async (req, res) => {
  try {
    const results = await selectTyLeQuyDoi();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const addTyLeQuyDoi = async (req, res) => {
  const {
    MA_QUY_DINH,
    TEN_QUY_DOI,
    TY_LE,
    TRANG_THAI_QUY_DOI,
    GHI_CHU_QUY_DOI,
  } = req.body;

  try {
    const results = await createTyLeQuyDoi(
      MA_QUY_DINH,
      TEN_QUY_DOI,
      TY_LE,
      TRANG_THAI_QUY_DOI,
      GHI_CHU_QUY_DOI
    );
    return res.status(201).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const editTyLeQuyDoi = async (req, res) => {
  const { id } = req.params;
  const {
    MA_QUY_DINH,
    TEN_QUY_DOI,
    TY_LE,
    TRANG_THAI_QUY_DOI,
    GHI_CHU_QUY_DOI,
  } = req.body;

  try {
    const results = await updateTyLeQuyDoi(
      id,
      MA_QUY_DINH,
      TEN_QUY_DOI,
      TY_LE,
      TRANG_THAI_QUY_DOI,
      GHI_CHU_QUY_DOI
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};

const removeTyLeQuyDoi = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await deleteTyLeQuyDoi(id);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Internal server error",
      EC: -1,
      DT: [],
    });
  }
};
// --------------------TY LE QUY DOI--------------END----------------

// --------------------CO QUY DINH--------------Start----------------
const getAll_Co_Quy_Dinh = async (req, res) => {
  try {
    let results = await select_Co_Quy_Dinh();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "có lỗi ở getAll_Co_Quy_Dinh",
      EC: 1,
      DT: [],
    });
  }
};

const add_Co_Quy_Dinh_excel = async (req, res) => {
  try {
    let results = await create_Co_Quy_Dinh_excel();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "có lỗi ở getAll_Co_Quy_Dinh",
      EC: 1,
      DT: [],
    });
  }
};
const addCoQuyDinh = async (req, res) => {
  const { MA_QUY_DOI, MA_LOAI_DANH_MUC, MA_LOAI_TAC_GIA, SO_TAC_GIA } =
    req.body;
  // console.log("check data MA_QUY_DOI =>", MA_QUY_DOI);
  // console.log("check data MA_LOAI_DANH_MUC =>", MA_LOAI_DANH_MUC);

  // console.log("check data MA_LOAI_TAC_GIA =>", MA_LOAI_TAC_GIA);
  // console.log("check data SO_TAC_GIA =>", SO_TAC_GIA);
  try {
    let results = await create_Co_Quy_Dinh(
      MA_QUY_DOI,
      MA_LOAI_DANH_MUC,
      MA_LOAI_TAC_GIA,
      SO_TAC_GIA
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "có lỗi ở getAll_Co_Quy_Dinh",
      EC: 1,
      DT: [],
    });
  }
};

const getAll_Co_Quy_Dinh_REQ = async (req, res) => {
  try {
    const MA_LOAI_DANH_MUC = req.body.MA_LOAI_DANH_MUC;
    const MA_LOAI_TAC_GIA = req.body.MA_LOAI_TAC_GIA;
    let results = await select_Co_Quy_Dinh_truyenREQ(
      MA_LOAI_DANH_MUC,
      MA_LOAI_TAC_GIA
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "có lỗi ở getAll_Co_Quy_Dinh_REQ",
      EC: 1,
      DT: [],
    });
  }
};

module.exports = {
  //danh mục quy đổi
  getDanhMucQuyDoi,
  addDanhMucQuyDoi,
  editDanhMucQuyDoi,
  removeDanhMucQuyDoi,
  getOnlyDanhMucQuyDoi,

  //quy định
  getQuyDinh,
  addQuyDinh,
  editQuyDinh,
  removeQuyDinh,
  getAllQuyDinh_TRANGTHAI,
  //danh mục
  getLoaiDanhMuc,
  addLoaiDanhMuc,
  editLoaiDanhMuc,
  removeLoaiDanhMuc,
  getLoaiDanhMuc_TRANGTHAI,

  //loại tác giả
  getLoaiTacGia,
  addLoaiTacGia,
  editLoaiTacGia,
  removeLoaiTacGia,

  //tỉ lệ quy đổi
  getTyLeQuyDoi,
  addTyLeQuyDoi,
  editTyLeQuyDoi,
  removeTyLeQuyDoi,

  //có quy định
  getAll_Co_Quy_Dinh,
  addCoQuyDinh,
  add_Co_Quy_Dinh_excel,
  getAll_Co_Quy_Dinh_REQ,
};
