import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/users/UserTable";
import { createUser, getUsers } from "../../actions/users/users";
import Layout, { Content } from "antd/lib/layout/layout";
import Header from "../../components/global/Header";
import UserModalForm from "../../components/users/UserModalForm";

const UserTableContainer = () => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    dispatch(
      getUsers({
        access_token: auth.data?.access_token,
      }),
    );
  }, [dispatch, auth]);

  const handleOnCreate = (payload) => {
    auth.data?.access_token &&
      dispatch(
        createUser({
          ...payload,
          access_token: auth.data?.access_token,
        }),
      );
    setVisible(false);
  };
  return (
    <Layout>
      <Header />
      <Content>
        <div style={{ background: "#fff" }}>
          <Row justify="end">
            <Button
              onClick={() => {
                setVisible(true);
              }}
              style={{ margin: 16 }}
              type="primary"
              ghost
            >
              Add a user
            </Button>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <UserTable data={users.data} loading={users.loading} />
            </Col>
          </Row>
          <UserModalForm
            visible={visible}
            onCreate={handleOnCreate}
            onCancel={() => setVisible(false)}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default UserTableContainer;