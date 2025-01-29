import React, { useState } from "react";
import { Menu, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../AuthContext";
import { useNavigate ,Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const items = JSON.parse(localStorage.getItem("data"));
console.log('items',items);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Logout Successful",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  return (
    <>
    {contextHolder}
      {/* <Menu
            onClick={onClicks}
            selectedKeys={[current]}
            mode="horizontal"

            items={menus}
          /> */}
      <Menu mode="horizontal" className="ml-bg-primary border-r-none">
        {items.username === "admin@admin.com" ? (
          <Menu.Item style={{ fontSize: "18px" }}>
            {" "}
            <Link to="/manage_course">Manage Course</Link>{" "}
          </Menu.Item>
        ) : (
          <>
            {" "}
            <Menu.Item style={{ fontSize: "18px" }}><Link to='/dashboard'>Dashboard</Link> </Menu.Item>
            <Menu.Item style={{ fontSize: "18px" }}> <Link to='/course'>Course</Link> </Menu.Item>
          </>
        )}

        <Menu.SubMenu
          style={{ marginLeft: "71em", fontSize: "18px" }}
          title={<UserOutlined style={{ fontSize: "1.3em" }} />}
        >
          <Menu.Item
            onClick={() => {
              logout();
              setTimeout(() =>  navigate("/"), 1000);
              openNotificationWithIcon("success");
            }}
          >
            logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};

export default Navbar;
