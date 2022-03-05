// @ts-nocheck
import React from "react"
import { connect } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"

import JobList from "./JobList"
import { Container, Sidebar, Loader } from "rsuite"

interface Props {
  adminRole: {
    token?: string
    email?: string
  }
}

interface State {
  adminInfo: AdminReducer
}

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const iconStyles = {
  width: 56,
  height: 56,
  padding: 18,
  lineHeight: '56px',
  textAlign: 'center'
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Nav.Item eventKey="1" active icon={<Dashboard />}>
            Home
          </Nav.Item>
        </Nav>

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeft /> : <AngleRight />}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const data = [
  {
    label: "Home",
    path: "/admin/dashboard",
    eventKey: "0",
    children: [
      {
        label: "All jobs",
        path: "/admin/dashboard",
        eventKey: "2",
      },
    ],
  },
  {
    label: "Cleaners",
    onClick: () => null,
    eventKey: "12",
    path: "/admin/cleaners",
  },
  {
    label: "Customers",
    onClick: () => null,
    eventKey: "13",
    path: "/admin/customers",
    children: [
      {
        label: "Category",
        path: "/admin/product/category",
        eventKey: "14",
      },
    ],
  },
]

const Dashboard = (props: Props) => {
  if (!props.adminRole?.token) {
    return <Redirect to="/login" />
  }
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <LogoAnalytics style={{ fontSize: 20 }} />
              <span style={{ marginLeft: 12 }}> BRAND</span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav>
              <Dropdown
                  eventKey="0"
                  trigger="hover"
                  title="Home"
                  icon={<Magic />}
                  placement="rightStart"
                >
                  <Dropdown.Item eventKey="2">All Jobs</Dropdown.Item>
                  </Dropdown>
                <Nav.Item eventKey="12" icon={<Group />}>
                  Cleaners
                </Nav.Item>
                <Dropdown
                  eventKey="13"
                  trigger="hover"
                  title="Customers"
                  icon={<Magic />}
                  placement="rightStart"
                >
                  <Dropdown.Item eventKey="14">Category</Dropdown.Item>
                </Dropdown>
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
            <Route exact path="/admin/:page" component={JobList} />
          </Switch>
          <Loader />

          </Content>
        </Container>
      </Container>
    </div>
  )
}

const mapStateToProps = (state: State) => {
  return {
    adminRole: state?.adminInfo?.adminAuth,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any)