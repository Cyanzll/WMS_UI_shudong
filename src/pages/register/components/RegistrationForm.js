import React, { useState } from 'react';
import { LoginBox } from '../style';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import axios from 'axios';

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
  let username_is_exist = false;
  // 提交动作
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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
              message: '用户名不得为空',
              whitespace: true,
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
                  if(res.data === "unknown username" && value != '') {
                    return
                  } else throw new Error('用户名已存在')
                })

                // 必须catch，否则报错
                promise.catch((e) => {
                  console.log(e)
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
              message: '电子邮箱不得为空',
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
              message: '密码不得为空',
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
              message: '请重新输入你的密码',
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
              required: true,
              message: '请输入有效的电话号码！',
            },
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
              <Button>获取验证码</Button>
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