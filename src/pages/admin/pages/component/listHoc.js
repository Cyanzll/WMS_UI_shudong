import React from 'react';
import { ColorDot, Cell, OperateButton } from '../../style';
import { HomeBarWrapper, ListWrapper } from '../../style';
import { createFromIconfontCN } from '@ant-design/icons';
import { CSSLink } from '../../../../style';
import { message } from 'antd';

//Iconfont & AntD
const IconFont = createFromIconfontCN({
  scriptUrl: CSSLink.iconfont,
});

// HOC
const withBetterList = (Table, config) => {
	return class extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
					filteredInfo: {},    // 筛选
					selectedRowKeys: [],
					sortedInfo: {},      // 排序
					loading: true,       // 加载状态
					data: [],            // 数据初始化
					expand: {},          // 键值对 Key: bool （展开为true）
			};
			this.handleHug = this.handleHug.bind(this);
			this.handleThank = this.handleThank.bind(this);
			this.handleDelete = this.handleDelete.bind(this);
		}

		// 抓取数据
		getData() {
			this.setState({
				loading: true
			});
			setTimeout(() => {
				this.setState({
					data: config.data,
					loading: false
				});
			}, 100);
		}

		// 生命周期方法
		componentDidMount() {
			this.getData();
		}
		
		// 排序和筛选变更
		handleChange = (pagination, filters, sorter) => {
			console.log('Various parameters',pagination, filters, sorter);
			this.setState({
				filteredInfo: filters,
				sortedInfo: sorter,
			});
		};

		// 选择项变更
		onSelectChange = selectedRowKeys => {
			console.log('HOC changed', selectedRowKeys);
			this.setState({selectedRowKeys});
		};

		/* 按下展开按钮时的回调，根据 key (这里是record.id) 查找DOM，修改AntD样式 */
		toggleExpand = (record) => {
			const ele = document.getElementsByClassName(`${record.id}`)[0];
			const target = ele.getElementsByClassName("content-ellipsis")[0];
			if (this.state.expand[`${record.id}`]) {
				target.classList.add("ant-table-cell-ellipsis"); // 收起
				this.setState((state) => {
					const obj = state.expand;
					delete obj[`${record.id}`];
					return { expand: obj }
				})
			} else {
				target.classList.remove("ant-table-cell-ellipsis"); // 展开
				this.setState((state) => {
					const obj = state.expand;
					obj[`${record.id}`] = true;
					return { expand: obj }
				})
			}
		}

		handleHug() {
			message.success(this.state.selectedRowKeys, 1);
		}
	
		handleDelete() {
			message.success(this.state.selectedRowKeys, 1);
		}
	
		handleThank() {
			message.success(this.state.selectedRowKeys, 1);
		}

		// 列表工具栏
		renderHomeBar() {
			if (config.page === 'home') {
				return (
					<HomeBarWrapper>
						<div className="left">
							<div className="xinshi" onClick={ () => {this.props.setShowList('xinshi')} }>
								<IconFont type="iconfaxinxiang" style={{fontSize:"28px"}}/>
								心事信息
							</div>
							<div className="huisheng" onClick={ () => {this.props.setShowList('huisheng')} }>
								<IconFont type="iconicon_huiyingguanqie" style={{fontSize:"28px"}}/>
								回声信息
							</div>
						</div>
						<div className="right">
							{
								/* 条件渲染 */
								this.props.showList === 'xinshi' ?
								<div className="yongbao" onClick={this.handleHug}>
									<IconFont type="iconchenggong-biaoqing" style={{fontSize:"15px",marginRight:"5px"}}/>
									一键拥抱
								</div> :
								<div className="yongbao" onClick={this.handleThank}>
									<IconFont type="iconganxie" style={{fontSize:"15px",marginRight:"5px"}}/>
									一键感谢
								</div>
							}
							<div className="delete" onClick={this.handleDelete}>
								<IconFont type="iconlajitong" style={{fontSize:"15px",marginRight:"5px"}}/>
								批量删除
							</div>
						</div>
					</HomeBarWrapper>
				)
			}
		}

		render() {

			const { data, loading, selectedRowKeys } = this.state;
			const { showList } = this.props;
			let columns;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
			};
			
			if ( showList === 'xinshi' ) {
				columns = [
					{
						title: 'ID',
						dataIndex: 'id',
						key: 'id',
						width: "6%",
						align: "center",
						sorter: (a, b) => a.id - b.id,
						sortDirections: ['descend', 'ascend']
					},
					{
						title: '用户昵称',
						align: "center",
						dataIndex: 'username',
						width: "8%",
						key: 'username'
					},
					{
						title: '拥抱量',
						align: "center",
						dataIndex: 'embrace',
						key: 'embrace',
						width: "6%",
						sorter: (a, b) => a.embrace - b.embrace,
						sortDirections: ['descend', 'ascend']
					},
					{
						title: '心事主题',
						align: "center",
						width: "10%",
						dataIndex: 'theme',
						key: 'theme'
					},
					{
						title: '内容',
						align: "center",
						width: "25%",
						dataIndex: 'content',
						key: 'content',
						ellipsis: true,
						className: 'content-ellipsis'
					},
					{
						title: '发布时间',
						align: "center",
						width: "15%",
						dataIndex: 'date',
						key: 'date',
						sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
						sortDirections: ['descend', 'ascend']
					},
					{
						title: '状态',
						align: "center",
						dataIndex: 'status',
						width: "10%",
						key: 'status',
						filters: [
							{
								text: '已发布',
								value: 'published',
							},
							{
								text: '已屏蔽',
								value: 'shielded',
							},
						],
						filterMultiple: false,
						onFilter: (value, record) => record.status.indexOf(value) === 0,
						render: ( text ) => {
							if(text === 'published') {
								return (
									<Cell>
										<ColorDot color="#198FFC"/>已发布
									</Cell>
								)
							} else if (text === 'shielded') {
								return (
									<Cell>
										<ColorDot color="#FF7A45 75%"/>已屏蔽
									</Cell>
								)
							}
						},
					},
					{
						title: '操作',
						align: "center",
						render: (record) => {
							return (
								<Cell>
									<OperateButton color="#42A7FF 100%" onClick={() => {this.toggleExpand( record )}}>
										{ this.state.expand[`${record.id}`] ? "收起" : "展开" }
									</OperateButton>
									<OperateButton color="#FD4D4F 100%">
										屏蔽
									</OperateButton>
								</Cell>
							)
						}
					}
				];
			} else if (showList === 'huisheng') {
				columns = [
					{
						title: 'ID',
						dataIndex: 'id',
						key: 'id',
						width: "6%",
						align: "center",
						sorter: (a, b) => a.id - b.id,
						sortDirections: ['descend', 'ascend']
					},
					{
						title: '用户昵称',
						align: "center",
						dataIndex: 'username',
						width: "8%",
						key: 'username'
					}, {
						title: '感谢量',
						align: "center",
						dataIndex: 'thanks',
						key: 'thanks',
						width: "6%",
						sorter: (a, b) => a.thanks - b.thanks,
						sortDirections: ['descend', 'ascend']
					},{
						title: '树洞地址',
						align: "center",
						width: "10%",
						dataIndex: 'address',
						key: 'address'
					},
					{
						title: '内容',
						align: "center",
						width: "25%",
						dataIndex: 'content',
						key: 'content',
						ellipsis: true,
						className: 'content-ellipsis'
					},
					{
						title: '发布时间',
						align: "center",
						width: "15%",
						dataIndex: 'date',
						key: 'date',
						sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
						sortDirections: ['descend', 'ascend']
					},
					{
						title: '状态',
						align: "center",
						dataIndex: 'status',
						width: "10%",
						key: 'status',
						filters: [
							{
								text: '已发布',
								value: 'published',
							},
							{
								text: '已屏蔽',
								value: 'shielded',
							},
						],
						filterMultiple: false,
						onFilter: (value, record) => record.status.indexOf(value) === 0,
						render: ( text ) => {
							if(text === 'published') {
								return (
									<Cell>
										<ColorDot color="#198FFC"/>已发布
									</Cell>
								)
							} else if (text === 'shielded') {
								return (
									<Cell>
										<ColorDot color="#FF7A45 75%"/>已屏蔽
									</Cell>
								)
							}
						},
					},
					{
						title: '操作',
						align: "center",
						render: (record) => {
							return (
								<Cell>
									<OperateButton color="#42A7FF 100%" onClick={() => {this.toggleExpand( record )}}>
										{ this.state.expand[`${record.id}`] ? "收起" : "展开" }
									</OperateButton>
									<OperateButton color="#FD4D4F 100%">
										屏蔽
									</OperateButton>
								</Cell>
							)
						}
					}
				];
			}

			/* key 设置为这条数据的 id */
			return (
				<>
					{ config.showHomeBar ? this.renderHomeBar() : null }
					<ListWrapper>
						<Table 		
							tableLayout="fixed"
							rowSelection={rowSelection}
							rowKey={record => record.id} 
							columns={columns} 
							dataSource={data}
							loading={loading}
							pagination={{pageSize: 7, showQuickJumper: true, showSizeChanger: true}}
							rowClassName={record => record.id}
						/>
					</ListWrapper>
				</>
			)
		}

	}
}

export default withBetterList;

