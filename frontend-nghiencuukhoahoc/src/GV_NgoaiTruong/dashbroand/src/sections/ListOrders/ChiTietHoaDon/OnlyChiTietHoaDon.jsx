import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../ListOrders.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const OnlyChiTietHoaDon = () => {
    const navigate = useNavigate()
    const { madonhangParam } = useParams();
    const [DataChiTietHoaDon, setDataChiTietHoaDon] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3003/api/v1/donhangdagiao");
            const sortedOrders = response.data.DT.sort((a, b) => new Date(b.ngaydonhang) - new Date(a.ngaydonhang));
            setDataChiTietHoaDon(sortedOrders);
            console.log(sortedOrders)
            console.log(madonhangParam)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const handleXacNhanGiaoHang = async (madonhang) => {

        console.log(madonhang)
        try {
            const response = await axios.put(`http://localhost:3003/api/v1/donhang/update/${madonhang}`);

            console.log('check handleXacNhanGiaoHang', response.data);
            if (response.data.EC === 1) {
                toast.success('Giao hàng thành công ^^!')
                fetchData();
            } else {
                toast.error(response.data.EM)
            }
        } catch (error) {
            console.error("Error fetching data:", error); toast.error('Đã xảy ra lỗi O.o !')
        }
    };

    const handleHuyDon = async (madonhang) => {

        console.log(madonhang)
        try {
            const response = await axios.put(`http://localhost:3003/api/v1/donhang/update/${madonhang}`);

            console.log('check handleHuyDon', response.data);
            if (response.data.EC === 1) {
                toast.success('Hủy đơn thành công ^^!')
                fetchData();
            } else {
                toast.error(response.data.EM)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error('Đã xảy ra lỗi O.o !')
        }
    };
    const handleBack = () => {
        navigate('/dashboard/ordersDaGiao')
    }
    // const handleMoveDaHuy = () => {
    //     navigate('/dashboard/ordersDaHuy')
    // }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const optionsDate = { day: '2-digit', month: 'numeric', year: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

        const formattedDate = new Intl.DateTimeFormat('vi-VN', optionsDate).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

        return `${formattedDate}, ${formattedTime}`;
    };
    return (
        <>
            <h2 className="text-info">Chi Tiết Các Hóa Đơn</h2>
            <div className="wrap">


                <button className="btn btn-secondary ml-4" onClick={handleBack}>
                    Trở về
                </button>
            </div>
            <table className="table ">
                <thead>
                    <tr>
                        <th>Mã Đơn Hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tài Khoản</th>
                        <th>Thời gian</th>
                        <th>Thành tiền</th>

                        <th>Tên ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {DataChiTietHoaDon.map((order, index) => (
                        madonhangParam == order.madonhang ? (

                            <tr key={index}>
                                <td>{order.madonhang}</td>
                                <td>{order.ten}</td>
                                <td>{order.taikhoan ? order.taikhoan : "Không xác định"}</td>
                                <td>{formatDate(order.ngaydonhang)}</td>
                                <td>{formatCurrency(order.thanhtien)}</td>

                                <td>{order.description}</td>
                                <td>{order.tensanpham}</td>
                                <td>{order.soluong}</td>
                                <td>{order.diachi}</td>
                                <td>{order.sodienthoai}</td>
                                <td>
                                    <img src={`http://localhost:3003/images/${order.description}`} alt={order.description} width="50" />
                                </td>
                                <td>{order.trangthai}</td>
                            </tr>
                        ) : null

                    ))}
                </tbody>
            </table>
        </>
    );
}

export default OnlyChiTietHoaDon;
