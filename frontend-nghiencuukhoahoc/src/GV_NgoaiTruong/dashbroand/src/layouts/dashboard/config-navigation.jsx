import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Thông tin cá nhân",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "Phân công của tôi",
    path: "/phan-cong-cua-toi",
    icon: icon("ic_user"),
  },
  {
    title: "Báo Cáo Kết Thúc Môn",
    path: "/bao-cao-ket-thuc-mon",
    icon: icon("ic_cart"),
  },
];

export default navConfig;
