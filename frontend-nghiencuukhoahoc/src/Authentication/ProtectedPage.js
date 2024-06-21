import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const ProtectedPage = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/v1/protected",
          {
            headers: { Authorization: auth },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu được bảo vệ:", error);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <div>
      <h1>Trang được bảo vệ</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Đang tải..."}
    </div>
  );
};

export default ProtectedPage;
