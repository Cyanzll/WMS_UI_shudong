import React from 'react';
import { LoginBody, TopBar } from './style';
import LoginForm from './components/LoginForm';

const Login = (props) => {

	console.log(props.history);

	const handleLogout = () => {
		props.history.replace('/register');
	}

	return(
		<LoginBody>
			<TopBar>
				<h1 className="title">学生服务系统 - 登录</h1>
				<div className="register" onClick={handleLogout}>注册新用户</div>
			</TopBar>
			<div className="logo"></div>
			<h2 className="welcome">WELCOME</h2>
			<LoginForm />
		</LoginBody>
	);
	
}

export default Login;