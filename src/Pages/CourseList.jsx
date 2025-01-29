import React, { useEffect, useState } from "react";
import { Col, Layout, Row } from "antd";
const { Header, Footer, Content } = Layout;
import { Space, Typography } from "antd";

const { Title } = Typography;
import { PlusCircleOutlined } from "@ant-design/icons";

import { Avatar, Card } from "antd";
import image1 from "../assets/c.jpeg";
import image2 from "../assets/java.jpeg";
import image3 from "../assets/py.jpeg";
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

const CourseList = () => {
  const [data, setData] = useState([]);
  const navigate =useNavigate()
  // const data = [
  //   {
  //     id: 1,
  //     title:
  //       "Python Mastery: Learn Python Programming from Scratch to Advanced 🚀🐍",
  //     image: image3,
  //     description:
  //       "Learn Python programming from scratch to advanced levels! 🐍 Master core concepts, automation, data analysis, and web development with hands-on projects. Perfect for beginners and pros. Enroll now to start coding smarter! 🚀",
  //   },
  //   {
  //     id: 2,
  //     title: "Master Java Programming | Learn from Scratch",
  //     image: image2,
  //     description:
  //       "Unlock your coding potential with our comprehensive Java programming course. From beginner to advanced concepts, learn everything you need to build powerful applications. Start coding today!",
  //   },
  //   {
  //     id: 3,
  //     title: "Master C++: Fast-Track Coding Course",
  //     image: image1,
  //     description:
  //       "Learn C++ programming from scratch with this comprehensive course! Master key concepts, from basics to advanced, and build real-world projects. Perfect for beginners and aspiring developers. Start your coding journey today!",
  //   },
  // ];
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
  console.log(data);
  
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
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
                Courses
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
                          cover={<img alt="example" src={`http://localhost:5000/${item.image}`}/>}
                          actions={[
                            <div onClick={()=>{
                              navigate('/course_detail', { state: item });
                            }}>
                              {" "}
                              Buy Now
                              {/* <PlusCircleOutlined
                                style={{ color: "#eb2f96", fontSize: "1em" }}
                                key="setting"
                              /> */}
                            </div>,
                            // <MinusCircleOutlined   style={{ color: "green", fontSize: "2em" }} key="edit" />,
                            // <EllipsisOutlined key="ellipsis" />,
                          ]}
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
              </Row>
            </div>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </>
  );
};

export default CourseList;
