// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { getCleaningTool } from "./../actions";
import { Table } from "rsuite";
import Loading from "./../../../components/Loading";

class CleanningTool extends React.Component {
  componentDidMount() {
    this.loadData(0, 1);
  }

  loadData = async (offset = 0, currentPage) => {
    Loading.showLoading();
    await this.props.getCleaningTool();
    Loading.hideLoading();
  };

  render() {
    const { cleaningTool } = this.props;
    const toolKeys = Object.keys(cleaningTool) || [];
    return (
      <>
        <h3 style={{ margin: "30px 0px 30px 40px" }}>Cleaning tool price</h3>
        {/* {isSucceed && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="error">{message}</Alert>} */}
        <Table
          height={600}
          data={toolKeys.reduce((total, item) => {
            if (item === "_id") {
              return total;
            }
            total.push({
              name: item,
              price: cleaningTool[item],
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
  getCleaningTool,
};

const mapStateToProps = (state) => {
  const cleaningTool = state.adminInfo.cleaningTool || {};
  return {
    cleaningTool,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CleanningTool);
