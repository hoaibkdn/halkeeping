// @ts-nocheck
import React from "react"
import { Button, Modal } from "react-bootstrap"

interface Props {
  isVisible: boolean
  accept: () => void
  reject: () => void
}

const ConfirmModal = ({ isVisible, accept, reject }: Props) => {
  return (
    <Modal show={isVisible} backdrop="static" keyboard={false}>
      <Modal.Header>
        <p style={{ width: "100%", textAlign: "center", paddingTop: "20px" }}>
          Bạn có muốn chắc chắn rời trang Dịch Vụ không?
        </p>
      </Modal.Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Button
          style={{ marginRight: "20px" }}
          variant="primary"
          onClick={accept}
        >
          Yes
        </Button>
        <Button variant="outline-secondary" onClick={reject}>
          No
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
