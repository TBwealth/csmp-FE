import React, { useState } from "react";

const useAlert = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const showAlert = (newMessage: any, newStatus: any) => {
    setMessage(newMessage);
    setStatus(newStatus);
  };

  const hideAlert = () => {
    setMessage("");
    setStatus("");
  };

  const Alert = () => {
    return (
      <div
        onClick={hideAlert}
        className={`mb-lg-15 alert mx-8 ${
          status ? `alert-${status}` : "d-none"
        }`}
      >
        <div className="alert-text font-semibold text-center">{message}</div>
      </div>
    );
  };

  return { showAlert, hideAlert, Alert };
};

export default useAlert;
