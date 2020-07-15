import * as constants from './constants';
import axios from 'axios';
/* Action Creaters with Thunk */

export const createLoginAction = (username, password) => {
	//返回函数
  return (dispatch) => {
		if(username === "admin" && password === "admin") {
			//伪造token
			const jwToken = "26 May 2020 23:50:00 GMT";
			//存放token
			localStorage.setItem("jwToken", jwToken);
			console.log(localStorage.getItem("jwToken"));
			//全局默认请求头
			axios.defaults.headers.common['Authorization'] = jwToken;
			//修改状态
			dispatch(createLoginState());
		} else {
			dispatch(createErrorState());
		}
	}
}

export const checkLoginStateAction = () => {
	return (dispatch) => {
		const date = Date.now();
		//超时
		if(Date.parse(localStorage.getItem("jwToken")) < date || !localStorage.getItem("jwToken")) {
			dispatch(loginExpire());
		} else if (Date.parse(localStorage.getItem("jwToken")) >= date) {
			dispatch(createLoginState());
		}
	}
}

export const getLogoutAction = () => {
	return (dispatch) => {
		localStorage.removeItem("jwToken");
		dispatch(loginExpire());
	}
}

//Private
const createLoginState = () => ({
	type: constants.LOGIN_SUC
})

const loginExpire = () => ({
	type: constants.LOGIN_EXP
})

const createErrorState = () => ({
	type: constants.LOGIN_FAI
})