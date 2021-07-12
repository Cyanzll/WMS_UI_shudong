import React, { useState } from 'react';
import { LoginBox } from '../style';
import { message } from 'antd';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

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
  const [secondShowed, setSecondShowed] = useState("获取验证码");
	const history = useHistory();
  // 提交动作
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/reg',
      params: {
        username: values.username,
        password: values.password
      }
    }).then((res) => {
      switch(res.data) {
        case "success": {
          history.replace('/login');
          message.info("注册成功，请登录", 2);
          break;
        }
        default: {
          //message.warn("请联系管理员", 1);
        }
      }
    }).catch(
      (e) => {
        console.log(e);
        //message.warn("用户名或密码错误，请重试", 1);
      }
    );
  };

  // 发送验证码
  const sendAuthMessage = () => {
    const WAIT_TIME = 30;
    const MS = 1000;
    let second = WAIT_TIME;
    setCannotSend(true); // 按钮被禁止
    let timeout = setInterval(() => {
      second = second - 1;
      setSecondShowed(second + "s");
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
          tooltip="用户名用于登录"
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
              // 精髓
              validator(_, value) {
                let username = getFieldValue('username');
                // 返回 Promise 对象
                let promise = axios({
                  method: 'get',
                  url: 'http://localhost:8080/api/login',
                  params: {
                    username,
                    password: ''
                  }
                })
                .then((res) => {
                  if(res.data === "unknown username") {
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

        {/* 邮箱 */}
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: '电子邮箱格式无效',
            },
            {
              required: true,
              message: '电子邮箱为必填项',
            },
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

        <Form.Item label="验证码" extra="">
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