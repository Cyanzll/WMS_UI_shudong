import React, { lazy, Suspense } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { Body } from './style';
import { Link, Route, withRouter } from 'react-router-dom';
import { CSSLink, Loading } from '../../style';
import { createFromIconfontCN } from '@ant-design/icons';

/* 后台管理的整体布局和路由 */

const { Header, Content, Footer, Sider } = Layout;

const Home = lazy(() => import('./pages/home'));
const Report = lazy(() => import('./pages/report'));
const Manage = lazy(() => import('./pages/manage'));
const IconFont = createFromIconfontCN({
  scriptUrl: CSSLink.iconfont,
});

const Admin = (props) => {

	const handleLogout = () => {
		localStorage.removeItem("Token");
		props.history.push('/login');
	}

	console.log(props.match);

	return (
		<Body>
			<Layout>
			{/* 侧边栏 */}
				<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
				}}
				>
				<div className="logo">树洞管理后台</div>
				<Menu theme="dark" mode="inline" defaultSelectedKeys={[props.location.pathname]}>
					<Menu.Item key="/" icon={<IconFont type="iconshouye" style={{fontSize:"19px"}}/>}>
						<Link to='/'>系统首页</Link>
					</Menu.Item>
					<Menu.Item key="/report" icon={<IconFont type="iconjubao" style={{fontSize:"19px"}}/>}>
						<Link to='/report'>举报管理</Link>
					</Menu.Item>
					<Menu.Item key='/manage' icon={<IconFont type="iconyunyingguanli" style={{fontSize:"19px"}}/>}>
						<Link to='/manage'>虚拟用户管理</Link>
					</Menu.Item>
				</Menu>
				</Sider>
				<Layout className="site-layout" style={{ marginLeft: 200 }}>
					<Header className="site-layout-background" style={{ padding: 0 }}>
						<div className="welcome">
							欢迎您！<br/>超级管理员
						</div>
						<div className="logout" onClick={handleLogout}>退出</div>
					</Header>

					<Content style={{ margin: '24px 25px 0', overflow: 'initial' }}>
						<Suspense fallback={<Loading><Spin size="large" /></Loading>}>

							<Route path="/" exact component={ Home }/>
							<Route path="/report" component={ Report }/>
							<Route path="/manage" component={ Manage }/>

						</Suspense>
					</Content>
					
					<Footer style={{ textAlign: 'center' }}>树洞管理后台 为之工作室 2020</Footer>
				</Layout>
			</Layout>
	  </Body>
	)
}

export default withRouter(Admin);