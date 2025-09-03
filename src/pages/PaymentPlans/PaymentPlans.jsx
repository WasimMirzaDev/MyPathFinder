import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum  from "../../components/BreadCrum";

const PaymentPlans = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Payment Plans.' subTitle='Manage your subscrioption details, all in one place.' />
      </MasterLayout>
    </>
  );
};

export default PaymentPlans;
