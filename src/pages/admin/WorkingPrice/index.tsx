// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { getWorkingPrice } from "./../actions";
import { Table, Pagination } from "rsuite";
import Loading from "./../../../components/Loading";

const LIMIT = 10;
class WorkingHour extends React.Component {
  componentDidMount() {
    this.loadData(0, 1);
  }

  loadData = async (offset = 0, currentPage) => {
    Loading.showLoading();
    await this.props.getWorkingPrice();
    Loading.hideLoading();
  };

  render() {
    const { workingHour } = this.props;
    const workingTypeKeys = Object.keys(workingHour) || [];
    return (
      <>
        <h3 style={{ margin: "30px 0px 30px 40px" }}>Working hour price</h3>
        {/* {isSucceed && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="error">{message}</Alert>} */}
        <Table
          height={600}
          data={workingTypeKeys.reduce((total, item) => {
            if (item === "_id") {
              return total;
            }
            total.push({
              name: item,
              price: workingHour[item],
              edit: <button>Edit</button>,
              remove: <button>Delete</button>,
            });
            return total;
          }, [])}
        >
          <Table.Column width={130} align="left" fixed>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column width={120} fixed>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.Cell dataKey="price" />
          </Table.Column>
          <Table.Column width={120} fixed>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.Cell dataKey="edit" />
          </Table.Column>
          <Table.Column width={120} fixed>
            <Table.HeaderCell>Remove</Table.HeaderCell>
            <Table.Cell dataKey="remove" />
          </Table.Column>
        </Table>
      </>
    );
  }
}

const mapDispatchToProps = {
  getWorkingPrice,
};

const mapStateToProps = (state) => {
  const workingHour = state.adminInfo.workingHour || {};
  return {
    workingHour,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingHour);
