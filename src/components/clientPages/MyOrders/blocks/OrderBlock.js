import React, { useState } from "react";
import moment from "moment";
import NotAppliedOrderDetails from "./NotAppliedOrderDetails";
import OrderList from "./OrderList";

// setModalOpen is for the first messaging modal
const OrderBlock = ({
  order,
  status,
  openToaster,
  rejectLoadBtn,
  setOpenToaster,
  setModalOpen,
  setMessageInfo,
}) => {
  const task_starttime = moment(order.task_starttime).toDate();
  const task_finishtime = moment(order.task_finishtime).toDate();
  const [showDetails, setShowDetails] = useState(0);
  const start_time = moment(task_starttime).format(`DD MMM (ddd)`);
  const finsih_time = moment(task_finishtime).format(`DD MMM (ddd)`);
  return showDetails === order.id ? (
    <NotAppliedOrderDetails
      setShowDetails={setShowDetails}
      setOpenToaster={setOpenToaster}
      starTime={start_time}
      finishTime={finsih_time}
      order={order}
    />
  ) : (
    <OrderList
      order={order}
      rejectLoadBtn={rejectLoadBtn}
      openToaster={openToaster}
      setOpenToaster={setOpenToaster}
      status={status}
      finishTime={finsih_time}  // verjnakan jamanaky
      setShowDetails={setShowDetails}
      startTime={start_time}  // skzbnakan jamanaky
      {...{ setModalOpen, setMessageInfo }}
    />
  );
};

export default OrderBlock;
