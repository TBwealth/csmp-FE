import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import modeAtomsAtom from "../../atoms/modeAtoms.atom";
import { Link } from "react-router-dom";
import BillingInvoices from "./BillingInvoices";
import {
  useGetSubscriptions,
  useSetupIntent,
} from "../../api/api-services/billing";
import BillingPlans from "./BillingPlans";
import PaymentModal from "./modals/PaymentModal";
import BillingPayments from "./BillingPayments";

const BillingPage = () => {
  const { mode } = useRecoilValue(modeAtomsAtom);
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [endPeriod, setEndPeriod] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useGetSubscriptions();
  const { mutate } = useSetupIntent();

  const handleSetIntent = () => {
    setLoading(true);
    mutate(
      {},
      {
        onSuccess: (res: any) => {
          setLoading(false);
          setShowModal(true);
          setSecret(res?.data.client_secret);
        },
      }
    );
  };
  // console.log(data)

  useEffect(() => {
    if (data?.data) {
      let recent = data?.data?.plan;
      setEndPeriod(data?.data?.current_period_end);
      if (recent?.id === 1) {
        setIsActive("standard");
      } else if (recent?.id === 2) {
        setIsActive("professional");
      }
    }
  }, [data]);

  return (
    <div className="px-8 mt-[32px] w-full">
      <div className="flex items-center flex-col md:flex-row gap-[16px]">
        <h1 className="font-semibold text-[14px] md:text-[18px]">
          Account Subscriptions
        </h1>
        <p
          className={`${
            mode === "dark" ? "text-[#EAEAEA]" : "text-[#6A6A6A]"
          } border-start border-end pt-[2px] px-[16px] font-medium text-[10px] md:text-[12px]`}
        >
          Manage your plans and billing details
        </p>
      </div>
      <BillingPlans
        mode={mode}
        getSecret={() => {}}
        curPlan={isActive}
        loading={loading}
        endPeriod={endPeriod}
        setShowPopup={() => {
          handleSetIntent();
        }}
      />
      <BillingPayments mode={mode} />
      <BillingInvoices mode={mode} />
      <PaymentModal
        isOpen={showModal}
        handleHide={() => setShowModal(false)}
        secret={secret}
         action="subscription_create"
      />
    </div>
  );
};

export default BillingPage;
