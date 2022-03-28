// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "./../actions";

import { Table, Pagination } from "rsuite";

import Loading from "./../../../components/Loading";
import { Link } from "react-router-dom";

const LIMIT = 10;
class CustomerList extends React.Component {
  state = {
    currentPage: 1,
  };
  componentDidMount() {
    this.loadData(0, 1);
  }

  loadData = async (offset = 0, currentPage) => {
    Loading.showLoading();
    await this.props.getAllCustomers({
      limit: LIMIT,
      offset,
    });
    this.setState({
      currentPage,
    });
    Loading.hideLoading();
  };

  getPagination = async (isPrev = true) => {
    const offset = isPrev
      ? this.props.offset - this.props.jobs.length - LIMIT
      : this.props.offset;
    const currentPage = isPrev
      ? this.state.currentPage - 1
      : this.state.currentPage + 1;
    await this.loadData(offset, currentPage);
  };

  render() {
    const { customers, hasMore } = this.props;
    const { currentPage } = this.state;
    console.log({
        customers,
    });
    return (
      <>
        <h3 style={{ margin: "30px 0px 30px 40px" }}>All Customers</h3>
        {/* {isSucceed && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="error">{message}</Alert>} */}
        <Table
          height={400}
          data={customers.map((item, index) => ({
            ...item,
            no: (currentPage - 1) * LIMIT + index + 1,
            facebook: (
              <Link
                to={{ pathname: item.facebook }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.facebook}
              </Link>
            ),
          }))}
        >
          <Table.Column width={70} align="right" fixed>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.Cell dataKey="no" />
          </Table.Column>

          <Table.Column width={120} fixed>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column width={120}>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.Cell dataKey="phone" />
          </Table.Column>

          <Table.Column width={300}>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.Cell dataKey="address" />
          </Table.Column>

          <Table.Column width={100}>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.Cell dataKey="email"></Table.Cell>
          </Table.Column>
        </Table>

        <Pagination
          prev={currentPage > 1}
          next={hasMore}
          size="sm"
          total={hasMore ? currentPage + 1 : currentPage}
          limit={LIMIT}
          activePage={currentPage}
          onChangePage={this.getPagination}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  getAllCustomers,
};

const mapStateToProps = (state) => {
  const customers = state.adminInfo?.customers?.list || [];

  console.log({
    stateData: state,
  });
  return {
    customers,
    hasMore: state.adminInfo.customers?.hasMore,
    offset: state.adminInfo.customers?.offset || 0,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
