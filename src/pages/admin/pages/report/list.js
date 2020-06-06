import React from 'react';
import { Table } from 'antd';
import { ListWrapper, ColorDot, Cell, OperateButton } from '../../style';
import { CSSLink } from '../../../../style';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
	scriptUrl: CSSLink.iconfont
});

/* 用于展示列表数据的组件，是list的子组件 */

// 演示数据
const data1 = [
  {
    id: 1,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},
	{
    id: 2,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	}, 
	{
    id: 3,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},  
	{
    id: 4,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},  
	{
    id: 5,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},  
	{
    id: 6,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},  
	{
    id: 7,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	},
	{
    id: 8,
    username: "Cyan",
    cause: "bad",
		desc: "侮辱性语言",
		content: "马上要高考了，因为疫情原因被推迟了一个月，莫名不知道该开心还是迷茫",
		date: "2019-11-29 11:21:31",
		status: "published"
	}
];

class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			filteredInfo: {},    // 筛选
			sortedInfo: {},      // 排序
			loading: true,       // 加载状态
			data: []             // 数据初始化
		};
	}

	// 抓取数据
	getData() {
		this.setState({
			loading: true
		})
		setTimeout(() => {
			this.setState({
				data: data1,
				loading: false
			});
		}, 300);
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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.props.setSelectedRowKeys(selectedRowKeys);
	};

  render() {

		const { data, loading } = this.state;
		const { selectedRowKeys } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
		};

		/* 举报列配置 */
		const columns = [
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
				title: '被举报原因',
				align: "center",
				dataIndex: 'cause',
				key: 'cause',
				width: "10%",
				filters: [
					{
						text: '不良内容',
						value: 'bad'
					},
					{
						text: '言语辱骂',
						value: 'insult'
					},
				],
				filterMultiple: false,
				onFilter: (value, record) => record.cause.indexOf(value) === 0, //cause
				render: ( text ) => {
					if(text === 'bad') {
						return (
							<Cell>
								不良内容
							</Cell>
						)
					} else if(text === 'insult') {
						return (
							<Cell>
								言语辱骂
							</Cell>
						)
					}
				},
			},
			{
				title: '其他原因',
				align: "center",
				width: "15%",
				dataIndex: 'desc',
				key: 'desc'
			},
			{
				title: '内容',
				align: "center",
				width: "20%",
				dataIndex: 'content',
				key: 'content'
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
				render: () => {
					return (
						<Cell>
							<OperateButton color="#42A7FF 100%">
								查看
							</OperateButton>
							<OperateButton color="#FF7A45 100%">
								屏蔽
							</OperateButton>
							<OperateButton color="#FD4D4F 100%">
								<IconFont type="iconlajitong" style={{fontSize:"20px"}}/>
							</OperateButton>
						</Cell>
					)
				}
			}
		];

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
				/>
			</ListWrapper>
		);
  }
}

export default List;