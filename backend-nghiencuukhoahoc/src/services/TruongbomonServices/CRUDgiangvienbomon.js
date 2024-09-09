const pool = require("../../config/database");

const xem_giangvien = async (page, limit, TENBOMON) => {
  if (page && limit) {
    let offset = (page - 1) * limit;
    let [results0, fields] = await pool.execute(
      `SELECT 
        k.TENKHOA, 
        bm.MABOMON, 
        bm.TENBOMON, 
        tk.TENDANGNHAP, 
        gv.TENGV, 
        gv.EMAIL, 
        tk.MAGV, 
        cd.TENCHUCDANH, 
        cv.TENCHUCVU, 
        gv.DIENTHOAI, 
        gv.DIACHI, 
        tk.PHANQUYEN, 
        tk.TRANGTHAITAIKHOAN
      FROM 
        taikhoan AS tk
      LEFT JOIN 
        giangvien AS gv ON tk.MAGV = gv.MAGV
      LEFT JOIN 
        bomon AS bm ON bm.MABOMON = gv.MABOMON
      LEFT JOIN 
        khoa AS k ON k.MAKHOA = bm.MAKHOA
      LEFT JOIN 
        giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
      LEFT JOIN 
        chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
      LEFT JOIN 
        co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
      LEFT JOIN 
        chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
      WHERE 
        bm.TENBOMON = ?
      ORDER BY 
        tk.TENDANGNHAP ASC
      LIMIT 
        ? OFFSET ?;`,
      [TENBOMON, limit, offset]
    );

    const totalCountResult = await pool.execute(
      `SELECT COUNT(*) AS total
      FROM 
        taikhoan AS tk
      LEFT JOIN 
        giangvien AS gv ON tk.MAGV = gv.MAGV
      LEFT JOIN 
        bomon AS bm ON bm.MABOMON = gv.MABOMON
      LEFT JOIN 
        khoa AS k ON k.MAKHOA = bm.MAKHOA
      LEFT JOIN 
        giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
      LEFT JOIN 
        chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
      LEFT JOIN 
        co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
      LEFT JOIN 
        chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
      WHERE 
        bm.TENBOMON = ?;`,
      [TENBOMON]
    );

    const totalCount = totalCountResult[0][0].total;
    let totalPages = Math.ceil(totalCount / limit);
    let data = {
      totalRows: results0,
      totalPages: totalPages,
      users: fields,
    };
    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: data,
    };
  } else {
    let [results0, fields] = await pool.execute(
      `SELECT 
        k.TENKHOA, 
        bm.MABOMON, 
        bm.TENBOMON, 
        tk.TENDANGNHAP, 
        gv.TENGV, 
        gv.EMAIL, 
        tk.MAGV, 
        cd.TENCHUCDANH, 
        cv.TENCHUCVU, 
        gv.DIENTHOAI, 
        gv.DIACHI, 
        tk.PHANQUYEN, 
        tk.TRANGTHAITAIKHOAN
      FROM 
        taikhoan AS tk
      LEFT JOIN 
        giangvien AS gv ON tk.MAGV = gv.MAGV
      LEFT JOIN 
        bomon AS bm ON bm.MABOMON = gv.MABOMON
      LEFT JOIN 
        khoa AS k ON k.MAKHOA = bm.MAKHOA
      LEFT JOIN 
        giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
      LEFT JOIN 
        chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
      LEFT JOIN 
        co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
      LEFT JOIN 
        chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
      WHERE 
        bm.TENBOMON = ?
      ORDER BY 
        tk.TENDANGNHAP ASC;`,
      [TENBOMON]
    );

    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: results0,
    };
  }
};

