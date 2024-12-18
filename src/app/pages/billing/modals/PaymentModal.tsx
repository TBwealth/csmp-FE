import React from "react";
import { Modal } from "react-bootstrap";
import StripeComponent from "../../components/StripeComponent";


type Props = {
  isOpen: boolean;
  handleHide: any;
  secret: string;
  action: string;
};

const PaymentModal = ({ isOpen, handleHide, secret, action }: Props) => {
  return (
    <Modal show={isOpen} onHide={handleHide} keyboard={false} centered>
      <Modal.Header
        closeButton
        className="border-0 pt-3 pr-3 pb-0"
      ></Modal.Header>
      <Modal.Body>
        <StripeComponent handleHide={handleHide} secret={secret} action={action} />
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
