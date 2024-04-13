import React, { useState } from "react";
import { Table, Input, Row, Col, Spin, Button, Modal } from "antd";
import useApi from "./useApi";
import "./style.css";
import { Card } from "antd";
import SingleUserData from "./singleUserData";

function UserList() {
  const [nameFilter, setNameFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const { userData, loadingUserData, errorUserData } =
    SingleUserData(selectedUserId);

  const showModal = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const {
    data: users,
    loading,
    error,
  } = useApi("https://jsonplaceholder.typicode.com/users");

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-container">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="default"
          style={{ background: "#93dceb" }}
          onClick={() => showModal(record.id)}
        >
          View
        </Button>
      ),
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      user.username.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleUsernameFilterChange = (e) => {
    setUsernameFilter(e.target.value);
  };

  const pagination = {
    pageSize: 10,
  };

  return (
    <div className="container mt-5">
      <Row gutter={16}>
        <Col sm={6} md={8} lg={6} xl={4}>
          <Input
            placeholder="Filter by name"
            value={nameFilter}
            onChange={handleNameFilterChange}
            style={{ marginBottom: 16, height: 38 }}
            size="small"
          />
        </Col>
        <Col sm={6} md={8} lg={6} xl={4}>
          <Input
            placeholder="Filter by username"
            value={usernameFilter}
            onChange={handleUsernameFilterChange}
            style={{ marginBottom: 16, height: 38 }}
            size="small"
          />
        </Col>
      </Row>
      <Modal
        visible={open}
        title="User Detail"
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="default"
            style={{ background: "#93dceb" }}
            onClick={handleCancel}
          >
            Close
          </Button>,
        ]}
      >
        {loadingUserData ? (
          <Spin size="large" />
        ) : errorUserData ? (
          <div>Error: {errorUserData.message}</div>
        ) : (
          <Card style={{ width: "100%" }}>
            <p className="cardParagraph">
              <strong>Id:</strong> {userData?.id}
            </p>
            <p className="cardParagraph">
              <strong>Name:</strong> {userData?.name}
            </p>
            <p className="cardParagraph">
              <strong>Username:</strong> {userData?.username}
            </p>
            <p className="cardParagraph">
              <strong>Email:</strong> {userData?.email}
            </p>
            <p className="cardParagraph">
              <strong>Phone:</strong> {userData?.phone}
            </p>
            <p className="cardParagraph">
              <strong>Address:</strong> {userData?.address.city}
            </p>
            <p className="cardParagraph">
              <strong>Website:</strong> {userData?.website}
            </p>
          </Card>
        )}
      </Modal>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        pagination={pagination}
        rowKey="id"
      />
    </div>
  );
}

export default UserList;
