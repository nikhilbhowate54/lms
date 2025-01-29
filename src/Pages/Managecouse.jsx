import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import Navbar from "../Components/Navbar";
import { Layout } from "antd";
import { Upload, Typography } from "antd";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const Managecouse = () => {
  const [datas, setDatas] = useState([]);
  const navigate =useNavigate()
  const confirm = Modal.confirm;
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Login Successful",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  function showDeleteConfirm(record) {
    console.log(record);
    
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async()=> {
        console.log('OK');
        const result = await axios.delete(`http://localhost:5000/api/auth/course_delete/${record._id}`)
        console.log(result);
        
        fetchApi()

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "ImageURL", // this is the value that is parsed from the DB / server side
      render: (t, r) => (
        <img
          alt={r}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          src={`http://localhost:5000/${r?.image}`}
        />
      ), // 'theImageURL' is the variable you must declare in order the render the URL
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>showDeleteConfirm(record)}>Delete</a>
        </Space>
      ),
    },
  ];
  const fetchApi = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/auth/course_list"
    );
    console.log(result);
    setDatas(result?.data);
  };
  useEffect(() => {
    fetchApi();
  }, []);
 
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
            <div className="container">
              <div class="get-quote">
                <div class="row">
                  <div class="col-sm-10 col-12">
                    <Title type="" level={2}>
                      Courses List
                    </Title>
                  </div>
                  <div class="col-sm-2 col-12">
                    <Button color="danger" variant="solid" onClick={()=>navigate('/add_course')}><PlusOutlined />Add Course</Button>
                  </div>
                </div>
              </div>

              <Table columns={columns} dataSource={datas} />
            </div>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </div>
  );
};

export default Managecouse;
