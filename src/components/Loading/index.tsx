// @ts-nocheck
import React from "react"
import { Modal, Loader } from "rsuite"
import styled from "styled-components"

const ModalWrapper = styled(Modal)`
  margin-top: 200px;
  .modal-dialog {
    max-width: 68px;
  }
`

interface Props {
  isVisible: boolean
}

class Loading extends React.PureComponent {
  static instance: Loading
  static showLoading = () => {
    Loading.instance?.setState({
      isVisible: true,
    })
  }
  static hideLoading = () => {
    Loading.instance?.setState({
      isVisible: false,
    })
  }
  constructor(props: Props) {
    super(props)

    Loading.instance = this
  }

  state = {
    isVisible: false,
  }
  render() {
    return (
      <ModalWrapper
        show={this.state.isVisible}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Loader/>
        </Modal.Header>
      </ModalWrapper>
    )
  }
}

export default Loading