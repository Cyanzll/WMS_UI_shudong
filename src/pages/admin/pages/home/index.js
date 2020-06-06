import React, { useState } from 'react';
import { ContentWrapper } from '../../style';
import { CSSLink } from '../../../../style';
import { createFromIconfontCN } from '@ant-design/icons';
import withGoodList from '../component/listHoc';
import { data1, data2 } from './data';
import { Table } from 'antd';

const IconFont = createFromIconfontCN({
	scriptUrl: CSSLink.iconfont
});
  
/*
*  后台首页
*/

const xsConfig = {
	data: data1,     // 数据
	page: 'home',    // 页面
	showHomeBar: true // 展示列表工具栏
};

const hsConfig = {
	data: data2,
	page: 'home',
	showHomeBar: true
};

const XSList = withGoodList(Table, xsConfig);
const HSList = withGoodList(Table, hsConfig);

const Home = () => {

	const [showList, setShowList] = useState('xinshi');
	const changePage = {
		setShowList,
		showList
	}

	return(
		<ContentWrapper>
			<div className="bread">
				<IconFont type="iconshouyefill" style={{fontSize:"15px"}}/>
				<span className="text">首页</span>
			</div>
			{/* 列表组件 */}
			{ showList === 'xinshi' ? <XSList {...changePage}/> : <HSList {...changePage}/> }
		</ContentWrapper>
	)
	
};

export default Home;