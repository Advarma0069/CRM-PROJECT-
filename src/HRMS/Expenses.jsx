import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Layout,
  Table,
  Button,
  Tag,
  Space,
  Upload,
  message,
  Modal,
  Card,
  Typography,
  Statistic,
  Row,
  Col,
  Avatar,
  Input,
  Select,
  Progress,
  Badge,
  Drawer,
  List,
  Divider,
  Empty,
  Timeline,
  Tooltip,
  Tabs,
  Alert,
  Switch,
} from "antd";

import {
  UploadOutlined,
  FileSearchOutlined,
  QrcodeOutlined,
  CheckCircleOutlined,
  ScanOutlined,
  BellOutlined,
  UserOutlined,
  DollarOutlined,
  WalletOutlined,
  SafetyCertificateOutlined,
  LogoutOutlined,
  CloudSyncOutlined,
  CameraOutlined,
  DownloadOutlined,
  HistoryOutlined,
  MobileOutlined,
  WifiOutlined,
  LaptopOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  LockOutlined,
  DatabaseOutlined,
  ApiOutlined,
  CheckCircleFilled,
  SyncOutlined,
  DisconnectOutlined,
  GlobalOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import QRCode from "react-qr-code";

import { Html5QrcodeScanner } from "html5-qrcode";

const { Header, Content, Sider } =
  Layout;

const { Title, Text, Paragraph } =
  Typography;

const { Search } = Input;

const { Option } = Select;

const EnterpriseExpenseDashboard =
  () => {
    // CORE STATES
    const [expenses, setExpenses] =
      useState(mockExpenses);

    const [
      scannerVisible,
      setScannerVisible,
    ] = useState(false);

    const [
      deviceConnected,
      setDeviceConnected,
    ] = useState(false);

    const [
      loadingSync,
      setLoadingSync,
    ] = useState(false);

    const [drawerOpen, setDrawerOpen] =
      useState(false);

    const [filterStatus, setFilterStatus] =
      useState("All");

    const [searchValue, setSearchValue] =
      useState("");

    const [notifications] = useState(7);

    const [
      securityEnabled,
      setSecurityEnabled,
    ] = useState(true);

    // DEVICE STATE
    const [deviceDetails, setDeviceDetails] =
      useState(null);

    const [deviceLogs, setDeviceLogs] =
      useState([]);

    // REAL TIME CLOCK
    const [liveTime, setLiveTime] =
      useState(
        new Date().toLocaleTimeString()
      );

    useEffect(() => {
      const timer = setInterval(() => {
        setLiveTime(
          new Date().toLocaleTimeString()
        );
      }, 1000);

      return () =>
        clearInterval(timer);
    }, []);

    // QR SCANNER
    const startScanner = () => {
      setScannerVisible(true);

      setTimeout(() => {
        const scanner =
          new Html5QrcodeScanner(
            "enterprise-reader",
            {
              fps: 10,

              qrbox: {
                width: 280,
                height: 280,
              },
            },
            false
          );

        scanner.render(
          (decodedText) => {
            setDeviceConnected(true);

            const enterpriseDevice = {
              id:
                "ENT-" +
                Math.floor(
                  1000 +
                    Math.random() *
                      9000
                ),

              employee:
                "Aditya Varma",

              employeeId:
                "EMP-2048",

              email:
                "aditya@enterprise.com",

              department:
                "Enterprise Finance Division",

              role:
                "Senior Financial Administrator",

              deviceName:
                "Samsung Galaxy S24 Ultra",

              operatingSystem:
                "Android 15 Enterprise",

              processor:
                "Snapdragon 8 Gen 4",

              browser:
                "Chrome Enterprise",

              location:
                "Mumbai Data Center",

              network:
                "5G Secure VPN",

              ipAddress:
                "192.168.1.20",

              macAddress:
                "00-14-22-01-23-45",

              battery: 91,

              storage:
                "512GB SSD",

              ram: "12GB",

              qrToken:
                decodedText.substring(
                  0,
                  25
                ),

              connectedAt:
                new Date().toLocaleString(),

              security:
                "AES-256 + Zero Trust",

              session:
                "Enterprise Active",

              status: "Operational",

              firewall:
                "Enabled",

              antivirus:
                "Protected",

              cloud:
                "AWS Enterprise",

              sync:
                "Live Sync Enabled",
            };

            setDeviceDetails(
              enterpriseDevice
            );

            setDeviceLogs([
              {
                title:
                  "QR Authentication Completed",

                description:
                  "Enterprise authentication layer verified.",

                time: "Just now",
              },

              {
                title:
                  "Device Trusted",

                description:
                  "Zero Trust policy applied successfully.",

                time: "5 sec ago",
              },

              {
                title:
                  "VPN Tunnel Created",

                description:
                  "Encrypted enterprise tunnel connected.",

                time: "8 sec ago",
              },

              {
                title:
                  "Cloud Sync Initialized",

                description:
                  "Secure AWS finance cluster synchronized.",

                time: "12 sec ago",
              },
            ]);

            message.success(
              "Enterprise Device Connected Successfully"
            );

            scanner.clear();

            setScannerVisible(false);

            setDrawerOpen(true);
          },

          (error) => {
            console.log(error);
          }
        );
      }, 500);
    };

    // CLOUD SYNC
    const handleSync = () => {
      setLoadingSync(true);

      setTimeout(() => {
        setLoadingSync(false);

        message.success(
          "Enterprise Cloud Synchronization Completed"
        );
      }, 2500);
    };

    // APPROVE EXPENSE
    const approveExpense = (key) => {
      const updated = expenses.map(
        (item) =>
          item.key === key
            ? {
                ...item,
                status:
                  "Approved",
              }
            : item
      );

      setExpenses(updated);

      message.success(
        "Expense Approved Successfully"
      );
    };

    // FILTERS
    const filteredExpenses =
      useMemo(() => {
        return expenses.filter(
          (expense) => {
            const statusMatch =
              filterStatus ===
                "All" ||
              expense.status ===
                filterStatus;

            const searchMatch =
              expense.employee
                .toLowerCase()
                .includes(
                  searchValue.toLowerCase()
                ) ||
              expense.category
                .toLowerCase()
                .includes(
                  searchValue.toLowerCase()
                );

            return (
              statusMatch &&
              searchMatch
            );
          }
        );
      }, [
        expenses,
        filterStatus,
        searchValue,
      ]);

    // TABLE
    const columns = [
      {
        title:
          "Employee Information",

        dataIndex:
          "employee",

        render: (
          name,
          record
        ) => (
          <Space>
            <Avatar
              size={45}
              icon={
                <UserOutlined />
              }
              style={{
                background:
                  "#1677ff",
              }}
            />

            <div>
              <div
                style={{
                  fontWeight:
                    700,
                }}
              >
                {name}
              </div>

              <Text
                type="secondary"
              >
                {
                  record.department
                }
              </Text>
            </div>
          </Space>
        ),
      },

      {
        title: "Date",

        dataIndex:
          "date",
      },

      {
        title:
          "Expense Category",

        dataIndex:
          "category",

        render: (
          category
        ) => (
          <Tag color="processing">
            {category}
          </Tag>
        ),
      },

      {
        title:
          "Transaction Amount",

        dataIndex:
          "amount",

        render: (
          amount,
          record
        ) => (
          <Text strong>
            {
              record.currency
            }{" "}
            {amount.toLocaleString()}
          </Text>
        ),
      },

      {
        title:
          "Payment Method",

        dataIndex:
          "paymentMethod",

        render: (
          method
        ) => (
          <Tag color="blue">
            {method}
          </Tag>
        ),
      },

      {
        title:
          "Workflow Status",

        dataIndex:
          "status",

        render: (
          status
        ) => (
          <Tag
            color={
              status ===
              "Approved"
                ? "green"
                : status ===
                  "Pending"
                ? "gold"
                : "red"
            }
          >
            {status.toUpperCase()}
          </Tag>
        ),
      },

      {
        title:
          "Operations",

        render: (
          _,
          record
        ) => (
          <Space>
            <Tooltip title="View Receipt">
              <Button
                icon={
                  <FileSearchOutlined />
                }
              />
            </Tooltip>

            {record.status ===
              "Pending" && (
              <Button
                type="primary"
                icon={
                  <CheckCircleOutlined />
                }
                onClick={() =>
                  approveExpense(
                    record.key
                  )
                }
              >
                Approve
              </Button>
            )}
          </Space>
        ),
      },
    ];

    return (
      <Layout className="min-h-screen">
        {/* SIDEBAR */}
        <Sider
          width={290}
          style={{
            background:
              "#0f172a",
          }}
        >
          <div className="p-6">
            <div className="text-center mb-8">
              <Avatar
                size={80}
                icon={
                  <DatabaseOutlined />
                }
                style={{
                  background:
                    "#1677ff",
                }}
              />

              <Title
                level={3}
                style={{
                  color:
                    "white",
                  marginTop: 15,
                }}
              >
                FinCore X
              </Title>

              <Text
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Enterprise Finance Suite
              </Text>
            </div>

            {/* USER */}
            <Card
              style={{
                borderRadius:
                  20,
              }}
            >
              <div className="text-center">
                <Avatar
                  size={70}
                  icon={
                    <UserOutlined />
                  }
                />

                <Title level={5}>
                  Aditya Varma
                </Title>

                <Text type="secondary">
                  Enterprise Admin
                </Text>

                <Divider />

                <Badge
                  status={
                    deviceConnected
                      ? "success"
                      : "error"
                  }
                  text={
                    deviceConnected
                      ? "Device Connected"
                      : "No Device"
                  }
                />
              </div>
            </Card>

            {/* SECURITY */}
            <Card
              className="mt-5"
              style={{
                borderRadius:
                  20,
              }}
            >
              <div className="flex justify-between">
                <Text strong>
                  Zero Trust Security
                </Text>

                <Switch
                  checked={
                    securityEnabled
                  }
                  onChange={
                    setSecurityEnabled
                  }
                />
              </div>

              <Divider />

              <Space
                direction="vertical"
              >
                <Badge
                  status="success"
                  text="Firewall Active"
                />

                <Badge
                  status="processing"
                  text="VPN Secure Tunnel"
                />

                <Badge
                  status="success"
                  text="Cloud Encryption"
                />
              </Space>
            </Card>

            {/* PERFORMANCE */}
            <Card
              className="mt-5"
              style={{
                borderRadius:
                  20,
              }}
            >
              <Title level={5}>
                Infrastructure Health
              </Title>

              <div className="mt-5">
                <Text>
                  API Gateway
                </Text>

                <Progress
                  percent={98}
                  status="active"
                />
              </div>

              <div className="mt-5">
                <Text>
                  Cloud Sync
                </Text>

                <Progress
                  percent={100}
                />
              </div>

              <div className="mt-5">
                <Text>
                  AI Fraud Detection
                </Text>

                <Progress
                  percent={94}
                />
              </div>
            </Card>

            <Button
              danger
              block
              size="large"
              className="mt-5"
              icon={
                <LogoutOutlined />
              }
            >
              Secure Logout
            </Button>
          </div>
        </Sider>

        {/* MAIN */}
        <Layout>
          {/* HEADER */}
          <Header
            style={{
              background:
                "white",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              padding:
                "0 30px",
            }}
          >
            <div>
              <Title
                level={3}
                style={{
                  margin: 0,
                }}
              >
                Enterprise Expense Intelligence
              </Title>

              <Text type="secondary">
                Real-time AI Finance Monitoring Platform
              </Text>
            </div>

            <Space size="large">
              <Text strong>
                {liveTime}
              </Text>

              <Badge
                count={
                  notifications
                }
              >
                <BellOutlined
                  style={{
                    fontSize:
                      22,
                  }}
                />
              </Badge>

              <Avatar
                size={45}
                icon={
                  <UserOutlined />
                }
              />
            </Space>
          </Header>

          {/* CONTENT */}
          <Content className="p-8 bg-slate-100">
            {/* ALERT */}
            <Alert
              message="Enterprise Infrastructure Operational"
              description="All financial systems, AI engines, cloud synchronization services, and device authentication layers are functioning normally."
              type="success"
              showIcon
              className="mb-6"
            />

            {/* STATS */}
            <Row
              gutter={[20, 20]}
              className="mb-6"
            >
              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <Statistic
                    title="Total Expenses"
                    value={
                      248500
                    }
                    prefix={
                      <DollarOutlined />
                    }
                  />
                </Card>
              </Col>

              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <Statistic
                    title="Pending Approvals"
                    value={16}
                    prefix={
                      <HistoryOutlined />
                    }
                  />
                </Card>
              </Col>

              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <Statistic
                    title="Connected Devices"
                    value={8}
                    prefix={
                      <MobileOutlined />
                    }
                  />
                </Card>
              </Col>

              <Col xs={24} md={6}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <Statistic
                    title="AI Accuracy"
                    value={98.2}
                    suffix="%"
                    prefix={
                      <ThunderboltOutlined />
                    }
                  />
                </Card>
              </Col>
            </Row>

            {/* ACTIONS */}
            <Card
              bordered={false}
              style={{
                borderRadius:
                  20,
              }}
              className="mb-6"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <Space wrap>
                  <Upload
                    action="/api/ocr-upload"
                    showUploadList={
                      false
                    }
                  >
                    <Button
                      size="large"
                      icon={
                        <UploadOutlined />
                      }
                    >
                      Upload OCR Receipt
                    </Button>
                  </Upload>

                  <Button
                    type="primary"
                    size="large"
                    icon={
                      <ScanOutlined />
                    }
                    onClick={
                      startScanner
                    }
                  >
                    Scan Enterprise QR
                  </Button>

                  <Button
                    size="large"
                    loading={
                      loadingSync
                    }
                    icon={
                      <CloudSyncOutlined />
                    }
                    onClick={
                      handleSync
                    }
                  >
                    Sync Cloud Cluster
                  </Button>

                  <Button
                    size="large"
                    icon={
                      <DownloadOutlined />
                    }
                  >
                    Export Financial Report
                  </Button>
                </Space>

                <Space wrap>
                  <Search
                    placeholder="Search Employee or Category..."
                    style={{
                      width:
                        320,
                    }}
                    onChange={(
                      e
                    ) =>
                      setSearchValue(
                        e.target
                          .value
                      )
                    }
                  />

                  <Select
                    value={
                      filterStatus
                    }
                    style={{
                      width:
                        180,
                    }}
                    onChange={
                      setFilterStatus
                    }
                  >
                    <Option value="All">
                      All Status
                    </Option>

                    <Option value="Approved">
                      Approved
                    </Option>

                    <Option value="Pending">
                      Pending
                    </Option>

                    <Option value="Rejected">
                      Rejected
                    </Option>
                  </Select>
                </Space>
              </div>
            </Card>

            {/* ANALYTICS */}
            <Row
              gutter={[20, 20]}
              className="mb-6"
            >
              {/* QR */}
              <Col xs={24} lg={8}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <div className="text-center">
                    <QrcodeOutlined
                      style={{
                        fontSize:
                          50,
                        color:
                          "#1677ff",
                      }}
                    />

                    <Title
                      level={4}
                    >
                      Enterprise Device Pairing
                    </Title>

                    <div className="flex justify-center py-5">
                      <QRCode
                        value="https://enterprise-secure-auth.com/device"
                        size={
                          220
                        }
                      />
                    </div>

                    <Badge
                      status={
                        deviceConnected
                          ? "success"
                          : "processing"
                      }
                      text={
                        deviceConnected
                          ? "Secure Device Connected"
                          : "Awaiting Enterprise Device"
                      }
                    />
                  </div>
                </Card>
              </Col>

              {/* SECURITY */}
              <Col xs={24} lg={8}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <Title level={4}>
                    Enterprise Security Metrics
                  </Title>

                  <div className="mt-5">
                    <Text>
                      AI Fraud Detection
                    </Text>

                    <Progress
                      percent={96}
                      status="active"
                    />
                  </div>

                  <div className="mt-5">
                    <Text>
                      Firewall Integrity
                    </Text>

                    <Progress
                      percent={100}
                    />
                  </div>

                  <div className="mt-5">
                    <Text>
                      Secure Cloud Traffic
                    </Text>

                    <Progress
                      percent={98}
                    />
                  </div>

                  <div className="mt-5">
                    <Text>
                      Device Trust Score
                    </Text>

                    <Progress
                      percent={93}
                    />
                  </div>
                </Card>
              </Col>

              {/* ACTIVITY */}
              <Col xs={24} lg={8}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius:
                      20,
                  }}
                >
                  <Title level={4}>
                    Live Infrastructure Activity
                  </Title>

                  <Timeline
                    items={[
                      {
                        color:
                          "green",

                        children:
                          "Enterprise QR authentication initialized.",
                      },

                      {
                        color:
                          "blue",

                        children:
                          "Cloud finance synchronization completed.",
                      },

                      {
                        color:
                          "orange",

                        children:
                          "AI anomaly scanner processed transaction logs.",
                      },

                      {
                        color:
                          "green",

                        children:
                          "Secure VPN tunnel verified successfully.",
                      },
                    ]}
                  />
                </Card>
              </Col>
            </Row>

            {/* TABLE */}
            <Card
              bordered={false}
              style={{
                borderRadius:
                  20,
              }}
            >
              <Table
                columns={
                  columns
                }
                dataSource={
                  filteredExpenses
                }
                pagination={{
                  pageSize:
                    6,
                }}
                locale={{
                  emptyText:
                    (
                      <Empty description="No Expense Records Found" />
                    ),
                }}
              />
            </Card>
          </Content>
        </Layout>

        {/* QR MODAL */}
        <Modal
          open={
            scannerVisible
          }
          footer={null}
          width={520}
          onCancel={() =>
            setScannerVisible(
              false
            )
          }
        >
          <div className="text-center">
            <Title level={4}>
              Enterprise QR Authentication
            </Title>

            <Paragraph type="secondary">
              Scan secure QR using enterprise mobile application for encrypted device authentication.
            </Paragraph>

            <div
              id="enterprise-reader"
              style={{
                width:
                  "100%",
                marginTop:
                  20,
              }}
            />
          </div>
        </Modal>

        {/* DEVICE DRAWER */}
        <Drawer
          title="Enterprise Device Intelligence"
          placement="right"
          width={580}
          open={
            drawerOpen
          }
          onClose={() =>
            setDrawerOpen(
              false
            )
          }
        >
          {deviceDetails && (
            <>
              <div className="text-center mb-6">
                <Avatar
                  size={95}
                  icon={
                    <LaptopOutlined />
                  }
                  style={{
                    background:
                      "#1677ff",
                  }}
                />

                <Title
                  level={4}
                  className="mt-4"
                >
                  {
                    deviceDetails.employee
                  }
                </Title>

                <Text type="secondary">
                  {
                    deviceDetails.role
                  }
                </Text>

                <div className="mt-4">
                  <Badge
                    status="success"
                    text="Enterprise Secure Session Active"
                  />
                </div>
              </div>

              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: "1",

                    label:
                      "Device Information",

                    children: (
                      <List
                        bordered
                        dataSource={[
                          `Employee ID: ${deviceDetails.employeeId}`,
                          `Email: ${deviceDetails.email}`,
                          `Department: ${deviceDetails.department}`,
                          `Device: ${deviceDetails.deviceName}`,
                          `OS: ${deviceDetails.operatingSystem}`,
                          `Processor: ${deviceDetails.processor}`,
                          `RAM: ${deviceDetails.ram}`,
                          `Storage: ${deviceDetails.storage}`,
                          `Network: ${deviceDetails.network}`,
                          `IP Address: ${deviceDetails.ipAddress}`,
                          `Location: ${deviceDetails.location}`,
                        ]}
                        renderItem={(
                          item
                        ) => (
                          <List.Item>
                            {
                              item
                            }
                          </List.Item>
                        )}
                      />
                    ),
                  },

                  {
                    key: "2",

                    label:
                      "Security",

                    children: (
                      <>
                        <Alert
                          message="Enterprise Protection Enabled"
                          type="success"
                          showIcon
                        />

                        <Divider />

                        <List
                          dataSource={[
                            `Encryption: ${deviceDetails.security}`,
                            `Firewall: ${deviceDetails.firewall}`,
                            `Antivirus: ${deviceDetails.antivirus}`,
                            `Cloud: ${deviceDetails.cloud}`,
                            `Sync Status: ${deviceDetails.sync}`,
                          ]}
                          renderItem={(
                            item
                          ) => (
                            <List.Item>
                              <Space>
                                <LockOutlined />

                                {
                                  item
                                }
                              </Space>
                            </List.Item>
                          )}
                        />
                      </>
                    ),
                  },

                  {
                    key: "3",

                    label:
                      "Activity Logs",

                    children: (
                      <Timeline
                        items={deviceLogs.map(
                          (
                            log
                          ) => ({
                            color:
                              "blue",

                            children: (
                              <>
                                <strong>
                                  {
                                    log.title
                                  }
                                </strong>

                                <br />

                                <Text type="secondary">
                                  {
                                    log.description
                                  }
                                </Text>

                                <br />

                                <Text>
                                  {
                                    log.time
                                  }
                                </Text>
                              </>
                            ),
                          })
                        )}
                      />
                    ),
                  },
                ]}
              />

              <Divider />

              <Space
                direction="vertical"
                block
              >
                <Button
                  type="primary"
                  size="large"
                  icon={
                    <CloudSyncOutlined />
                  }
                  block
                >
                  Synchronize Enterprise Device
                </Button>

                <Button
                  size="large"
                  icon={
                    <DownloadOutlined />
                  }
                  block
                >
                  Download Audit Logs
                </Button>

                <Button
                  danger
                  size="large"
                  icon={
                    <DisconnectOutlined />
                  }
                  block
                >
                  Disconnect Device
                </Button>
              </Space>
            </>
          )}
        </Drawer>
      </Layout>
    );
  };

export default EnterpriseExpenseDashboard;

// MOCK DATA

const mockExpenses = [
  {
    key: "1",

    employee:
      "Aditya Varma",

    department:
      "Finance",

    date:
      "2026-05-10",

    category:
      "Enterprise Travel",

    amount: 1250,

    currency: "USD",

    paymentMethod:
      "Corporate Card",

    status:
      "Pending",
  },

  {
    key: "2",

    employee:
      "Rahul Sharma",

    department:
      "Operations",

    date:
      "2026-05-08",

    category:
      "Client Dinner",

    amount: 450,

    currency: "USD",

    paymentMethod:
      "UPI",

    status:
      "Approved",
  },

  {
    key: "3",

    employee:
      "Priya Singh",

    department:
      "Management",

    date:
      "2026-05-06",

    category:
      "Hotel Booking",

    amount: 890,

    currency: "USD",

    paymentMethod:
      "Corporate Banking",

    status:
      "Rejected",
  },
];
