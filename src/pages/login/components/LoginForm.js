import React from 'react';
import { LoginBox } from '../style';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { Input, Button, ErrorInfo, AffixWrapper } from '../style';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CryptoJs from 'crypto-js' // MD5加密模块

// 使用了Formik配合Yup完成输入验证

const LoginForm = () => {

	const location = useLocation();
	const history = useHistory();

	// 路由
	const {from} = location.state || {from: {pathname: '/'}};

	const formik = useFormik ({

		initialValues: {
			username: '',
			password: ''
		},

		/* Yup验证策略 */
		validationSchema: Yup.object ({
			username: Yup.string()
			.required("用户名不得为空"),
			password: Yup.string()
			.required("密码不得为空")
		}),

		/* 表单提交动作 */
		onSubmit: values => {
			history.replace(from.pathname);
			axios({
				method: 'get',
				url: 'http://120.24.39.199:8080/api/login',
				params: {
					username: values.username,
					password: CryptoJs.MD5(values.password).toString()
				}
			}).then((res) => {
				switch(res.data) {
					case "success": {
						const token = (Date.now() + 10000000);
						axios.defaults.headers.common['Authorization'] = token;
						localStorage.setItem('Token', token); 
						history.replace(from.pathname);
						break;
					}
					case "password error": {
						message.warn("密码错误，请重试", 1);
						break;
					}
					case "unknown username": {
						message.warn("该用户名不存在", 1);
						break;
					}
					default: {
						message.warn("请联系管理员", 1);
					}
				}
			}).catch(
				(e) => {
					console.log(e);
					message.warn("用户名或密码错误，请重试", 1);
				}
			);
		}
	});

	return (
		<LoginBox>
			<form onSubmit={formik.handleSubmit}>
				<AffixWrapper>
					<div className="unicon"></div>
					<Input
						name="username"
						placeholder="请输入账号"
						type="text"
						{...formik.getFieldProps('username')}
					/>
				</AffixWrapper>
				<ErrorInfo>
				{formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null }
				</ErrorInfo>

				<AffixWrapper>
					<div className="pwdicon"></div>
					<Input
						name="password"
						placeholder="请输入密码"
						type="password"
						{...formik.getFieldProps('password')}
					/>
				</AffixWrapper>
				<ErrorInfo>
				{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null }
				</ErrorInfo>
				<Button type="suBmit">登录</Button>
		</form>
		</LoginBox>
	);
}

export default LoginForm;