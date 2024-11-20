import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  useUpdatePaymentMethod,
} from "../../../api/api-services/billing";
import useAlert from "../../components/useAlert";

type Props = {
  isOpen: boolean;
  handleHide: any;
  data: any;
};

const PaymentMethodChange = ({ isOpen, handleHide, data }: Props) => {
  const { mutate, isLoading } = useUpdatePaymentMethod();
  const [selected, setSelected] = useState("");
  const { showAlert, hideAlert, Alert } = useAlert();

  const handleSubmit = () => {
    mutate(
      { id: selected },
      {
        onSuccess: (res: any) => {
          // console.log(res.data);
          showAlert(res?.data?.detail, "success");
        },
        onError: (err) => {
          console.log(err);
          if (err instanceof Error) {
            showAlert(err?.message || "An unknow error occurred", "danger");
          }
        },
      }
    );
  };

  return (
    <Modal show={isOpen} onHide={handleHide} keyboard={false} centered>
      <Modal.Header
        closeButton
        className="border-0 pt-3 pr-3 pb-0"
      ></Modal.Header>
      <Modal.Body>
        <div className="p-[16px]">
          <div className="w-full mt-[24px] font-medium">
            <label htmlFor="method" className="form-label fs-6 fw-bold">
              payment methods
            </label>
            <select
              name="method"
              id="method"
              className="form-control bg-transparent mb-4"
              value={selected}
              onChange={(e: any) => {
                setSelected(e.target.value);
              }}
            >
              <option value="" className="font-medium">
                select method
              </option>
              {data?.map((d: any) => (
                <option value={d?.id} key={d?.id} className="font-medium">
                  {`${d?.card_brand} - ${d?.card_last4}`}
                </option>
              ))}
            </select>
            <Alert />
            <div className="w-full mt-[24px] flex items-end justify-end">
              <button
                className="bg-primary font-medium text-[14px] text-white px-[24px] w-fit  py-[12px] rounded-full flex items-center justify-center gap-[10px]"
                disabled={!selected}
                onClick={handleSubmit}
              >
                {!isLoading && <span className="indicator-label">change</span>}
                {isLoading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentMethodChange;
