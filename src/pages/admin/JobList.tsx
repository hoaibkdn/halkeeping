// @ts-nocheck
import React from "react"
import { connect } from "react-redux"
import { getAllJobs } from "./actions"

import { Table } from "rsuite"

import Loading from "../../components"

const LIMIT = 10
class JobList extends React.Component {
  state = {
    currentPage: 1,
  }
  componentDidMount() {
    this.loadData(0, 1)
  }

  loadData = async (offset = 0, currentPage) => {
    Loading.showLoading()
    await this.props.getAllJobs({
      limit: LIMIT,
      offset,
    })
    this.setState({
      currentPage,
    })
    Loading.hideLoading()
  }

  getPagination = async (isPrev = true) => {
    const offset = isPrev
      ? this.props.offset - this.props.jobs.length - LIMIT
      : this.props.offset
    const currentPage = isPrev
      ? this.state.currentPage - 1
      : this.state.currentPage + 1
    await this.loadData(offset, currentPage)
  }

  render() {
    const { jobs, hasMore } = this.props
    const { currentPage } = this.state
    console.log({
      jobs,
    })
    return (
      <>
        <h3>All Jobs</h3>
        {/* {isSucceed && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="error">{message}</Alert>} */}
        <Table
      height={400}
      data={jobs.map(item => ({
        ...item,
        no: (currentPage - 1) * LIMIT + index + 1,
        total: item.total || 0
      }))}
    >
      <Column width={70} align="right" fixed>
        <HeaderCell>No</HeaderCell>
        <Cell dataKey="no" />
      </Column>

      <Column width={120} fixed>
        <HeaderCell>Customer name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={120}>
        <HeaderCell>Address</HeaderCell>
        <Cell dataKey="address" />
      </Column>

      <Column width={120}>
        <HeaderCell>Phone</HeaderCell>
        <Cell dataKey="phone" />
      </Column>

      <Column width={120}>
        <HeaderCell>Prefer date</HeaderCell>
        <Cell dataKey="preferDate" />
      </Column>

      <Column width={120}>
        <HeaderCell>Working duration</HeaderCell>
        <Cell dataKey="workingDuration" />
      </Column>

      <Column width={120}>
        <HeaderCell>Cleaning tool</HeaderCell>
        <Cell dataKey="cleaningTool" />
      </Column>
      <Column width={120} fixed="right">
        <HeaderCell>Price per hour</HeaderCell>
        <Cell dataKey="pricePerHour" />
        
      </Column>
      <Column width={120} fixed="right">
        <HeaderCell>Note</HeaderCell>
        <Cell dataKey="note" />
        
      </Column>
      <Column width={120} fixed="right">
        <HeaderCell>Total</HeaderCell>

        <Cell dataKey="total" />
      </Column>
      <Column width={120} fixed="right">
        <HeaderCell>Booking time</HeaderCell>

        <Cell dataKey="bookingTime" />
      </Column>
    </Table>

        <Pagination
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          {currentPage > 1 ? (
            <Pagination.Prev onClick={this.getPagination} />
          ) : null}
          <Pagination.Item>{currentPage}</Pagination.Item>
          {hasMore ? (
            <Pagination.Next onClick={() => this.getPagination(false)} />
          ) : null}
        </Pagination>
      </>
    )
  }
}

const mapDispatchToProps = {
  getAllJobs,
}

const mapStateToProps = (state) => {
  const jobs = state.adminInfo.jobs.list || []

  console.log({
    state,
  })
  return {
    jobs,
    hasMore: state.adminInfo.jobs.hasMore,
    offset: state.adminInfo.jobs.offset || 0,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList)