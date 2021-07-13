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
  const [cannotSend, setCannotSend] = useState(false);
  const [authCode, setAuthCode] = useState(''); // 验证码
  const [secondShowed, setSecondShowed] = useState("获取验证码");
	const location = useLocation();
  const history = useHistory();
  const params = location.search;
  const username = (params.split('?username='))[1]; // 获取用户名

  // 提交动作 - 邮箱验证
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios({
      method: 'get',
      url: 'http://120.24.39.199:8080/api/reset',
      params: {
        username,
        password: CryptoJs.MD5(values.password).toString(),
      }
    }).then((res) => {
      switch(res.data) {
        case "success": {
          history.replace('/login');
          message.info("密码重置成功，请重新登录", 2);
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

  // 发送验证码
  const sendAuthMessage = () => {
    message.info("验证码邮件已发送至邮箱，请注意查收", 2);
    axios({
      method: 'get',
      url: 'http://120.24.39.199:8080/api/email_reset',
      params: {
        username
      }
    }).then((res) => {
      setAuthCode(res.data + "")
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

  return (
    <LoginBox>
      <h1 className="title">密码重置</h1>
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


       {/* 密码 */}
        <Form.Item
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </LoginBox>
  );
};

export default RegistrationForm;