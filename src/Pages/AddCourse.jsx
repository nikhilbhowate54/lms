import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import Navbar from "../Components/Navbar";
import { Col, Layout, Row } from "antd";
import { Upload, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const AddCourse = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Course Successfully Added",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values.image[0].originFileObj);
    let formData = new FormData();
    formData.append("image", values.image[0].originFileObj);
    formData.append("description", values.description);
    formData.append("link", values.link);
    formData.append("title", values.title);
    const result = await axios.post(
      "http://localhost:5000/api/add_course",
      formData
    );
    console.log(result);
    if (result.status == 201) {
      setTimeout(() => {
        openNotificationWithIcon("success");
        
      }, 900);
      
      navigate(-1);ccc
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
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
    <>
    {contextHolder}
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Layout>
          <Content style={contentStyle}>
            <div className="container">
              <Title type="" level={2}>
                Add Courses
              </Title>
              <Form
                layout={formLayout}
                form={form}
                name="basic"
                initialValues={{
                  layout: formLayout,
                }}
                style={{
                  maxWidth: "100%",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Link"
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: "Please input your link!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <TextArea placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  name="image"
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      required: true,
                      message: "Please input your upload!",
                    },
                  ]}
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <button
                      style={{
                        border: 0,
                        background: "none",
                      }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </button>
                  </Upload>
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </>
  );
};

export default AddCourse;
