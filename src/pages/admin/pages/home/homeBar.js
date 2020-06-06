import React from 'react';
import { HomeBarWrapper } from '../../style';
import { CSSLink } from '../../../../style';
import { createFromIconfontCN } from '@ant-design/icons';
import { message } from 'antd';
 
/* 该组件是表格上部的操作栏，是list的子组件 */

//Iconfont & AntD
const IconFont = createFromIconfontCN({
  scriptUrl: CSSLink.iconfont,
});

const HomeBar = (props) => {
 
	const handleHug = () => {
		message.success(props.selectedRowKeys, 1);
	}

	const handleDelete = () => {
		message.success(props.selectedRowKeys, 1);
	}

	const handleThank = () => {
		message.success(props.selectedRowKeys, 1);
	}

  return (
		<HomeBarWrapper>
			<div className="left">
				<div className="xinshi" onClick={()=>{props.setShowList('xinshi')}}>
					<IconFont type="iconfaxinxiang" style={{fontSize:"28px"}}/>
					心事信息
				</div>
				<div className="huisheng" onClick={()=>{props.setShowList('huisheng')}}>
					<IconFont type="iconicon_huiyingguanqie" style={{fontSize:"28px"}}/>
					回声信息
				</div>
			</div>
			<div className="right">
				{
					/* 条件渲染 */
					props.showList === 'xinshi' ?
					<div className="yongbao" onClick={handleHug}>
						<IconFont type="iconchenggong-biaoqing" style={{fontSize:"15px",marginRight:"5px"}}/>
						一键拥抱
					</div> :
					<div className="yongbao" onClick={handleThank}>
						<IconFont type="iconganxie" style={{fontSize:"15px",marginRight:"5px"}}/>
						一键感谢
					</div>
				}
				<div className="delete" onClick={handleDelete}>
					<IconFont type="iconlajitong" style={{fontSize:"15px",marginRight:"5px"}}/>
					批量删除
				</div>
			</div>
		</HomeBarWrapper>
	)
}

export default HomeBar;