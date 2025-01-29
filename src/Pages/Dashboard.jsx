import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Form, Input, Layout, notification, Progress, Row } from "antd";
const { Header, Footer, Content } = Layout;
import { Space, Typography } from "antd";

const { Title } = Typography;

import { Card } from "antd";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

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
  backgroundColor: "#fafafa",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#fafafa",
};
const layoutStyle = {
  borderRadius: 8,
  padding: "1em",
  overflow: "hidden",
  width: "calc(100% - 2px)",
  maxWidth: "calc(100% - 2px)",
  backgroundColor: "#ffff",
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "User Updated Successful",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    const items = JSON.parse(localStorage.getItem("data"));

    try {
      const result = await axios.put(`http://localhost:5000/api/auth/user_update/${items.id}`, {
        email: values.email,
        name:values.username,
        password: values.password,
      });
      console.log(result);
      if (result.status == 200) {
        openNotificationWithIcon("success");
      }
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const fetchApi = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/auth/course_list"
      );
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const items = JSON.parse(localStorage.getItem("data"));

  return (
    <>
    {contextHolder}
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Layout>
          <Content style={contentStyle}>
            <div className="container">
              <Title
                // type="secondary"
                level={2}
              >
                Dashboard
              </Title>
              <Title
                // type="secondary"
                level={5}
              >
                Enroll Course
              </Title>
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                {data?.map((item) => {
                  return (
                    <Col span={8}>
                      <Space
                        direction="vertical"
                        // size="middle"
                        style={{
                          display: "flex",
                        }}
                      >
                        {" "}
                        <Card
                          style={{
                            width: 350,
                          }}
                          cover={
                            <img
                              alt="example"
                              src={`http://localhost:5000/${item.image}`}
                            />
                          }
              
                        >
                          <Meta
                            avatar={
                              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title={item?.title}
                            description={item?.description}
                          />
                        </Card>
                      </Space>
                    </Col>
                  );
                })}
                <Col span={24} style={{ marginTop: "1em" }}>
                  <Card
                    title="Profile Edit"
                    bordered={false}
                    style={{
                      width: 1200,
                    }}
                  >
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      style={{
                        maxWidth: 900,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input placeholder={items?.username} />
                      </Form.Item>
                      <Form.Item
                        label=" Password"
                        name=" password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your  password!",
                          },
                        ]}
                      >
                        <Input.Password placeholder={items?.password}/>
                      </Form.Item>

                      <Form.Item label={null}>
                        <Button
                          type="primary"
                          variant="solid"
                          htmlType="submit"
                        >
                          Update
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </>
  );
};

export default Dashboard;
