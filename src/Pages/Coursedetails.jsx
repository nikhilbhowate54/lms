import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import Navbar from "../Components/Navbar";
import { Layout } from "antd";
import { Typography } from "antd";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const Coursedetails = () => {
  const navigate = useNavigate();
  const confirm = Modal.confirm;
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Course Enroll",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  function showDeleteConfirm(record) {
    console.log(record);

    confirm({
      title: "Are you sure delete this task?",
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        console.log("OK");
        const result = await axios.delete(
          `http://localhost:5000/api/auth/course_delete/${record._id}`
        );
        console.log(result);

        fetchApi();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const { state } = useLocation();
  console.log(state);

  const { TextArea } = Input;
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#ffff",
    marginBottom: "1em",
  };
  const contentStyle = {
    //   textAlign: "center",
    minHeight: 450,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#ffff",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#ffff",
  };
  const layoutStyle = {
    borderRadius: 8,
    padding: "1em",
    overflow: "hidden",
    width: "calc(100% - 2px)",
    maxWidth: "calc(100% - 2px)",
    backgroundColor: "#ffff",
  };
  return (
    <div>
      {contextHolder}
      <Layout style={layoutStyle}>
        {/* <img src={`http://localhost:5000/${datas[0].image}`} alt="" /> */}
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Layout>
          <Content style={contentStyle}>
            <div className="inner-banner">
              {" "}
              <div className="container">
                <div class="get-quote">
                  <div className="row">
                    <div className="col-lg-8">
                      <Title type="" level={3}>
                        {state?.title}
                      </Title>
                      <Title type="" level={5}>
                        {state?.description}
                      </Title>
                    </div>
                    <div className="col-lg-4">
                      <div className="sidebar-sec">
                        <div className="video-sec vid-bg">
                          <div className="card">
                            <div className="card-body">
                              <ReactPlayer
                                width="100%"
                                height="80%"
                                className="video-thumbnail"
                                url="https://youtu.be/ItGxewEdpaQ?si=4ChhN4lJK2s9O5YJ"
                              />
                              <div className="video-details">
                                <div className="course-fee">
                                  <h2
                                    style={{
                                      color: "ActiveCaption",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    FREE
                                  </h2>
                                </div>
                                <button
                                  onClick={() => {
                                    openNotificationWithIcon("success")
                                    setTimeout(() => navigate("/dashboard"), 1000);

                                  
                                  }}
                                  style={{ width: "100%" }}
                                  className="btn btn-enroll w-100"
                                >
                                  Enroll Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </div>
  );
};

export default Coursedetails;
