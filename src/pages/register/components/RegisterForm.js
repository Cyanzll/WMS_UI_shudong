import React from 'react';
import { LoginBox } from '../style';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { Input, Button, ErrorInfo, AffixWrapper } from '../style';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// 注册表单

const RegisterForm = () => {

	const location = useLocation();
	const history = useHistory();

	// 路由
	const {from} = location.state || {from: {pathname: '/'}};

	const formik = useFormik ({

		initialValues: {
			username: '',
			password: '',
			email: ''
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
				url: 'http://localhost:8080/api/register',
				params: {
					username: values.username,
					password: values.password
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
			<h1 className="title">注册 | Register</h1>
			<form onSubmit={formik.handleSubmit}>

				{/* 用户名 */ }
				<AffixWrapper>
					<div className="unicon"></div>
					<Input
						name="username"
						placeholder="请输入用户名"
						type="text"
						{...formik.getFieldProps('username')}
					/>
				</AffixWrapper>

				<ErrorInfo>
				{formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null }
				</ErrorInfo>

				{/* 邮箱 */ }
				<AffixWrapper>
					<div className="pwdicon"></div>
					<Input
						name="password"
						placeholder="请输入邮箱"
						type="password"
						{...formik.getFieldProps('password')}
					/>
				</AffixWrapper>

				<ErrorInfo>
				{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null }
				</ErrorInfo>

				{/* 密码 */ }
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

				{/* 确认密码 */ }
				<AffixWrapper>
					<div className="pwdicon"></div>
					<Input
						name="password"
						placeholder="确认密码"
						type="password"
						{...formik.getFieldProps('password')}
					/>
				</AffixWrapper>

				<ErrorInfo>
				{formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null }
				</ErrorInfo>

				{/* 提交 */ }
				<Button type="suBmit">注册</Button>
		</form>
		</LoginBox>
	);
}

export default RegisterForm;