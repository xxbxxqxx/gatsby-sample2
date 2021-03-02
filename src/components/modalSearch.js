import React from 'react';
import Modal from 'react-modal';
import Search from "./search";

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

Modal.setAppElement('#___gatsby')  //public/htmlのid参照
class ModalWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    return (
      <div className="modalWrapper">
        <IconButton onClick={this.openModal}>
          <SearchIcon />
        </IconButton>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Seach Modal"
          className="modalSearchWindow"
          overlayClassName="modalSearchOverlay"
        >
        <Search />
        <IconButton onClick={this.closeModal}>
          <CloseIcon />
        </IconButton>
        </Modal>
      </div>
    );
  }
}
export default ModalWindow;