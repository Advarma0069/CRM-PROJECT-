import React, { useState } from 'react';
import { Card, Tag, Avatar, Button, Space, Drawer, Steps } from 'antd';
import { UserAddOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';

const Recruitment = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const stages = [
    { title: 'Screening', count: 12, color: 'blue' },
    { title: 'Technical', count: 5, color: 'orange' },
    { title: 'Cultural Fit', count: 2, color: 'purple' },
    { title: 'Offer', count: 1, color: 'green' }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Active Recruitment</h1>
          <p className="text-gray-500">Managing 4 active job openings</p>
        </div>
        <Button type="primary" icon={<UserAddOutlined />} size="large">Add Candidate</Button>
      </header>

      {/* Kanban Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <div key={stage.title} className="flex-shrink-0 w-80 bg-gray-200 p-4 rounded-xl">
            <div className="flex justify-between mb-4 px-1">
              <span className="font-semibold">{stage.title}</span>
              <Tag color={stage.color}>{stage.count}</Tag>
            </div>
            
            {/* Candidate Card Template */}
            <Card 
              hoverable 
              className="mb-3 rounded-lg shadow-sm"
              onClick={() => setSelectedCandidate({ name: 'Arjun Mehta' })}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar src="https://api.dicebear.com" />
                <div>
                  <div className="font-medium text-sm">Arjun Mehta</div>
                  <div className="text-xs text-gray-400">Senior React Dev</div>
                </div>
              </div>
              <Space>
                <Tag icon={<CalendarOutlined />} className="text-[10px]">Tomorrow, 2PM</Tag>
                <Button size="small" type="text" icon={<MailOutlined />} />
              </Space>
            </Card>
          </div>
        ))}
      </div>

      {/* Candidate Details Drawer */}
      <Drawer 
        title="Candidate Profile" 
        width={500} 
        onClose={() => setSelectedCandidate(null)} 
        open={!!selectedCandidate}
      >
        <Steps direction="vertical" size="small" current={1} items={stages.map(s => ({ title: s.title }))} />
        <div className="mt-8">
          <h3>Resume Summary</h3>
          <p className="text-gray-600">8 years experience in Fintech. Expert in React, Node, and AWS.</p>
        </div>
      </Drawer>
    </div>
  );
};

export default Recruitment;