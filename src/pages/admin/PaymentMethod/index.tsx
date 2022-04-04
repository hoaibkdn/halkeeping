// @ts-nocheck
import React from "react";
import { connect } from "react-redux";
import {
  getAllPaymentMethod,
  editPaymentMethod,
  deletePayment,
} from "../actions";

import { Table, Input, Modal, Button } from "rsuite";

import Loading from "../../../components/Loading";

const LIMIT = 10;
class PaymentMethod extends React.Component {
  state = {
    currentPage: 1,
    editingMethodId: "",
    editingValue: "",
    isOpeningModel: false,
    form: {},
    deletingId: null,
    isConfirmingDelete: false,
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
    this.setState({
      ...this.state,
      form: method,
      isOpeningModel: true,
    });
  };

  onPressDeletePayment = async () => {
    Loading.showLoading();
    const { error } = await this.props.deletePayment(this.state.deletingId);
    if (error) {
      this.setState({ error });
      Loading.hideLoading();
      return;
    }
    this.setState({
      deletingId: false,
    });
    Loading.hideLoading();
  };

  togglePaymentMethod = (value = false) => {
    this.setState({
      isOpeningModel: value,
      form: {},
    });
  };

  onChangeText = (name: string, value: string) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  onAddPaymentMethod = async () => {
    Loading.showLoading();
    const { form } = this.state;
    const { error } = await this.props.editPaymentMethod(form);
    if (error) {
      this.setState({
        error,
      });
    } else {
      this.togglePaymentMethod(false);
      await this.loadData(0, 1);
    }
    Loading.hideLoading();
  };

  confirmDeletingPyament = (id) => {
    this.setState({
      deletingId: id,
    });
  };

  render() {
    const {
      paymentMethods: { listIds, paymentDetail },
    } = this.props;
    const {
      currentPage,
      editingMethodId,
      editingValue,
      isOpeningModel,
      form: { name, note, bankName, accountName, accountNumber },
      error,
      deletingId,
    } = this.state;
    return (
      <>
        <h3 style={{ margin: "30px 0px 30px 40px" }}>All Payment methods</h3>
        <button onClick={() => this.togglePaymentMethod(true)}>
          Add payment
        </button>
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
                      <button
                        onClick={() => {
                          this.confirmDeletingPyament(item);
                        }}
                      >
                        Delete
                      </button>
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
            <Table.HeaderCell>Bank name</Table.HeaderCell>
            <Table.Cell dataKey="bankName" />
          </Table.Column>
          <Table.Column width={150}>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.Cell dataKey="editButton" />
          </Table.Column>
        </Table>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          size="md"
          open={deletingId}
          onClose={() => this.confirmDeletingPyament(null)}
        >
          <Modal.Header>
            <Modal.Title id="modal-title">
              Are you sure you want to delete this payment method
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              appearance="primary"
              onClick={() => this.onPressDeletePayment()}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          // class="rs-modal-sm rs-anim-bounce-in rs-modal"
          size="md"
          open={isOpeningModel}
          onClose={() => this.togglePaymentMethod(false)}
        >
          <Modal.Header>
            <Modal.Title id="modal-title">Add payment method</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-description">
            <div>
              <p>Method name</p>
              <Input
                value={name}
                onChange={(value) => this.onChangeText("name", value)}
              />
            </div>
            <div>
              <p>Note</p>
              <Input
                value={note}
                onChange={(value) => this.onChangeText("note", value)}
              />
            </div>

            <div>
              <br />
              <i>
                If payment method is banking, pls add more details of bank
                acount
              </i>
              <div>
                <p>Bank name</p>
                <Input
                  value={bankName}
                  onChange={(value) => this.onChangeText("bankName", value)}
                />
              </div>
              <div>
                <p>Account name</p>
                <Input
                  value={accountName}
                  onChange={(value) => this.onChangeText("accountName", value)}
                />
              </div>
              <div>
                <p>Acount number</p>
                <Input
                  type={"number"}
                  value={accountNumber}
                  onChange={(value) =>
                    this.onChangeText("accountNumber", value)
                  }
                />
              </div>
            </div>
            {error && <p style={{ color: "red" }}>There is an error occurs</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" onClick={this.onAddPaymentMethod}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = {
  getAllPaymentMethod,
  editPaymentMethod,
  deletePayment,
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
