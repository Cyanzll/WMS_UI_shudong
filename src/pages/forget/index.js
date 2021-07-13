import React from 'react';
import { LoginBody, TopBar } from './style';
import ForgetForm from './components/ForgetForm';

const Forget = (props) => {

	console.log(props.history);

	const handleLogout = () => {
		props.history.replace('/login');
	}

	return(
		<LoginBody>
			<TopBar>
				<h1 className="title">学生服务系统 - 密码重置</h1>
				<div className="login" onClick={handleLogout}>登录</div>
			</TopBar>
			<ForgetForm />
		</LoginBody>
	);
	
}

export default Forget;