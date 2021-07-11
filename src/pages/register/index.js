import React from 'react';
import { LoginBody, TopBar } from './style';
import RegisterForm from './components/RegisterForm';
import RegistrationForm from './components/RegistrationForm';

const Register = (props) => {

	console.log(props.history);

	const handleLogout = () => {
		props.history.replace('/login');
	}

	return(
		<LoginBody>
			<TopBar>
				<h1 className="title">学生服务系统 - 注册</h1>
				<div className="login" onClick={handleLogout}>登录</div>
			</TopBar>
			<RegistrationForm />
		</LoginBody>
	);
	
}

export default Register;