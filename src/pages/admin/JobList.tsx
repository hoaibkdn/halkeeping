// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { getAllJobs } from './actions';
import { useHistory } from "react-router-dom"
import { Table, Pagination } from 'rsuite';

import Loading from '../../components/Loading';

const LIMIT = 10;
class JobList extends React.Component {
  state = {
    currentPage: 1,
  };
  componentDidMount() {
    this.loadData(0, 1);
  }

  loadData = async (offset = 0, currentPage) => {
    Loading.showLoading();
    await this.props.getAllJobs({
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
    const { jobs, hasMore } = this.props;
    const { currentPage } = this.state;
    console.log({
      jobs,
    });
    return (
      <>
        <h3 style={{margin: '30px 0px 30px 40px'}}>All Jobs</h3>
        {/* {isSucceed && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="error">{message}</Alert>} */}
        <Table
          height={400}
          data={jobs.map((item, index) => ({
            ...item,
            no: (currentPage - 1) * LIMIT + index + 1,
            ...item.customer,
            ...item.jobDetail
          }))}
          onRowClick={data => {
            this.props.history.push(`/admin/job/${data.customer._id}`)
          }}
        >
          <Table.Column width={70} align='right' fixed>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.Cell dataKey='no' />
          </Table.Column>

          <Table.Column width={120} fixed>
            <Table.HeaderCell>Customer name</Table.HeaderCell>
            <Table.Cell dataKey='name' />
          </Table.Column>

          <Table.Column width={300}>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.Cell dataKey='address' />
          </Table.Column>

          <Table.Column width={100}>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.Cell dataKey='phone' />
          </Table.Column>

          <Table.Column width={120}>
            <Table.HeaderCell>Prefer date</Table.HeaderCell>
            <Table.Cell dataKey='preferDate' />
          </Table.Column>

          <Table.Column width={150}>
            <Table.HeaderCell>Working duration</Table.HeaderCell>
            <Table.Cell dataKey='durationTime' />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell>Cleaning tool</Table.HeaderCell>
            <Table.Cell dataKey='cleaningTool' />
          </Table.Column>
          <Table.Column width={100}>
            <Table.HeaderCell>Price per hour</Table.HeaderCell>
            <Table.Cell dataKey='pricePerHour' />
          </Table.Column>
          <Table.Column width={100}>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.Cell dataKey='note' />
          </Table.Column>
          <Table.Column width={100}>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.Cell dataKey='total' />
          </Table.Column>
          <Table.Column width={100}>
            <Table.HeaderCell>Booking time</Table.HeaderCell>

            <Table.Cell dataKey='bookingTime' />
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
  getAllJobs,
};

const mapStateToProps = (state) => {
  const jobs = state.adminInfo.jobs.list || [];

  console.log({
    state,
  });
  return {
    jobs,
    hasMore: state.adminInfo.jobs.hasMore,
    offset: state.adminInfo.jobs.offset || 0,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
