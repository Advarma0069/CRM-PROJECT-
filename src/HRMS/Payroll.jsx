import React, { useState, useEffect, useMemo } from 'react';
import { 
  Table, Button, Card, Space, Tag, Input, Select, Pagination, 
  Tooltip, Row, Col, Statistic, Drawer, Form, InputNumber, 
  Badge, Avatar, Typography, Progress, Dropdown, Menu, notification 
} from 'antd';
import { 
  DownloadOutlined, HistoryOutlined, CheckCircleOutlined, 
  FilterOutlined, DollarCircleOutlined, TeamOutlined, 
  SafetyCertificateOutlined, ArrowUpOutlined, MoreOutlined,
  SearchOutlined, ExportOutlined, ThunderboltOutlined,
  GlobalOutlined, SafetyOutlined, SwapOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Text, Title } = Typography;

const NexusERP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [form] = Form.useForm();

  // --- 1. ENTERPRISE DATA SIMULATION ---
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        { id: 'NX-101', name: 'Zoya Khan', role: 'Architect', gross: 245000, tds: 28000, pf: 1800, status: 'Paid', health: 94, risk: 'Low' },
        { id: 'NX-102', name: 'Marcus Chen', role: 'Growth', gross: 310000, tds: 42000, pf: 1800, status: 'Pending', health: 78, risk: 'Med' },
        { id: 'NX-103', name: 'Sarah J.', role: 'Product', gross: 285000, tds: 35000, pf: 1800, status: 'Paid', health: 88, risk: 'Low' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // --- 2. DYNAMIC TABLE COLUMNS ---
  const columns = [
    {
      title: 'IDENTITY',
      fixed: 'left',
      render: (_, r) => (
        <Space size="middle">
          <Badge dot status={r.status === 'Paid' ? 'success' : 'warning'}>
            <Avatar className="bg-indigo-600 font-bold border-2 border-white shadow-sm">{r.name[0]}</Avatar>
          </Badge>
          <div>
            <Text className="font-black text-slate-800 block leading-none">{r.name}</Text>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{r.id} • {r.role}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'AI PERFORMANCE',
      render: (_, r) => (
        <div className="w-32">
          <div className="flex justify-between mb-1"><Text className="text-[10px] font-bold text-gray-400 uppercase">Health</Text><Text className="text-[10px] font-black">{r.health}%</Text></div>
          <Progress percent={r.health} size="small" showInfo={false} strokeColor={r.health > 85 ? '#10b981' : '#f59e0b'} trailColor="#f1f5f9" />
        </div>
      )
    },
    {
      title: 'FINANCIALS',
      children: [
        { title: 'Gross', dataIndex: 'gross', render: (v) => <span className="font-bold">₹{v.toLocaleString()}</span> },
        { title: 'Net Pay', render: (_, r) => <span className="font-black text-indigo-600">₹{(r.gross - r.tds - r.pf).toLocaleString()}</span> }
      ]
    },
    {
      title: 'VERIFICATION',
      render: () => <Tag icon={<SafetyOutlined className="text-emerald-500" />} className="bg-slate-50 border-none rounded-lg font-bold">24Q COMPLIANT</Tag>
    },
    {
      title: '',
      fixed: 'right',
      width: 60,
      render: (_, r) => (
        <Dropdown menu={{ items: [{ key: '1', label: 'Freeze Salary' }, { key: '2', label: 'View Profile', onClick: () => setActiveDrawer(r) }] }}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10">
      {/* ENTERPRISE COMMAND HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Badge count="v4.2 ENTERPRISE" color="black" className="mb-2" />
          <Title level={2} className="m-0 font-black tracking-tight italic text-slate-900">Nexus <span className="underline decoration-indigo-400">Command</span> Hub</Title>
          <Text className="text-slate-400 font-bold uppercase text-[11px] tracking-widest flex items-center gap-2">
            <GlobalOutlined /> Q1 2026 Fiscal Cycle • Distributed Nodes
          </Text>
        </motion.div>

        <Space className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <Input prefix={<SearchOutlined className="text-indigo-400" />} placeholder="Universal Search (Cmd+K)" bordered={false} className="w-64 font-bold" />
          <Button type="primary" size="large" className="bg-black hover:bg-slate-800 border-none rounded-xl font-black px-8 h-12 shadow-lg shadow-slate-200">
            <ThunderboltOutlined /> RUN 2026 CYCLE
          </Button>
        </Space>
      </header>

      {/* BENTO GRID ANALYTICS */}
      <Row gutter={[24, 24]} className="mb-10">
        <Col xs={24} lg={16}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all">
              <Statistic title={<span className="text-gray-400 font-black uppercase text-[10px]">Monthly Burn</span>} value={1.28} suffix="Cr" valueStyle={{fontWeight: 900}} />
              <div className="text-emerald-500 text-xs font-black mt-2"><ArrowUpOutlined /> 4.2% Stability</div>
            </Card>
            <Card className="rounded-[2rem] border-none shadow-sm">
              <Statistic title={<span className="text-gray-400 font-black uppercase text-[10px]">Tax Compliance</span>} value={100} suffix="%" valueStyle={{fontWeight: 900, color: '#6366f1'}} />
              <div className="text-slate-400 text-xs font-black mt-2 uppercase italic">Audit Ready</div>
            </Card>
            <Card className="rounded-[2rem] border-none shadow-sm bg-indigo-600">
              <Statistic title={<span className="text-indigo-200 font-black uppercase text-[10px]">Anomalies Detected</span>} value={0} valueStyle={{fontWeight: 900, color: 'white'}} />
              <div className="text-indigo-200 text-xs font-black mt-2 uppercase">Zero Risk Hub</div>
            </Card>
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border-l-4 border-indigo-500 h-full">
            <h4 className="font-black text-slate-800 mb-4 uppercase tracking-widest text-xs">AI Risk Predictor</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <Text className="text-[11px] font-bold text-slate-500 uppercase">Attrition Risk</Text>
                <Tag color="green" className="m-0 font-black rounded-full px-4 border-none">2.4% (LOW)</Tag>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <Text className="text-[11px] font-bold text-slate-500 uppercase">Hire Velocity</Text>
                <Tag color="blue" className="m-0 font-black rounded-full px-4 border-none">STABLE</Tag>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* CORE ERP DATA HUB */}
      <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden pb-4">
        <Table columns={columns} dataSource={data} loading={loading} pagination={false} scroll={{ x: 1200 }} className="nexus-table" />
        <div className="mt-8 px-8 flex justify-between items-center">
          <Space><Button icon={<ExportOutlined />} className="rounded-xl font-bold">CSV EXPORT</Button></Space>
          <Pagination total={50} showSizeChanger className="font-black" />
        </div>
      </Card>

      {/* QUICK DRAWER ACTION */}
      <Drawer title={<div className="font-black italic uppercase">Profile • {activeDrawer?.id}</div>} width={500} open={!!activeDrawer} onClose={() => setActiveDrawer(null)} className="glass-drawer">
        <div className="bg-indigo-50 p-6 rounded-3xl mb-8 flex items-center gap-4">
          <Avatar size={64} className="bg-indigo-600 border-4 border-white">{activeDrawer?.name[0]}</Avatar>
          <div><h3 className="m-0 font-black text-xl">{activeDrawer?.name}</h3><Text className="text-indigo-500 font-bold uppercase">{activeDrawer?.role}</Text></div>
        </div>
        {/* Advanced Field Simulations Here */}
      </Drawer>

      <style>{`
        .nexus-table .ant-table-thead > tr > th { background: white !important; color: #94A3B8 !important; font-weight: 900 !important; font-size: 10px !important; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #f1f5f9 !important; }
        .ant-progress-inner { border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default NexusERP;
