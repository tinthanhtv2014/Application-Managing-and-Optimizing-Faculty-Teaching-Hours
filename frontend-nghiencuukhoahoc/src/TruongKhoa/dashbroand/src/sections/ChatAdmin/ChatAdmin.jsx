import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./ChatAdmin.css";
import { useNavigate } from "react-router-dom";
import { user } from "@nextui-org/react";
import avat from "../../../public/assets/images/avatars/lufy2.jpg";
const ENDPOINT = "http://localhost:3001"; // Địa chỉ của server Node.js

const ChatAdmin = () => {
  const navigate = useNavigate();
  const [inputMess, setinputMess] = useState("");
  const [inputUser, setinputUser] = useState("");
  const [listUser, setListUser] = useState([]);
  const [NguoiMaBanMuonNhanTin, setNguoiMaBanMuonNhanTin] = useState();

  const [IdCoversation, setIdCoversation] = useState("");

  const id = useParams();
  const [userId, setUserId] = useState('');
  const [ImageUserWantMess, setImageUserWantMess] = useState();
  const [IdAdminChat, setIdAdminChat] = useState('');
  const idValue = Object.values(id)[0];
  console.log("id nguoi set vata", idValue);
  const [TinNhan, setTinNhan] = useState([]);
  const [ShowMenuAvatar, setShowMenuAvatar] = useState(false);
  const [DataAllUserBackend, setDataAllUserBackend] = useState([])
  const [avatarUrl, setAvatarUrl] = useState('');
  const [AvataKH, setAvataKH] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const handleShowMenuAvatar = () => {
    setShowMenuAvatar(!ShowMenuAvatar);
  };
  const tokenSetStorage = sessionStorage.getItem("accessToken");

  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });


  useEffect(() => {
    // Thiết lập kết nối với server socket
    const socket = io(ENDPOINT);

    // Lắng nghe sự kiện "message" từ server
    socket.on("message", (data) => {
      // Trích xuất tin nhắn từ dữ liệu nhận được
      const newMessage = data.messageNe;
      // Cập nhật state TinNhan bằng cách thêm tin nhắn mới vào mảng tin nhắn đã có
      setTinNhan((prevMessages) => [...prevMessages, newMessage]);
    });

    // Ngắt kết nối khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const [ImageOfMe, setImageOfMe] = useState();
  const [NameOfMe, setNameOfMe] = useState();
  console.log("imageofme=>", ImageOfMe);

  useEffect(() => {
    const fetchListUser = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}/allusers`);
        // Lọc dữ liệu để chỉ lấy user có _id trùng với idValue
        const filteredUsers = response.data.filter(
          (user) => user._id === idValue
        );
        // Lưu danh sách người dùng đã lọc vào state
        setListUser(filteredUsers);
        // Nếu có user trong danh sách đã lọc, thì lấy ảnh của user đầu tiên và lưu vào state
        if (filteredUsers.length > 0) {
          setImageOfMe(filteredUsers[0].avt);
          setNameOfMe(filteredUsers[0].username);
        }
      } catch (error) {
        console.error("Error fetching list of users:", error);
      }
    };

    fetchListUser(); // Gọi hàm lấy danh sách người dùng khi component được tạo
  }, [idValue]); // Thêm idValue vào dependency array để useEffect được gọi lại khi idValue thay đổi

  useEffect(() => {
    const fetchListUser = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}/allusers`);
        setListUser(response.data);
      } catch (error) {
        console.error("Error fetching list of users:", error);
      }
    };

    fetchListUser(); // Gọi hàm lấy danh sách người dùng khi component được tạo
  }, []);
  const handleIconCaVoi = async () => {
    try {
      // Gửi yêu cầu POST đến server
      const usernameAdmin = 'admin'
      const response = await axios.post(
        "http://localhost:3001/api/addMessageToConversation",
        {
          senderUserId: usernameAdmin, // ID của người gửi tin nhắn
          content: "🐳", // Nội dung của tin nhắn
          conversationId: IdCoversation, // ID của cuộc trò chuyện
        }
      );
      console.log("id", idValue, "mess", inputMess, "coverid=>", IdCoversation);
      console.log("backend gui len ne =>", response.data.messageNe.message);

      // Nếu yêu cầu thành công, in ra thông báo "Gửi tin nhắn thành công"
      console.log("Gửi tin nhắn thành công");

      setinputMess("");
      const responseMess = await axios.post(
        "http://localhost:3001/api/getMessages",
        {
          conversationId: IdCoversation, // Truyền id của user đó xuống server
        }
      );
      setTinNhan(responseMess.data);

      // Nếu bạn cần xử lý dữ liệu trả về từ server, bạn có thể làm ở đây
      // Ví dụ: const data = response.data;
    } catch (error) {
      // Nếu có lỗi xảy ra, in ra thông báo lỗi
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };
  const SendMessNe = async () => {
    if (!inputMess) {
      return;
    }
    const usernameAdmin = 'admin'
    console.log('check conversationId', IdCoversation)

    try {
      // Gửi yêu cầu POST đến server
      if (IdCoversation && IdAdminChat && inputMess) {
        const response = await axios.post(
          `${ENDPOINT}/api/addMessageToConversation`,
          {
            senderUserId: usernameAdmin, // ID của người gửi tin nhắn
            content: inputMess, // Nội dung của tin nhắn
            conversationId: IdCoversation, // ID của cuộc trò chuyện
          }
        );
        console.log("id", IdAdminChat, "mess", inputMess, "coverid=>", IdCoversation);
        console.log("backend gui len ne =>", response.data.messageNe.message);

        setinputMess("");

      }


      // Nếu yêu cầu thành công, in ra thông báo "Gửi tin nhắn thành công"
      console.log("Gửi tin nhắn thành công");

      // Cập nhật tin nhắn mới vào state

      console.log('check conversationId2', IdCoversation)
      if (IdCoversation) {
        console.log('id cuoc tro chuyen', IdCoversation)
        const responseMess = await axios.post(
          `${ENDPOINT}/api/getMessages`,
          {
            conversationId: IdCoversation,
          }
        );
        setTinNhan(responseMess.data);

      }


      // Nếu bạn cần xử lý dữ liệu trả về từ server, bạn có thể làm ở đây
      // Ví dụ: const data = response.data;
    } catch (error) {
      // Nếu có lỗi xảy ra, in ra thông báo lỗi
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };
  const sendMessage = () => {
    alert("oke");
    const newMessage = { IdUserSend: idValue, message: inputMess };

    axios
      .post(`${ENDPOINT}/messages`, newMessage)
      .then(() => {
        setinputMess("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  const handlePressEnter = async (event) => {
    if (event.charCode == 13) {
      await SendMessNe();
      event.preventDefault();
    }
  };


  const handleUserIb = async (user) => {
    setSelectedUser(user.taikhoan);
    setAvataKH(user.avatar)
    console.log('check avata =>', user.avatar)
    try {
      const response = await axios.get(`http://localhost:3001/api/getUserByUsername/${user.taikhoan}`);
      const { userId } = response.data;
      setUserId(userId);
      console.log('check id user', userId)

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('User not found');
      } else {

        console.log('An error occurred during the search.');
      }
    }
    const usernameAdmin = 'admin'
    try {
      const response = await axios.get(`http://localhost:3001/api/getUserByUsername/${usernameAdmin}`);
      const { userId } = response.data;
      setIdAdminChat(userId);
      console.log('check id user', userId)

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('User not found');
      } else {

        console.log('An error occurred during the search.');
      }
    }
    // console.log('check cai nay di', IdAdminChat)
    // console.log('check cai nay di2', userId)
    try {
      if (IdAdminChat, userId) {
        // Gửi yêu cầu POST đến server
        const response = await axios.post(
          "http://localhost:3001/api/createConversation",
          {
            participants: [IdAdminChat, userId], // Truyền id của user đó xuống server
          }
        );
        setIdCoversation(response.data.conversationId);
        console.log("id conver =>", IdCoversation);
      }
      if (IdCoversation) {
        const responseMess = await axios.post(
          "http://localhost:3001/api/getMessages",
          {
            conversationId: IdCoversation, // Truyền id của user đó xuống server
          }
        );
        setTinNhan(responseMess.data);

        console.log("check tin nhắn1 =>", responseMess.data);
      }



      // Nếu yêu cầu thành công, in ra thông báo "Tạo cuộc trò chuyện thành công"
      console.log("Tạo cuộc trò chuyện thành công");
      setNguoiMaBanMuonNhanTin(Object.values(user)[2]);
      console.log('check nguoi ban muon nhan tin', Object.values(user)[2])

      setImageUserWantMess(Object.values(user)[7]);
      // Nếu bạn cần xử lý dữ liệu trả về từ server, bạn có thể làm ở đây
      // Ví dụ: const data = response.data;
    } catch (error) {
      // Nếu có lỗi xảy ra, in ra thông báo lỗi
      console.error("Lỗi khi tạo cuộc trò chuyện:", error);
    }
  };

  // Lấy giá trị của thuộc tính không rõ tên
  console.log(TinNhan);

  const chatContainerRef = useRef(null);



  // --------------------------------------------------------
  useEffect(() => {
    const scrollToBottom = () => {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    };
    scrollToBottom();
  }, [TinNhan]);

  // .................CẬP NHẬT AVATAR..............................
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AllUser = await axiosWithCredentials.get("http://localhost:3003/api/v1/user");
        setDataAllUserBackend(AllUser.data.DT);
        setAvatarUrl(AllUser.data.DT)

        console.log("=>user", AllUser.data.DT);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [])
  console.log("nguoima ban muon nhan tin =>", NguoiMaBanMuonNhanTin);
  console.log('check tin nhan TIN NHAN =>', TinNhan)
  return (
    <>
      <div className="container-chat-admin">
        <div className="container-chat-admin-headerListUser">
          {DataAllUserBackend.map((users) => (
            <div className={`headerListUser ${selectedUser === users.taikhoan ? 'selected' : ''}`} onClick={() => handleUserIb(users)}>
              <img
                src={users.avatar ? `http://localhost:3003/images/${users.avatar}` : `http://localhost:3003/images/avatatrang.jpg`}
                className="headerListUser-avata"
                alt="User Avatar"
              />

              <p>{users.ten ? users.ten : "Người Bí Ẩn"}</p>
            </div>

          ))}
        </div>
        <div className="chat-container" ref={chatContainerRef}>
          {TinNhan.map((message) => (
            <div key={message._id} className={`message ${message.username !== 'admin' ? 'message-left' : 'message-right'}`}>
              {message.username === 'admin' && (
                <div className="container-messCha2">
                  <div className="container-noidungtinnhan2">
                    <p className="noidungtinnhan2">
                      {message.message}
                    </p>
                  </div>
                </div>
              )}
              {message.username !== 'admin' && (
                <div className="container-messCha">
                  <img
                    className="NoiDungChat-NoiDung-1-TinNhan-Avt image-Avta"
                    src={AvataKH ? `http://localhost:3003/images/${AvataKH}` : `${avat}`}
                    alt="User Avatar"
                  />

                  <div className="container-noidungtinnhan">
                    <p className="noidungtinnhan">
                      {message.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>





        <div className="container-chat-realtime-sendAdmin">
          <div className="NoiDungChat-thanhChat-Input">
            <input
              className="NoiDungChat-thanhChat-Input-1"
              placeholder="Aa"
              type="text"
              value={inputMess}
              onChange={(e) => setinputMess(e.target.value)}
              onKeyPress={(event) => handlePressEnter(event)}
            ></input>
          </div>
          <div className="NoiDungChat-thanhChat-3">
            <img
              onClick={handleIconCaVoi}
              className="CavoiCute"
              alt="🐳"
              src="https://static.xx.fbcdn.net/images/emoji.php/v9/tde/1.5/20/1f433.png"
            ></img>
          </div>
        </div>
      </div >
    </>
  );
};

export default ChatAdmin;
