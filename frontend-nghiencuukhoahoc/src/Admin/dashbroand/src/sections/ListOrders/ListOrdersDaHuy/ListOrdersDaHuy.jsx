import { useState, useEffect } from "react";
import axios from "axios";
import '../ListOrders.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListOrdersDaGiao = () => {
    const navigate = useNavigate()
    const [ListOdersChuaGiao, setListOdersChuaGiao] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3003/api/v1/donhangdahuy");
            setListOdersChuaGiao(response.data.DT);
            console.log('check data', response.data);
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

    const handleDelete = async (madonhang) => {
        console.log(madonhang);
        try {
            const response = await axios.delete(`http://localhost:3003/api/v1/donhanghuy/info/delete`,
                {
                    params: { madonhang: madonhang },
                }
            );

            console.log('check handleHuyDon', response.data);
            if (response.data.EC === 1) {
                toast.success('Hủy đơn thành công ^^!');
                fetchData();
            } else {
                toast.error(response.data.EM);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error('Đã xảy ra lỗi O.o !');
        }
    };

    const handleBack = () => {
        navigate('/dashboard/orders')
    }
    const handleMoveDaGiao = () => {
        navigate('/dashboard/ordersDaGiao')
    }
    return (
        <>
            <h2 className="text-danger">Thùng Rác Đơn Hàng</h2>
            <div className="wrap">

                <button className="btn btn-secondary" onClick={handleBack}>
                    Trở về
                </button>
                <button className="btn btn-success ml-4" onClick={handleMoveDaGiao}>
                    Đơn hàng đã giao
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr> <th>Mã Đơn Hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Tài Khoản</th>
                        <th>Thời gian</th>
                        <th>Thành tiền</th>
                        <th>Trạng thái</th>

                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {ListOdersChuaGiao.map((order, index) => (
                        <tr key={index}>
                            <td>{order.madonhang}</td>
                            <td>{order.ten}</td>
                            <td>{order.taikhoan ? order.taikhoan : "Không xác định"}</td>
                            <td>{new Date(order.ngaydonhang).toLocaleString()}</td>
                            <td>{formatCurrency(order.thanhtien)}</td>
                            <td>{order.trangthai}</td>

                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(order.madonhang)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListOrdersDaGiao;
