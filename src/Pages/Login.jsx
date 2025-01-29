import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Typography, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { Title, Text, Link } = Typography;
  const navigate = useNavigate();
  const { login } = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Login Successful",
      // description:
      //   "This is the content of the notification.
      //   This is the content of the notification. This is the content of the notification.",
    });
  };
  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      const result = await axios.post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      });
      console.log(result);

      if (result.status == 200) {
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
        if (result.data.data.email === "admin@admin.com") {
          navigate("/manage_course");
        } else {
          setTimeout(() => navigate("/course"), 1000);
        }
      }
    } catch (error) {}
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              <Title className="text-center">Login</Title>

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
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
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
                  onClick={(e) => navigate("/signup")}
                  style={{ marginLeft: "1.5em" }}
                >
                  New User ? Create an Account
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

export default Login;
