import React, { useState } from 'react';
import { ContentWrapper } from '../../style';
import List from './list';
import { CSSLink } from '../../../../style';
import { createFromIconfontCN } from '@ant-design/icons';

/*
* 举报管理
*/

const IconFont = createFromIconfontCN({
	scriptUrl: CSSLink.iconfont
});

const Report = () => {

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const propsObj = {
		selectedRowKeys,
		setSelectedRowKeys
	}

	return(
		<ContentWrapper>
			<div className="bread">
				<IconFont type="iconjubao-copy" style={{fontSize:"15px"}}/>
				<span className="text">举报管理</span>
			</div>
			{/* 列表组件 */}
			<List {...propsObj}/>
		</ContentWrapper>
	)
	
};

export default Report;