import styled from 'styled-components';

export const Body = styled.div`
    .ant-layout-header {
        background: white;
        height: 65px;
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
		font-weight: 520;
        font-family: Roboto;
        display: flex;
		justify-content: flex-end;
		align-items: center;
        .welcome {
            height: 65px;
            margin-right: 20px;
            line-height: 20px;
            text-align: left;
            font-size: 14px;
            display: flex;
            align-items: center;
		}
		.logout {
			display: flex;
			cursor: pointer;
			margin-right: 20px;
			justify-content: center;
			align-items: center;
			background: white;
			width: 100px;
			height: 30px;
			border-radius: 10px;
			color: rgba(24, 144, 255, 1);
			font-size: 12px;
			border: 1px solid rgba(24, 144, 255, 1);
			transition: all 100ms ease-in;
			&:hover {
				background: #eee;
			}
			&:active {
				background: #ddd;
			}
		}
	}
	.ant-layout-footer {
		background: white;
	}
	.site-layout {
		background: white;
	}
    .ant-menu-item {
        height: 60px;
        line-height: 60px;
    }
	.ant-menu-submenu {
		height: 60px;
        line-height: 60px;
	}
	.ant-menu-submenu-title {
		height: 60px !important;
        line-height: 60px !important;
		margin: 4px 0 8px 0;
	}
    .ant-menu-item-selected {
        background: #2678F4 !important;
    }
    .logo {
        font-size: 18px;
        width: 256px;
        height: 65px;
        line-height: 65px;
        color: white;
        padding-left: 24px;
        background-color: rgba(0, 33, 64, 1);
        text-align: left;
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
    }
    .ant-menu-item {
        display: flex;
        align-items: center;
    }
	.ant-layout-sider {
		max-width: 256px !important;
		width: 256px !important;
	}
	.ant-layout-has-sider {
		margin-left: 56px;
	}
`;

export const ContentWrapper = styled.div`
    .text {
        margin-left: 5px;
        font-size: 14px;
    }
	.bread {
		margin-bottom: 25px;
	}
`;

export const HomeBarWrapper = styled.div`
    display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
    .left {
        display: flex;
		width: 400px;
		div {
			cursor: pointer;
			width: 111px;
			height: 76px;
			border-radius: 4px;
			text-align: center;
			border: 1px solid rgba(255, 255, 255, 0);
			color: white;
			margin-right: 27px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			transition: all 80ms ease-in;
		}
		.xinshi {
			background-color: rgba(54, 207, 202, 1);
			&:hover {
				background-color: rgba(54, 207, 202, 0.9);
			}
		}
		.huisheng {	
			background-color: rgba(89, 124, 244, 1);
			&:hover {
				background-color: rgba(89, 124, 244, 0.9);
			}
		}
    }
	.right {
		margin-right: 20px;
		display: flex;
		width: 240px;
		align-items: flex-end;
		justify-content: space-between;
		div {
			cursor: pointer;
			font-size: 14px;
			width: 107px;
			height: 32px;
			border-radius: 5px;
			color: white;
			font-family: Roboto;
			border: 1px solid rgba(255, 255, 255, 0);
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all 80ms ease-in;
		}
		.yongbao {
			background-color: rgba(49, 177, 23, 0.7);
			&:hover {
				background-color: rgba(49, 177, 23, 0.6);
			}
		}
		.delete {
			background-color: rgba(253, 77, 79, 1);
			&:hover {
				background-color: rgba(253, 77, 79, 0.9);
			}
		}
	}

`;

export const ListWrapper = styled.div`
	.ant-table-thead {
		.ant-table-cell{
			color: #000;
			font-weight: 550 !important;
		}
	}

`;

export const ColorDot = styled.div`
	width: 7px;
	height: 7px;
	border-radius: 3.5px;
	margin-right: 5px;
	background: ${props => props.color};
`;

export const Cell = styled.div`
	display: flex;
	align-items: center;
	justify-content: center
`;

export const OperateButton = styled.div`
	cursor: pointer;
	width: 41px;
	height: 23px;
	background: ${props => props.color};
	border-radius: 4px;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	font-size: 12px;
`;