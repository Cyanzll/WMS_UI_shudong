import styled from 'styled-components';
import Bg from '../../static/bg.jpg';
import uname from '../../static/un.png';
import pwd from '../../static/pwd.png';
import Logo from '../../static/logo.png';

/* 页面整体 */
export const LoginBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    width: 100%;
    height: 100vh;
	background: url(${Bg}) no-repeat;
	background-size: cover;
	background-position: center;

	.logo {
		margin-top: 51px;
		width: 158px;
		height: 155px;
		background: url(${Logo});
		background-size: cover;
	}

	.welcome {
		font-size: 72px;
		color: white;
		margin-top: 29px;
	}
`;

/* 顶栏 */
export const TopBar = styled.div`
    width: 100%;
    height: 65px;
    background-color: rgba(172, 175, 249, 0.41);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: space-between;
    .title {
		line-height: 65px;
		margin-left: 36px;
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
    }
	.login {
		color: rgba(255, 255, 255, 1);
		transition: all 50ms ease-in;
        font-size: 16px;
		width: 100px;
		line-height: 40px;
		border-radius: 10px;
		border: 1px solid #fff;
        text-align: center;
		margin-right: 36px;
		cursor: pointer;
		&:hover {
			background-color: rgba(0,0,0,0.07);
		}
	}
`;

/* 登录盒子 */
export const LoginBox = styled.div`
	margin-top: 30px;
	min-width: 600px;
	min-height: 300px;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 1);
	color: rgba(16, 16, 16, 1);
	box-shadow: 2px 3px 22px 8px rgba(0, 21, 41, 0.14);
	display: flex;
	padding: 25px 0 50px 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.title {
		font-size: 24px;
		width: 100%;
		line-height: 48px;
		text-align: center;
		margin-bottom: 20px;
		color: rgba(0, 0, 0, 0.5);
	}
	.ant-form-horizontal {
		padding-right: 50px;
	}
	.ant-input-affix-wrapper {
		padding: 0;
		padding-right: 20px;
		background-color: rgba(221, 223, 255, 0.41);
		input {
			height: 36px !important;
			padding: 2px 5px;
		}
	}
	.ant-form-item-label {
		width: 60px !important;
	}
	.ant-col-sm-8 {
		width: 60px !important;
	}
	input {
		border-radius: 5px;
		padding: 2px 10px;
		background-color: #f0f2ff;
		color: rgba(16, 16, 16, 1);
		font-size: 14px;
		height: 36px;
		border: 1px solid #d9d9d9;
		transition: all 100ms ease-in;
		&:focus {
			background-color: rgba(221, 223, 255, 0.3);
			border: 1px solid #6495ED;
		}
		&::placeholder {
			color: rgba(187, 187, 187, 0.94);
		}
	}
	.ant-btn-primary {
		margin-top: 5px;
		width: 80%;
		height: 40px;
		line-height: 24px;
		border-radius: 5px;
		background-color: rgba(38, 120, 244, 0.79);
		font-size: 16px;
		color: white;
		text-align: center;
		font-family: Roboto;
		outline: none;
		border: none;
		cursor: pointer;
		transition: all 100ms ease-in;
		&:hover {
			background: #40a9ff
		}
		&:active {
			background: #096dd9;
		}
	}
	.authmessage {
		width: 100px;
	}
`;

export const Input = styled.input`
	box-sizing: border-box;
	width: 439px;
	height: 53px;
	padding: 20px;
	padding-left: 60px;
	border-radius: 20px;
	background-color: rgba(221, 223, 255, 0.41);
	color: rgba(16, 16, 16, 1);
	font-size: 18px;
	font-family: Roboto;
	outline: none;
	border: 2px solid transparent;
    transition: all 100ms ease-in;
	&:focus {
		background-color: rgba(221, 223, 255, 0.3);
		border: 2px solid #6495ED;
	}
	&::placeholder {
		color: rgba(187, 187, 187, 0.94);
	}
`;

export const Button = styled.button`
	width: 439px;
	height: 53px;
	line-height: 29px;
	border-radius: 20px;
	background-color: rgba(38, 120, 244, 0.79);
	font-size: 20px;
	color: white;
	text-align: center;
	font-family: Roboto;
	outline: none;
	border: none;
    cursor: pointer;
    transition: all 100ms ease-in;
    &:hover {
        background: #40a9ff
    }
    &:active {
        background: #096dd9;
    }
`

export const AffixWrapper = styled.div`
	position: relative;
	margin-bottom: 10px;
	.unicon {
		position: absolute;
		left: 20px;
		top: 14px;
		width: 24px;
		height: 24px;
		background: url(${uname});
		background-size: 24px;
	}
	.pwdicon {
		position: absolute;
		top: 14px;
		left: 20px;
		width: 24px;
		height: 24px;
		background: url(${pwd});
		background-size: 24px;
	}
`

export const ErrorInfo = styled.div`
    width: 439px;
    height: 25px;
    div {
		text-align: center;
        font-size: 14px;
        line-height: 18px;
		color: #DC143C;
    }
`;