import React, { useState } from "react";
import useAlert from "./useAlert";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  useSavePaymentMethod,
  useCreateSubscription,
} from "../../api/api-services/billing";
import "./stripe.css";

const PaymentForm = ({ handleHide, secret, action }: any) => {
  const stripe = useStripe();
  const element = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSavePaymentMethod();
  const { mutate: createSub } = useCreateSubscription();
  const { showAlert, Alert } = useAlert();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    if (!stripe || !element) {
      return;
    }
    const cardElement = element.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    if (secret) {
      const { setupIntent, error } = await stripe.confirmCardSetup(secret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setIsLoading(false);
        console.log("[Error]", error);
      } else {
        mutate(
          { payment_method_id: setupIntent?.payment_method },
          {
            onSuccess: (res: any) => {
              console.log("payment method successfull");
              if (action === "subscription_create") {
                createSub(
                  {
                    plan_id: sessionStorage.getItem("planId"),
                    // payment_method_id: setupIntent?.payment_method,
                  },
                  {
                    onSuccess: (res: any) => {
                      setIsLoading(false);
                      showAlert(res?.message, "success");
                      handleHide();
                      console.log(res?.data);
                    },
                    onError: (err: any) => {
                      showAlert(
                        err?.message || "An unknown error occurred",
                        "danger"
                      );
                      console.log(err);
                    },
                  }
                );
              } else {
                setIsLoading(false);
                showAlert(res?.message, "success");
                handleHide();
                console.log(res?.data);
              }
            },
            onError: (err: any) => {
              showAlert(err?.message || "An unknown error occurred", "danger");
              console.log(err);
            },
          }
        );
      }
    }
  };
  const CARD_OPTION: any = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTION} />
          </div>
        </fieldset>
        <Alert />
        <button className="pay">
          {isLoading ? (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          ) : action === "subscription_create" ? (
            "Pay"
          ) : (
            "Add"
          )}
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
