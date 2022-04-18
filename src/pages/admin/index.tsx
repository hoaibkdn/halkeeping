// @ts-nocheck
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import JobList from "./JobList";
import JobDetails from "./JobDetails";
import CleanerList from "./Cleaner/CleanerList";
import PaymentMethod from "./PaymentMethod";
import {
  Container,
  Sidebar,
  Sidenav,
  Dropdown,
  Nav,
  Content,
  Navbar,
} from "rsuite";
import Header from "rsuite/esm/Calendar/Header";
import SettingIcon from "@rsuite/icons/Setting";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";
import ArrowRightLineIcon from "@rsuite/icons/ArrowRightLine";
import CustomerList from "./Customer/CustomerList";
import AddCleaner from "./Cleaner/AddCleaner";
import AddCuscomer from "./Customer/AddCuscomer";

interface Props {
  adminRole: {
    token?: string;
    email?: string;
  };
}

interface State {
  adminInfo: AdminReducer;
}

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: "#34c3ff",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown placement="topStart" trigger="click">
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: "center" }}
          >
            {expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const Dashboard = (props: Props) => {
  const [expand, setExpand] = useState(true);
  if (!props.adminRole?.token) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: "flex", flexDirection: "column" }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <SettingIcon style={{ fontSize: 20 }} />
              <span style={{ marginLeft: 12 }}> DASHBOARD</span>
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["3"]}
            appearance="subtle"
          >
            <Sidenav.Body>
              <Nav>
                <Dropdown
                  eventKey="1"
                  trigger="hover"
                  title="Home"
                  placement="rightStart"
                >
                  <Dropdown.Item eventKey="2">
                    <Link to="/admin/dashboard">All Jobs</Link>
                  </Dropdown.Item>
                </Dropdown>

                <Dropdown
                  eventKey="12"
                  trigger="hover"
                  title={<Link to="/admin/cleaners">Cleaners</Link>}
                  placement="rightStart"
                >
                  <Dropdown.Item eventKey="13">
                    <Link to="/admin/add-cleaner">Add cleaner</Link>
                  </Dropdown.Item>
                </Dropdown>
                <Nav.Item eventKey="14">
                  <Link to="/admin/payment">Payment</Link>
                </Nav.Item>
                <Nav.Item eventKey="15">
                  <Link to="/admin/customers">Customers</Link>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container>
          <Header>
            <h2>Page Title</h2>
          </Header>
          <Content>
            <Switch>
              <Route
                exact
                path="/admin"
                render={() => <Redirect to={`/admin/dashboard`} />}
              />
              <Route exact path="/admin/update-cleaner/:id" component={AddCleaner} />
              <Route exact path="/admin/job/:id" component={JobDetails} />
              <Route exact path="/admin/dashboard" component={JobList} />
              <Route exact path="/admin/cleaners" component={CleanerList} />
              <Route exact path="/admin/payment" component={PaymentMethod} />
              <Route exact path="/admin/customer/:id" component={AddCuscomer} />
              <Route exact path="/admin/customers" component={CustomerList} />
              <Route exact path="/admin/add-cleaner" component={AddCleaner} />
            </Switch>
            {/* <Loader /> */}
          </Content>
        </Container>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    adminRole: state?.adminInfo?.adminAuth,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any);
