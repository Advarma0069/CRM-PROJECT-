import React from 'react';
import { Card, Progress, List, Button, Tag, Tabs, Badge } from 'antd';
import { PlayCircleOutlined, FileDoneOutlined, BookOutlined } from '@ant-design/icons';

const Training = () => {
  const categories = [
    { key: 'my-learning', label: 'My Learning' },
    { key: 'catalog', label: 'Course Catalog' },
    { key: 'compliance', label: 'Compliance & Mandatory' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Learning & Development</h1>
          <p className="text-gray-500">Boost your skills with personalized paths.</p>
        </div>
        <Button type="primary" icon={<BookOutlined />}>Explore All Courses</Button>
      </header>

      <Tabs items={categories} defaultActiveKey="my-learning" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {mockCourses.map((course) => (
          <Card 
            key={course.id}
            hoverable
            cover={<div className="h-32 bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">{course.icon}</div>}
            actions={[
              <Button type="link" icon={<PlayCircleOutlined />}>Continue</Button>,
              <Button type="text">Details</Button>
            ]}
          >
            <Card.Meta 
              title={course.title} 
              description={<Tag color={course.level === 'Advanced' ? 'red' : 'blue'}>{course.level}</Tag>} 
            />
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress percent={course.progress} size="small" showInfo={false} strokeColor="#4f46e5" />
            </div>
          </Card>
        ))}
      </div>

      <Card title="Upcoming Mandatory Certifications" className="mt-8 shadow-sm">
        <List
          itemLayout="horizontal"
          dataSource={complianceData}
          renderItem={(item) => (
            <List.Item extra={<Button size="small">Renew Now</Button>}>
              <List.Item.Meta
                avatar={<Badge status="error" />}
                title={item.title}
                description={`Expires on: ${item.expiry}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Training;

const mockCourses = [
  { id: 1, title: 'Advanced React Architecture', progress: 65, level: 'Advanced', icon: '⚛️' },
  { id: 2, title: 'Leadership & Team Management', progress: 20, level: 'Intermediate', icon: '🤝' },
  { id: 3, title: 'Cybersecurity Awareness', progress: 100, level: 'Mandatory', icon: '🛡️' },
];

const complianceData = [
  { title: 'Data Privacy (GDPR) Certification', expiry: '2024-03-15' },
  { title: 'Workplace Safety Standards', expiry: '2024-04-01' },
];