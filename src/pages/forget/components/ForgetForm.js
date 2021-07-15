import React, { useState } from 'react';
import { LoginBox } from '../style';
import { message } from 'antd';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import axios from 'axios';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [cannotSend, setCannotSend] = useState(false);
  const [authCode, setAuthCode] = useState(''); // 验证码
  const [secondShowed, setSecondShowed] = useState("获取验证码");
	const history = useHistory();
	const location = useLocation();
  
  // 提交动作 - 邮箱验证
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios({
      method: 'get',
      url: 'http://120.24.39.199:8080/api/validate_email',
      params: {
        username: values.username,
        email: values.email,
      }
    }).then((res) => {
      message.info("邮箱验证成功，进入下一步", 1);
      // 带参数的路由跳转
      history.replace(`/reset?username=${values.username}`);
    }).catch(
      (e) => {
        switch(e.response.data.message) {
          case "email error": {
            message.warn("邮箱填写错误，请检查信息", 1);
            break;
          }
          case "username not exist": {
            message.warn("用户不存在", 1);
            break;
          }
          default: {
            message.warn("与服务器连接失败，请重试", 2);
          }
        }
      }
    );
  };

  return (
    <LoginBox>
      <h1 className="title">邮箱验证</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        {/* 用户名 */}
        <Form.Item
          name="username"
          label="用户名"
          tooltip="输入需要重置密码的用户名"
          rules={[
            {
              required: true,
              message: '用户名为必填项',
              whitespace: true,
            },
            {
              message: '用户名应不小于3个字母',
              min: 3
            }
          ]}
        >
          <Input />
        </Form.Item>

        {/* 邮箱 */}
        <Form.Item
          name="email"
          label="E-mail"
          tooltip="请输入注册时输入的邮箱"
          rules={[
            {
              type: 'email',
              message: '请输入有效的电子邮件地址',
            },
            {
              required: true,
              message: '电子邮箱为必填项',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </LoginBox>
  );
};

export default RegistrationForm;