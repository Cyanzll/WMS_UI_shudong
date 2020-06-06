import React from 'react';
import { Table } from 'antd';
import { ListWrapper, ColorDot, Cell, OperateButton } from '../../style';

/* 用于展示列表数据的组件，是list的子组件 */

// 演示数据
const data1 = [
  {
    id: 1,
    username: "Cyan",
    embrace: 28,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫。马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫。马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫。",
		date: "2019-11-29 11:21:31",
		status: "published"
	},
	{
    id: 2,
    username: "Cyan",
    embrace: 32,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-28 11:21:31",
		status: "published"
	},
	{
    id: 3,
    username: "Cyan",
    embrace: 13,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-27 11:21:31",
		status: "shielded"
	},
	{
    id: 4,
    username: "Cyan",
    embrace: 142,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-26 11:21:31",
		status: "published"
	},
	{
    id: 5,
    username: "Cyan",
    embrace: 94,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-25 11:21:31",
		status: "shielded"
	},
	{
	id: 6,
    username: "Cyan",
    embrace: 38,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},
	{
    id: 7,
    username: "Cyan",
    embrace: 43,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-28 11:21:31",
		status: "published"
	},
	{
    id: 8,
    username: "Cyan",
    embrace: 13,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-27 11:21:31",
		status: "shielded"
	},
	{
    id: 9,
    username: "Cyan",
    embrace: 112,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-26 11:21:31",
		status: "published"
	},
	{
    id: 10,
    username: "Cyan",
    embrace: 6,
		theme: "高三压力",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-25 11:21:31",
		status: "shielded"
	}
];

const data2 = [
  {
    id: 1,
    username: "Cyan",
    thanks: 28,
		address: "松鼠路201号树洞",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},
	{
    id: 2,
    username: "Cyan",
    thanks: 32,
		address: "松鼠路201号树洞",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-28 11:21:31",
		status: "published"
	},
	{
    id: 3,
    username: "Cyan",
    thanks: 13,
		address: "松鼠路201号树洞",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-27 11:21:31",
		status: "shielded"
	},
	{
    id: 4,
    username: "Cyan",
    thanks: 142,
		address: "松鼠路201号树洞",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-26 11:21:31",
		status: "published"
	},
	{
    id: 5,
    username: "Cyan",
    thanks: 6,
		address: "松鼠路201号树洞",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫，马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-25 11:21:31",
		status: "shielded"
	}
];

class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			filteredInfo: {},    // 筛选
			sortedInfo: {},      // 排序
			loading: true,       // 加载状态
			data: [],            // 数据初始化
			expand: {},    // 键值对 Key: bool （展开为true）
		};
	}

	// 抓取数据
	getData() {
		this.setState({
			loading: true
		})
		setTimeout(() => {
			this.setState({
				data: this.props.showList === 'xinshi' ? data1 : data2,
				loading: false
			});
		}, 300);
	}

	// 生命周期方法
	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.showList !== this.props.showList) {
			this.getData();
		}
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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.props.setSelectedRowKeys(selectedRowKeys);
	};

	/* 按下展开按钮时的回调，根据 key (这里是record.id) 查找DOM，修改AntD样式 */
	toggleExpand = (record, name) => {
		const ele = document.getElementsByClassName(`${record.id}`)[0];
		const target = ele.getElementsByClassName("content-ellipsis")[0];
		if (this.state.expand[name + `${record.id}`]) {
			target.classList.add("ant-table-cell-ellipsis"); // 收起
			this.setState((state) => {
				const obj = state.expand;
				delete obj[name + `${record.id}`];
				return { expand: obj }
			})
		} else {
			target.classList.remove("ant-table-cell-ellipsis"); // 展开
			this.setState((state) => {
				const obj = state.expand;
				obj[name + `${record.id}`] = true;
				return { expand: obj }
			})
		}
	}

  render() {

		const { data, loading } = this.state;
		const { selectedRowKeys, showList } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
		};

		/* 心事列配置 */
		const xinshi = [
			{
				title: 'ID',
				align: "center",
				dataIndex: 'id',
				key: 'id',
				width: "6%",
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
							<OperateButton color="#42A7FF 100%" onClick={() => {this.toggleExpand(record, "xinshi")}}>
								{ this.state.expand["xinshi" + record.id] ? "收起" : "展开" }
							</OperateButton>
							<OperateButton color="#FD4D4F 100%">
								屏蔽
							</OperateButton>
						</Cell>
					)
				}
			}
		];

		/* 回声列配置 */
		const huisheng = [
			{
				title: 'ID',
				align: "center",
				dataIndex: 'id',
				key: 'id',
				width: "6%",
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
				title: '感谢量',
				align: "center",
				dataIndex: 'thanks',
				key: 'thanks',
				width: "6%",
				sorter: (a, b) => a.thanks - b.thanks,
				sortDirections: ['descend', 'ascend']
			},
			{
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
				dataIndex: 'date',
				width: "15%",
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
					} else if(text === 'shielded') {
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
							<OperateButton color="#42A7FF 100%" onClick={() => {this.toggleExpand(record, "huisheng")}}>
								{ this.state.expand["huisheng" + record.id] ? "收起" : "展开" }
							</OperateButton>
							<OperateButton color="#FD4D4F 100%">
								屏蔽
							</OperateButton>
						</Cell>
					)
				}
			}
		];

		/* 列配置 */
		const columns = showList === 'xinshi' ? xinshi : huisheng;

		/* key 设置为这条数据的 id */
		return (
			<ListWrapper>
				{/* 表格组件 key值为数据的id */}
				<Table 
					tableLayout="fixed"
					rowSelection={rowSelection}
					rowKey={record => record.id} 
					columns={columns} 
					dataSource={data}
					loading={loading}
					pagination={{pageSize: 8, showQuickJumper: true, showSizeChanger: true}}
					rowClassName={record => record.id}
				/>
			</ListWrapper>
		);
  }
}

export default List;