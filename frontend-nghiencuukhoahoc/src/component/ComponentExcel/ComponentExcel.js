import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const ExcelReader = () => {
  const [data, setData] = useState([]);
  const auth = Cookies.get("accessToken");
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const navigate = useNavigate();

  const handleAddUser = async () => {
    if (!data) {
      toast.error("Chưa có dữ liệu excel");
      return;
    }
    //api truyền dữ liệu excel về backend
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/taikhoan/protected`,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };
  console.log(data);
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button type="button" onClick={handleAddUser} className="btn btn-success">
        Success
      </button>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelReader;