const xem_giangvien_dachonkhung = async (page, limit, TENBOMON) => {
  if (page && limit) {
    let offset = (page - 1) * limit;
    let [results0, fields] = await pool.execute(
      `SELECT 
    bm.TENBOMON, 
    gv.TENGV, 
    gv.EMAIL, 
    cd.TENCHUCDANH, 
    cv.TENCHUCVU,  
    tk.TRANGTHAITAIKHOAN,
    nh.TENNAMHOC, 
    kic.*
FROM 
    taikhoan AS tk
JOIN 
    giangvien AS gv ON tk.MAGV = gv.MAGV
JOIN 
    bomon AS bm ON bm.MABOMON = gv.MABOMON
JOIN 
    khoa AS k ON k.MAKHOA = bm.MAKHOA
JOIN 
    chon_khung AS ck ON gv.MAGV = ck.MAGV
LEFT JOIN 
    giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
LEFT JOIN 
    chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
LEFT JOIN 
    co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
LEFT JOIN 
    chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
LEFT JOIN 
    namhoc AS nh ON ck.MANAMHOC = nh.MANAMHOC
LEFT JOIN 
    khunggiochuan AS kic ON ck.MAKHUNG = kic.MAKHUNG -- Join bảng khungiochuan để lấy thông tin chi tiết
WHERE 
    bm.TENBOMON = ?
ORDER BY 
    tk.TENDANGNHAP ASC
LIMIT 
    ? OFFSET ?;
`,
      [TENBOMON, limit, offset]
    );

    const totalCountResult = await pool.execute(
      `SELECT COUNT(*) AS total
FROM 
    taikhoan AS tk
JOIN 
    giangvien AS gv ON tk.MAGV = gv.MAGV
JOIN 
    bomon AS bm ON bm.MABOMON = gv.MABOMON
JOIN 
    khoa AS k ON k.MAKHOA = bm.MAKHOA
JOIN 
    chon_khung AS ck ON gv.MAGV = ck.MAGV
LEFT JOIN 
    giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
LEFT JOIN 
    chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
LEFT JOIN 
    co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
LEFT JOIN 
    chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
LEFT JOIN 
    namhoc AS nh ON ck.MANAMHOC = nh.MANAMHOC
LEFT JOIN 
    khunggiochuan AS kic ON ck.MAKHUNG = kic.MAKHUNG -- Join bảng khungiochuan để lấy thông tin chi tiết
WHERE 
    bm.TENBOMON = ?`,
      [TENBOMON]
    );

    const totalCount = totalCountResult[0][0].total;
    let totalPages = Math.ceil(totalCount / limit);
    let data = {
      totalRows: results0,
      totalPages: totalPages,
      users: fields,
    };
    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: data,
    };
  } else {
    let [results0, fields] = await pool.execute(
      `SELECT 
    bm.TENBOMON, 
    gv.TENGV, 
    gv.EMAIL, 
    cd.TENCHUCDANH, 
    cv.TENCHUCVU,  
    tk.TRANGTHAITAIKHOAN,
    nh.TENNAMHOC, 
    kic.*
FROM 
    taikhoan AS tk
JOIN 
    giangvien AS gv ON tk.MAGV = gv.MAGV
JOIN 
    bomon AS bm ON bm.MABOMON = gv.MABOMON
JOIN 
    khoa AS k ON k.MAKHOA = bm.MAKHOA
JOIN 
    chon_khung AS ck ON gv.MAGV = ck.MAGV
LEFT JOIN 
    giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
LEFT JOIN 
    chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
LEFT JOIN 
    co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
LEFT JOIN 
    chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
LEFT JOIN 
    namhoc AS nh ON ck.MANAMHOC = nh.MANAMHOC
LEFT JOIN 
    khunggiochuan AS kic ON ck.MAKHUNG = kic.MAKHUNG -- Join bảng khungiochuan để lấy thông tin chi tiết
WHERE 
    bm.TENBOMON = ?`,
      [TENBOMON]
    );

    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: results0,
    };
  }
};

