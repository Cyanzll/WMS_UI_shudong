import React, { useState } from 'react';
import { LoginBox } from '../style';
import { message } from 'antd';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import CryptoJs from 'crypto-js' // MD5加密模块

const { Option } = Select;

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
  const location = useLocation();
  const [cannotSend, setCannotSend] = useState(false);
  const [authCode, setAuthCode] = useState(''); // 验证码
  const [secondShowed, setSecondShowed] = useState("获取验证码");
	const history = useHistory();

  // 注册 - #axios
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios({
      method: 'get',
      url: 'http://120.24.39.199:8080/api/register',
      params: {
        username: values.username,
        password: CryptoJs.MD5(values.password).toString(),
        email: values.email,
        phone: values.phone
      }
    }).then(() => {
        history.replace('/login');
        message.info("注册成功，请登录", 2);
    }).catch(
      (e) => {
        switch(e.response.data.message) {
          case "invalid username": {
            message.warn("用户名格式不正确，请重试", 1);
            break;
          }
          case "duplicate username": {
            message.warn("该用户已存在", 1);
            break;
          }
          default: {
            message.warn("请联系管理员", 1);
          }
        }
      }
    );
  };

  // 发送验证码 - #axios
  const sendAuthMessage = () => {
    let toEmail = form.getFieldValue('email');
    let pattern = /^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(!pattern.test(toEmail)) {
      message.warn("请输入正确的邮件格式", 1);
      return;
    }
    axios({
      method: 'get',
      url: 'http://120.24.39.199:8080/api/email_auth_code_reg',
      params: {
        to: toEmail
      }
    }).then((res) => {
      setAuthCode(res.data.message + "")
    }) 
    const WAIT_TIME = 30;
    const MS = 1000;
    let second = WAIT_TIME;
    setCannotSend(true); // 按钮被禁止
    let timeout = setInterval(() => {
      setSecondShowed(second + "s");
      second = second - 1;
      if(second == 0) {
        setCannotSend(false);  // 按钮被允许
        clearInterval(timeout); // 停止计时
        setSecondShowed("获取验证码");
        second = WAIT_TIME;
      }
    }, MS);
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );


  return (
    <LoginBox>
      <h1 className="title">注册 | Register</h1>
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
          tooltip="用户名将用于系统登录"
          rules={[
            {
              required: true,
              message: '用户名为必填项',
              whitespace: true,
            },
            {
              message: '用户名应不小于3个字母',
              min: 3
            },
            ({ getFieldValue }) => ({
              // 登录框验重 - #axios - 请修改前理解 Promise 对象
              validator(_, value) {
                let username = getFieldValue('username');
                // 不符合格式要求的用户名不参与校验
                if(typeof(value) != "string" || value.length < 3) {
                  return Promise.reject()
                }
                // 返回 Promise 对象
                let promise = axios({
                  method: 'get',
                  url: 'http://120.24.39.199:8080/api/login',
                  params: {
                    username,
                    password: ''
                  }
                })
                .then((res) => {

                  // 这里返回的不可能是 200，直接走catch

                }).catch((e) => {
                  console.log(e.response)
                  if(e.response.data.message === "username not exist") {
                    return
                  } else throw new Error('用户名已存在')
                })

                // 必须catch，否则报错
                promise.catch((e) => {
                  // console.log(e)
                })

                return promise;

              }})
          ]}
        >
          <Input />
        </Form.Item>



       {/* 密码 */}
        <Form.Item
          name="password"
          label="密码"
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
        </Form.Item>

        <Form.Item
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
        </Form.Item>



        {/* 联系方式 */}
        <Form.Item
          name="phone"
          label="联系方式"
          rules={[
            {
              message: '请输入有效的电话号码',
              pattern: new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
            },
            {
              required: true,
              message: '电话号码为必填项',
            }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>



        {/* 邮箱 */}
        <Form.Item
          name="email"
          label="E-mail"
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



        {/* 验证码 */}
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
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('必须勾选才能进行下一步')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            我对上述内容的真实性负责 <a href=""></a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </LoginBox>
  );
};

export default RegistrationForm;