// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "./../actions";

import { Table, Pagination } from "rsuite";

import Loading from "./../../../components/Loading";

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

  getPagination = async (numCurrentPage = 1) => {
    const offset = numCurrentPage * LIMIT - LIMIT;
    const currentPage = numCurrentPage;
    await this.loadData(offset, currentPage);
  };

  render() {
    const { listIds, customerDetail, hasMore } = this.props;

    const { currentPage } = this.state;
    if (!listIds) {
      return null;
    }
    return (
      <>
        <h3 style={{ margin: "30px 0px 30px 40px" }}>All Customers</h3>
        {/* {isSucceed && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="error">{message}</Alert>} */}
        <Table
          height={600}
          data={listIds.map((item, index) =>
            item
              ? {
                  ...customerDetail[item],
                  no: (currentPage - 1) * LIMIT + index + 1,
                }
              : null
          )}
          onRowClick={(data) => {
            this.props.history.push(`/admin/customer/${data._id}`);
          }}
        >
          <Table.Column width={70} align="right" fixed>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.Cell dataKey="no" />
          </Table.Column>

          <Table.Column width={200} fixed>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.Cell dataKey="phone" />
          </Table.Column>

          <Table.Column width={300}>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.Cell dataKey="address" />
          </Table.Column>

          <Table.Column width={300}>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.Cell dataKey="email"></Table.Cell>
          </Table.Column>
        </Table>

        <Pagination
          prev={currentPage > 1}
          next={hasMore}
          size="sm"
          total={hasMore ? LIMIT * (currentPage + 1) : LIMIT}
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
  const customers = state.adminInfo?.customers || {};
  return {
    ...customers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
