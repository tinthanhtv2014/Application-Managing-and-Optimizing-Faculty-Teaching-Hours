import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "../../../components/iconify";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import axios from "axios";
import bag from "../../../../public/assets/icons/glass/ic_glass_bag.png";
import buy from "../../../../public/assets/icons/glass/ic_glass_buy.png";
import shoes from "../../../../public/assets/icons/glass/shoes.png";
import user from "../../../../public/assets/icons/glass/ic_glass_users.png";

// ----------------------------------------------------------------------

function AppView() {
  const currentDate = new Date();
  const [Thongke, setThongke] = useState("");
  const [SoTien, setThongKeTien] = useState("");
  const [Tongsodonhang, setThongKeTongSoDonHang] = useState("");
  const [TongsoGiay, setTongsoGiay] = useState("");
  const [TongSoCacHangBanDuoc, setTongSoCacHangBanDuoc] = useState(null);
  const [TongSoLuongUser, setTongSoLuongUser] = useState(null);
  const [TongSoCacHangBanDuoctheonam, setTongSoCacHangBanDuoctheonam] =
    useState(null);
  const [TongSoCacLoaiGiayBanDuoc, setTongSoCacLoaiGiayBanDuoc] =
    useState(null);
  const [currentMonth, setcurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setcurrentYear] = useState(currentDate.getFullYear());

  const [bestSellingProductOfMonth, setbestSellingProductOfMonth] =
    useState(null);

  const [CountUser, setCountUser] = useState(null);
  useEffect(() => {
    fetchData();
    fetchDataTAA();
    fetchDataTAA3A();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/v1/productThongke"
      );
      setThongke(response.data.DT);
      console.log(response.data.DT);
      setThongKeTien(response.data.DT.results[0].TotalPrice);
      setThongKeTongSoDonHang(response.data.DT.results1[0].Totalsoluongdonhang);
      setTongsoGiay(response.data.DT.results2[0].Totalsoluongsanpham);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataTAA = async () => {
    try {
      // Gửi tất cả các yêu cầu song song
      const [responseUser, response1, response2, response3, response4] = await Promise.all([
        axios.get("http://localhost:3003/api/v1/countuser"),
        axios.get("http://localhost:3003/api/v1/productall/hang"),
        axios.get("http://localhost:3003/api/v1/productall/loai"),
        axios.post("http://localhost:3003/api/v1/productall/thang", {
          nam: currentYear,
          thang: currentMonth,
        }),
        axios.get("http://localhost:3003/api/v1/productall/nam"),
      ]);

      // Cập nhật state với dữ liệu nhận được
      setTongSoLuongUser(responseUser.data);
      setTongSoCacHangBanDuoc(response1.data.DT);
      setTongSoCacLoaiGiayBanDuoc(response2.data.DT);
      setbestSellingProductOfMonth(response3.data.DT);
      setTongSoCacHangBanDuoctheonam(response4.data.DT);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTAA3A = async () => {
    try {
      const responseUser = await axios.get(
        "http://localhost:3003/api/v1/countuser"
      );
      setTongSoLuongUser(responseUser.data.DT[0].totalUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(TongSoCacHangBanDuoctheonam)
  if (
    !TongSoCacHangBanDuoc ||
    !TongSoCacLoaiGiayBanDuoc ||
    !bestSellingProductOfMonth ||
    !TongSoCacHangBanDuoctheonam
  ) {
    return <div>Loading...</div>;
  }
  const series = TongSoCacHangBanDuoc.map((item) => ({
    label: item.Hang,
    value: item.TongSoSanPhamDaBan,
  }));
  const seriesXuHuong = TongSoCacLoaiGiayBanDuoc.map((item) => ({
    label: item.Loai,
    value: item.TongSoSanPhamDaBan,
  }));
  const seriesBestProductSelling = bestSellingProductOfMonth.map((item) => ({
    label: item.TenSanPham,
    value: item.TongSoSanPhamDaBan,
  }));


  const soluongdonhangtheonam = TongSoCacHangBanDuoctheonam.map(
    (item, index) => ({
      label: item.Nam,
      value: item.Thang,
    })
  );
  const soluongtongdonhangtheonam = TongSoCacHangBanDuoctheonam.map(
    (item, index) => ({
      label: item.SoLuongDonHang,
      value: item.TongTien,
    })
  );
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số tiền bán được"
            total={SoTien}
            color="success"
            icon={<img alt="icon" src={bag} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng khách hàng đăng ký"
            total={TongSoLuongUser}
            color="info"
            icon={<img alt="icon" src={user} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số tất cả đơn hàng"
            total={Tongsodonhang}
            color="warning"
            icon={<img alt="icon" src={buy} />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Tổng số lượng sản phẩm"
            total={TongsoGiay}
            color="error"
            icon={<img alt="icon" src={shoes} />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Tổng số đơn hàng bán được theo năm"
            // subheader="(+43%) than last year"
            chart={{
              labels: soluongdonhangtheonam.map(
                (item) => `${item.label} ${item.value}`
              ),
              series: [
                {
                  name: "Doanh thu",
                  type: "column",
                  fill: "solid",
                  data: soluongtongdonhangtheonam.map(
                    (item) => `${item.value}`
                  ),
                },

                // {
                //   name: "Team C",
                //   type: "line",
                //   fill: "solid",
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
          ;
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ khách hàng mua giày theo các hãng"
            chart={{
              series: series,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Tổng số đơn hàng bán được theo năm"
            // subheader="(+43%) than last year"
            chart={{
              labels: soluongdonhangtheonam.map(
                (item) => `${item.label} ${item.value}`
              ),
              series: [
                {
                  name: "Đơn hàng",
                  type: "area",
                  fill: "gradient",
                  data: soluongtongdonhangtheonam.map(
                    (item) => `${item.label}`
                  ),
                },
                // {
                //   name: "Team C",
                //   type: "line",
                //   fill: "solid",
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ],
            }}
          />
          ;
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Xu hướng mua giày của khách hàng"
            chart={{
              series: seriesXuHuong,
            }}
          />
        </Grid>
        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default AppView;
