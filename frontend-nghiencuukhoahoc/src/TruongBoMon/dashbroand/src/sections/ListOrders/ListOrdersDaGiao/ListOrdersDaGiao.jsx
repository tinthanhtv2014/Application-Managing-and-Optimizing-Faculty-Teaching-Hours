import { useState, useEffect } from "react";
import axios from "axios";
import '../ListOrders.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ListOrdersDaHuy = () => {
    const navigate = useNavigate()
    const [ListOdersChuaGiao, setListOdersChuaGiao] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3003/api/v1/donhangdagiao");
            const sortedOrders = response.data.DT.sort((a, b) => new Date(b.ngaydonhang) - new Date(a.ngaydonhang));
            setListOdersChuaGiao(sortedOrders);
            console.log('Đơn hàng đã giao', sortedOrders)
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
        navigate('/dashboard/orders')
    }
    const handleMoveDaHuy = () => {
        navigate('/dashboard/ordersDaHuy')
    }
    const handleChiTietHoaDon = (madonhang) => {
        navigate(`/dashboard/ordersDaGiao/${madonhang}`);
    };
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
            <h2 className="text-success">Đơn hàng đã giao</h2>
            <div className="wrap">


                <button className="btn btn-secondary ml-4" onClick={handleBack}>
                    Trở về
                </button> <button className="btn btn-danger" onClick={handleMoveDaHuy}>
                    Thùng Rác
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr> <th>Mã Đơn Hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tài khoản</th>
                        <th>Thời gian</th>
                        <th>Thành tiền</th>
                        <th>Trạng thái</th>
                        <th className=" ">Thông tin chi tiết</th>

                    </tr>
                </thead>
                <tbody>
                    {ListOdersChuaGiao.map((order, index) => (
                        <tr key={index}>
                            <td>{order.madonhang}</td>
                            <td>{order.ten}</td>
                            <td>{order.taikhoan ? order.taikhoan : "Không xác định"}</td>
                            <td>{formatDate(order.ngaydonhang)}</td>
                            <td>{formatCurrency(order.thanhtien)}</td>
                            <td>{order.trangthai}</td>
                            <td>     <button class="btn btn-success d-block mx-auto" onClick={() => handleChiTietHoaDon(order.madonhang)}>
                                Chi Tiết Hóa Đơn
                            </button></td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListOrdersDaHuy;
