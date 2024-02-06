import React from 'react';
import CustomOrders from './CustomOrders';
import NotAppliedOrder from './NotAppliedOrder';

const OrderList = ({
  order,
  startTime,
  rejectLoadBtn,
  finishTime,
  showDetails,
  setShowDetails,
  openToaster,
  setOpenToaster,
  status,
  setModalOpen,
  setMessageInfo,
}) => {
  return status === 'notApplied' ? (
    <NotAppliedOrder
      starTime={startTime}
      setOpenToaster={setOpenToaster}
      showDetails={showDetails}
      setShowDetails={setShowDetails}
      finishTime={finishTime}
      order={order}
    />
  ) : (
    <CustomOrders
      setShowDetails={setShowDetails}
      finishTime={finishTime}
      rejectLoadBtn={rejectLoadBtn}
      openToaster={openToaster}
      showDetails={showDetails}
      setOpenToaster={setOpenToaster}
      status={status}
      startTime={startTime}
      order={order}
      {...{ setModalOpen, setMessageInfo }}
    />
  );
};

export default OrderList;
