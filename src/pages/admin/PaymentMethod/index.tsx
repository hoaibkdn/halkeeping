// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import { getAllPaymentMethod, editPaymentMethod, deletePayment } from "../actions";

import { Table, Input } from "rsuite";

import Loading from "../../../components/Loading";

const LIMIT = 10;
class PaymentMethod extends React.Component {
  state = {
    currentPage: 1,
    editingMethodId: "",
    editingValue: "",
  };
  componentDidMount() {
    this.loadData(0, 1);
  }

  loadData = async (offset = 0, currentPage) => {
    Loading.showLoading();
    await this.props.getAllPaymentMethod();
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

  onChanging = (value) => {
    this.setState({
      editingValue: value,
    });
  };

  onFinishEditing = async (method) => {
    Loading.showLoading();
    await this.props.editPaymentMethod({
      name: this.state.editingValue,
      id: method._id,
    });
    this.setState({
      editingValue: "",
      editingMethodId: "",
    });
    Loading.hideLoading();
  };

  onPressEditButton = (method) => {
    const { editingMethodId } = this.state;
    if (editingMethodId === method._id) {
      this.onFinishEditing(method);
    } else {
      this.setState({
        editingMethodId: method._id,
        editingValue: method.name,
      });
    }
  };

  onPressDeletePayment = async(id) => {
    Loading.showLoading();
    await this.props.deletePayment(id);
    // this.setState({
    //   editingValue: "",
    //   editingMethodId: "",
    // });
    Loading.hideLoading();
  }

  render() {
    const {
      paymentMethods: { listIds, paymentDetail },
    } = this.props;
    const { currentPage, editingMethodId, editingValue } = this.state;
    return (
      <>
        <h3 style={{ margin: "30px 0px 30px 40px" }}>All Payment methods</h3>
        <Table
          height={400}
          data={listIds.map((item, index) =>
            item
              ? {
                  ...paymentDetail[item],
                  no: (currentPage - 1) * LIMIT + index + 1,
                  name:
                    editingMethodId === paymentDetail[item]._id ? (
                      <Input
                        value={editingValue}
                        onChange={(value) => this.onChanging(value)}
                      />
                    ) : (
                      paymentDetail[item].name
                    ),
                  editButton: (
                    <>
                      <button
                        onClick={() =>
                          this.onPressEditButton(paymentDetail[item])
                        }
                      >
                        {editingMethodId === paymentDetail[item]._id
                          ? "Done "
                          : "Edit "}
                      </button>
                      <button onClick={() => {
                        console.log('item', item)
                          this.onPressDeletePayment(item)

                      }
                        }>Delete</button>
                    </>
                  ),
                }
              : null
          )}
        >
          <Table.Column width={70} align="right" fixed>
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.Cell dataKey="no" />
          </Table.Column>

          <Table.Column width={300} fixed>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell>Udpate date</Table.HeaderCell>
            <Table.Cell dataKey="updatedAt" />
          </Table.Column>
          <Table.Column width={150}>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.Cell dataKey="editButton" />
          </Table.Column>
        </Table>
      </>
    );
  }
}

const mapDispatchToProps = {
  getAllPaymentMethod,
  editPaymentMethod,
  deletePayment
};

const mapStateToProps = (state) => {
  const paymentMethods = state.adminInfo?.paymentMethods;
  const listIds = paymentMethods?.listIds
    ? paymentMethods?.listIds.filter((item) => item)
    : [];
  return {
    paymentMethods: {
      ...paymentMethods,
      listIds,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