const xem_giangvien_chuachonkhung = async (page, limit, TENBOMON) => {
  if (page && limit) {
    let offset = (page - 1) * limit;
    let [results0, fields] = await pool.execute(
      `SELECT 
    k.TENKHOA, 
    bm.TENBOMON, 
    tk.TENDANGNHAP, 
    gv.TENGV, 
    gv.EMAIL, 
    cd.TENCHUCDANH, 
    cv.TENCHUCVU, 
    tk.PHANQUYEN, 
    tk.TRANGTHAITAIKHOAN
FROM 
    taikhoan AS tk
JOIN 
    giangvien AS gv ON tk.MAGV = gv.MAGV
JOIN 
    bomon AS bm ON bm.MABOMON = gv.MABOMON
JOIN 
    khoa AS k ON k.MAKHOA = bm.MAKHOA
LEFT JOIN 
    chon_khung AS ck ON gv.MAGV = ck.MAGV
LEFT JOIN 
    giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
LEFT JOIN 
    chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
LEFT JOIN 
    co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
LEFT JOIN 
    chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
WHERE 
    bm.TENBOMON = ? AND ck.MAGV IS NULL
ORDER BY 
    tk.TENDANGNHAP ASC
LIMIT 
    ? OFFSET ?;
`,
      [TENBOMON, limit, offset]
    );

    const totalCountResult = await pool.execute(
      `SELECT COUNT(*) AS total
FROM 
    taikhoan AS tk
JOIN 
    giangvien AS gv ON tk.MAGV = gv.MAGV
JOIN 
    bomon AS bm ON bm.MABOMON = gv.MABOMON
JOIN 
    khoa AS k ON k.MAKHOA = bm.MAKHOA
LEFT JOIN 
    chon_khung AS ck ON gv.MAGV = ck.MAGV
LEFT JOIN 
    giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
LEFT JOIN 
    chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
LEFT JOIN 
    co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
LEFT JOIN 
    chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
WHERE 
    bm.TENBOMON = ? AND ck.MAGV IS NULL`,
      [TENBOMON]
    );

    const totalCount = totalCountResult[0][0].total;
    let totalPages = Math.ceil(totalCount / limit);
    let data = {
      totalRows: results0,
      totalPages: totalPages,
      users: fields,
    };
    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: data,
    };
  } else {
    let [results0, fields] = await pool.execute(
      `SELECT 
    k.TENKHOA, 
    bm.TENBOMON, 
    tk.TENDANGNHAP, 
    gv.TENGV, 
    gv.EMAIL, 
    cd.TENCHUCDANH, 
    cv.TENCHUCVU, 
    tk.PHANQUYEN, 
    tk.TRANGTHAITAIKHOAN
FROM 
    taikhoan AS tk
JOIN 
    giangvien AS gv ON tk.MAGV = gv.MAGV
JOIN 
    bomon AS bm ON bm.MABOMON = gv.MABOMON
JOIN 
    khoa AS k ON k.MAKHOA = bm.MAKHOA
LEFT JOIN 
    chon_khung AS ck ON gv.MAGV = ck.MAGV
LEFT JOIN 
    giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
LEFT JOIN 
    chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
LEFT JOIN 
    co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
LEFT JOIN 
    chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
WHERE 
    bm.TENBOMON = ? AND ck.MAGV IS NULL`,
      [TENBOMON]
    );

    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: results0,
    };
  }
};

//phúc note
const xem_giangvien_MonHoc_daChonkhung = async (MAMONHOC) => {
  console.log("MAMONHOC =>", MAMONHOC);
  let [results, fields] = await pool.execute(
    `select chitietphancong.*, giangvien.* from chitietphancong ,bangphancong, giangvien,hockynienkhoa,monhoc where chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG AND bangphancong.MAGV = giangvien.MAGV AND monhoc.MAMONHOC = chitietphancong.MAMONHOC AND monhoc.MAMONHOC = ?`,
    [MAMONHOC]
  );
  console.log("check resuft =>", results);
  return {
    EM: "Xem thông tin giảng viên thành công",
    EC: 1,
    DT: results,
  };
};
module.exports = {
  xem_giangvien,
  xem_giangvien_dachonkhung,
  xem_giangvien_chuachonkhung,
  xem_giangvien_MonHoc_daChonkhung,
};
