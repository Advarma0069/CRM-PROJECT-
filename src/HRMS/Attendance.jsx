import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Card, Statistic, Row, Col } from 'antd'; // Example using Ant Design
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Attendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Columns definition for an Enterprise Table
  const columns = [
    { title: 'Employee ID', dataIndex: 'empId', key: 'empId' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Check In', dataIndex: 'checkIn', key: 'checkIn' },
    { title: 'Check Out', dataIndex: 'checkOut', key: 'checkOut' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      render: (status) => (
        <Tag color={status === 'On Time' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <Button type="link">View Details</Button>,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Executive Summary Row */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Card><Statistic title="Total Present" value={142} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Late Arrivals" value={12} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#cf1322' }} /></Card>
        </Col>
      </Row>

      {/* Main Data Table */}
      <Card title="Daily Attendance Log" extra={<Button type="primary">Export CSV</Button>}>
        <Table 
          columns={columns} 
          dataSource={mockData} 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Attendance;

// Mock data for demonstration
const mockData = [
  { key: '1', empId: 'EMP001', name: 'John Doe', date: '2023-10-27', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'On Time' },
  { key: '2', empId: 'EMP002', name: 'Jane Smith', date: '2023-10-27', checkIn: '09:45 AM', checkOut: '06:15 PM', status: 'Late' },
];
