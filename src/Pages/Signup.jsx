import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Signup = () => {
  const { Title, Link } = Typography;
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = async(values) => {
    console.log("Success:", values);
    
    try {
      const result = await axios.post("http://localhost:5000/api/auth/register", {
        email: values.email,
        name:values.username,
        password: values.password,
      });
      console.log(result);
      if (result.status == 201) {
        openNotificationWithIcon("success");
        const token = result.data.data.token; //let's take some string 'dev' as token
        // Mock user data
        const userData = {
          username: values.email,
          token: token,
          password:result.data.data.password,
          id:result.data.data.userId
        };

        login(userData); // Call the login function from the context

        localStorage.setItem("token", JSON.stringify(token));
        navigate("/course");
      }
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "User Created Successful",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  return (
    <>
    {contextHolder}
      <div
        className="container d-flex 
         align-items-center 
         justify-content-center 
         min-vh-100  rounded-5"
        style={{
          marginTop: "5em",
          width: "600px",
          backgroundColor: "#f8f9fa",
          borderRadius: "15px",
        }}
      >
        <div className="row">
          <div className="col"></div>
          <div className="col" style={{ padding: "1em", margin: "1em" }}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Title className="text-center">Signup</Title>

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
                <Input />
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
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" variant="solid" htmlType="submit">
                  Submit
                </Button>
                <Link
                  onClick={(e) => navigate("/")}
                  style={{ marginLeft: "1.5em" }}
                >
                  Already have an account? Sign in.
                </Link>
              </Form.Item>
            </Form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Signup;
