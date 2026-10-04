import React, { useState, useMemo } from 'react';
import { 
  Table, Tag, Button, Modal, Form, Select, DatePicker, Card, Col, Row, 
  Statistic, Input, Space, message, Badge, Tabs, Steps, FloatButton, 
  Radio, Divider, Typography, Tooltip, Popconfirm, Alert, Calendar 
} from 'antd';
import { 
  SendOutlined, PrinterOutlined, HistoryOutlined, SyncOutlined, 
  SearchOutlined, DownloadOutlined, CheckCircleOutlined, InfoCircleOutlined,
  ClockCircleOutlined, UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

const UltimateLeaveSystem = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // REAL-TIME STATE: Balances & History
  const [balances, setBalances] = useState({ Annual: 18, Sick: 8, Floating: 2 });
  const [dataSource, setDataSource] = useState(initialData);

  // LOGIC: Business Days Calculation
  const calculateBusinessDays = (start, end) => {
    let count = 0;
    let cur = dayjs(start);
    while (cur.isBefore(end) || cur.isSame(end, 'day')) {
      if (cur.day() !== 0 && cur.day() !== 6) count++;
      cur = cur.add(1, 'day');
    }
    return count;
  };

  // LOGIC: Conflict Detection
  const hasConflict = (newRange) => {
    return dataSource.some(item => {
      const [start, end] = item.rawDates;
      return newRange[0].isBetween(start, end, 'day', '[]') || 
             newRange[1].isBetween(start, end, 'day', '[]');
    });
  };

  const onFinish = (values) => {
    const days = calculateBusinessDays(values.dates[0], values.dates[1]);
    const finalDays = values.session === 'Full Day' ? days : 0.5;

    if (hasConflict(values.dates)) return message.error("Date conflict detected with existing request!");
    if (finalDays > balances[values.type]) return message.warning("Insufficient balance available.");

    setLoading(true);
    setTimeout(() => {
      const newEntry = {
        key: Date.now(),
        type: values.type,
        duration: `${finalDays} Day(s)`,
        rawDates: values.dates,
        range: `${values.dates[0].format('DD MMM')} - ${values.dates[1].format('DD MMM')}`,
        status: 'Pending',
        session: values.session,
        appliedOn: dayjs().format('YYYY-MM-DD'),
        reason: values.reason,
        workflow: [
          { title: 'Submitted', status: 'finish', description: dayjs().format('HH:mm') },
          { title: 'Manager Approval', status: 'process', description: 'Pending Michael S.' },
          { title: 'HR Audit', status: 'wait' }
        ]
      };

      setDataSource([newEntry, ...dataSource]);
      setBalances(prev => ({ ...prev, [values.type]: prev[values.type] - finalDays }));
      setLoading(false);
      setIsModalOpen(false);
      form.resetFields();
      message.success("Application successfully synced to HR cloud.");
    }, 600);
  };

  const columns = [
    { 
      title: 'Leave Info', 
      render: (_, r) => (
        <Space direction="vertical" size={0}>
          <Text strong>{r.type}</Text>
          <Text type="secondary" size="small">{r.range}</Text>
        </Space>
      )
    },
    { title: 'Duration', dataIndex: 'duration', render: (d) => <Tag color="blue">{d}</Tag> },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      render: (s) => <Badge status={s === 'Approved' ? 'success' : 'warning'} text={s} /> 
    },
    {
      title: 'Actions',
      render: (_, r) => r.status === 'Pending' && (
        <Popconfirm title="Retract application?" onConfirm={() => message.info("Retracted")}>
          <Button type="link" danger size="small">Cancel</Button>
        </Popconfirm>
      )
    }
  ];

  // CALENDAR CELL RENDERER
  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const dayLeaves = dataSource.filter(l => 
        current.isBetween(l.rawDates[0], l.rawDates[1], 'day', '[]')
      );
      return (
        <ul className="m-0 p-0 list-none">
          {dayLeaves.map((item, i) => (
            <li key={i}><Badge status={item.status === 'Approved' ? 'success' : 'warning'} text={item.type} /></li>
          ))}
        </ul>
      );
    }
    return info.originNode;
  };

  return (
    <div className="p-8 min-h-screen">
      <Row gutter={24} className="mb-8">
        {Object.entries(balances).map(([k, v]) => (
          <Col span={8} key={k}>
            <Card bordered={false} className="shadow-sm">
              <Statistic title={`${k} Balance`} value={v} suffix="/ 22" valueStyle={{ color: '#1677ff' }} />
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs 
        type="card"
        items={[
          {
            key: '1',
            label: <span><HistoryOutlined /> History & Workflows</span>,
            children: (
              <Card title="Activity Log" extra={<Button icon={<DownloadOutlined />}>Export CSV</Button>}>
                <Table 
                  dataSource={dataSource} 
                  columns={columns} 
                  expandable={{
                    expandedRowRender: (record) => (
                      <div className="p-4 bg-gray-50 rounded">
                        <Steps size="small" items={record.workflow} current={1} className="mb-4" />
                        <Divider dashed className="my-2" />
                        <Text italic>Reason: {record.reason}</Text>
                      </div>
                    ),
                  }}
                />
              </Card>
            )
          },
          {
            key: '2',
            label: <span><ClockCircleOutlined /> Calendar View</span>,
            children: (
              <Card><Calendar cellRender={cellRender} /></Card>
            )
          }
        ]}
      />

      <Modal title="New Request" open={isModalOpen} onOk={() => form.submit()} onCancel={() => setIsModalOpen(false)} confirmLoading={loading}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ type: 'Annual', session: 'Full Day' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="Leave Type"><Select options={[{value: 'Annual', label: 'Annual'}, {value: 'Sick', label: 'Sick'}]} /></Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="session" label="Duration"><Radio.Group optionType="button" options={['Full Day', 'AM', 'PM']} /></Form.Item>
            </Col>
          </Row>
          <Form.Item name="dates" label="Date Range" rules={[{required: true}]}>
            <RangePicker className="w-full" disabledDate={c => c && c < dayjs().startOf('day')} />
          </Form.Item>
          <Form.Item name="reason" label="Reason" rules={[{required: true, min: 10}]}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <FloatButton type="primary" icon={<SendOutlined />} onClick={() => setIsModalOpen(true)} tooltip="Quick Apply" />
    </div>
  );
};

const initialData = [
  { key: '1', type: 'Annual', range: '10 Mar - 12 Mar', rawDates: [dayjs('2026-03-10'), dayjs('2026-03-12')], duration: '3 Day(s)', status: 'Approved', session: 'Full Day', reason: 'Vacation', workflow: [{title: 'Done', status: 'finish'}] },
];

export default UltimateLeaveSystem;