import React from 'react';
import { LoginBox } from '../style';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { Input, Button, ErrorInfo, AffixWrapper } from '../style';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const LoginForm1 = () => {

	const location = useLocation();
	const history = useHistory();

	const {from} = location.state || {from: {pathname: '/'}};

	const formik = useFormik ({

		initialValues: {
			username: '',
			password: ''
		},

		/* Yup表单验证 */
		validationSchema: Yup.object ({
			username: Yup.string()
			.required("用户名不得为空"),
			password: Yup.string()
			.required("密码不得为空")
		}),

		/* 表单提交 */
		onSubmit: values => {
			//history.replace(from.pathname);
			console.log(values);
			axios({
				method: 'post',
				url: '/gyq/users/login',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: {
					userName: values.username,
					password: values.password
				}
			}).then((res) => {
				const token = (Date.now() + 10000000);
				axios.defaults.headers.common['Authorization'] = token;
				localStorage.setItem('Token', token); 
				history.replace(from.pathname);
			}).catch(
				(e) => {
					console.log(e);
					message.warn("用户名或密码错误，请重试", 1);
				}
			);
			// axios({
			// 	method: 'post',
			// 	url: '/user/12345',
			// 	//JSON
			// 	headers: {'Content-Type': 'application/json;charset=utf-8'},
			// 	data: JSON.stringify(values)
			// }).then(
			// 	res => {
			// 		//Token处理
			// 		const {token} = res.data;
			// 		localStorage.setItem('Token', token); 
			// 	}
			// ).catch(
			// 	err => {
			// 		console.log(err);
			// 		message.error("登录失败，请检查用户名和密码是否正确", 1, )
			// 	}
			// )
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

export default LoginForm1;