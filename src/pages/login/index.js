import React from 'react';
import { LoginBody, TopBar } from './style';
import LoginForm from './components/LoginForm';

const Login = () => {
	return(
		<LoginBody>
			<TopBar>
				<h1 className="title">树洞有声——后台管理系统</h1>
			</TopBar>
			<div className="logo"></div>
			<h2 className="welcome">WELCOME</h2>
			<LoginForm />
		</LoginBody>
	);
}

export default Login;