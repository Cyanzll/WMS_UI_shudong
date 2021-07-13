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
      url: 'http://120.24.39.199:8080/api/validate',
      params: {
        username: values.username,
        email: values.email,
      }
    }).then((res) => {
      switch(res.data) {
        case "wrong email": {
          message.warn("邮箱填写错误，请检查信息", 1);
          break;
        }
        case "success": {
          message.info("邮箱验证成功，进入下一步", 1);
          // 带参数的路由跳转
          history.replace(`/reset?username=${values.username}`);
          break;
        }
        default: {
          message.warn("与服务器连接失败，请重试", 2);
        }
      }
    }).catch(
      (e) => {
        console.log(e);
        //message.warn("用户名或密码错误，请重试", 1);
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

       {/* 密码 */}
{/*         <Form.Item
          name="password"
          label="新密码"
          rules={[
            {
              required: true,
              message: '密码为必填项'
            },
            {
              min: 3,
              message: '密码长度必须大于3'
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item> */}

{/*         <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入你的密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            })
          ]}
        >
          <Input.Password />
        </Form.Item> */}



{/*         <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              type: 'array',
              required: true,
              message: 'Please select your habitual residence!',
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item> */}

{/*         <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: true,
              message: 'Please input website!',
            },
          ]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
            <Input />
          </AutoComplete>
        </Form.Item> */}

{/*         <Form.Item
          name="gender"
          label="性别"
          rules={[
            {
              required: true,
              message: '请输入你的性别！',
            },
          ]}
        >
          <Select placeholder="性别">
            <Option value="male">男</Option>
            <Option value="female">女</Option>
            <Option value="other">保密</Option>
          </Select>
        </Form.Item> */}

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
{/* 
        <Form.Item 
        label="验证码" 
        extra="" 
        tooltip="请查收邮件，获取验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '请输入收到的验证码',
                  },
                  {
                    validator: (_, value) => {
                      return value == authCode ? Promise.resolve() : Promise.reject(new Error('验证码错误'))
                    }
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button 
              className="authmessage" 
              onClick={sendAuthMessage} 
              disabled={cannotSend}>
                {secondShowed}
                </Button>
            </Col>
          </Row>
        </Form.Item> */}

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