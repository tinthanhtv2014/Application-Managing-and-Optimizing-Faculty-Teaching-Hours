import { useEffect, useState } from "react"
import CookiesAxios from "../CookiesAxios"
const IndexPhanCongGiangVien = () => {

    const [data_ListGVChuaChonKhung, setData_ListGVChuaChonKhung] = useState([])
    const [data_ListGVDaChonKhung, setData_ListGVDaChonKhung] = useState([])
    const [data_ListGVPhanCong, setData_ListGVPhanCong] = useState([])
    useEffect(() => {

        fetchListGiangVien()

    }, [])
    const fetchListGiangVien = async () => {

        try {
            const response = await CookiesAxios.get(
                `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/dachonkhung`
            );


        } catch (error) {
            console.error("Error fetching BoMon data:", error);
        }
    }
    return (


        <>

            <p>   IndexPhanCongGiangVien</p>

        </>
    )

}
export default IndexPhanCongGiangVien