import { getCategories } from '../../../store/actions/FilterOrdersActions';
import {
   getCompletedOrders,
   getNotConfirmedEmployer,
   getOrdersNotSelected,
   getResponseOrders,
   getWorkOrders,
} from '../../../store/actions/TaskExecutorActions';

export function genId() {
   return Math.random().toString();
}

export const TOP_FILTER = (
   dispatch,
   setShowFilter,
   setOrdersNotSelectedSubmitted,
   setResponseOrdersSubmitted,
   setWorkOrdersSubmitted,
   setCompletedOrdersSubmitted,
   setNotConfirmedEmployer,
   setPersonalOrders,
   tasks,
   setMessage,
) => [
   {
      id: genId(),
      name: 'Որոնել պատվերներ',
      action: () => {
         setShowFilter(true);
         dispatch(getCategories());
      },
      activ: false,
   },
   {
      id: genId(),
      name: 'Նոր պատվերներ',
      action: () => {
         dispatch(getOrdersNotSelected());
         setOrdersNotSelectedSubmitted(true);
         setShowFilter(false);
      },
      activ: true,
      count: 0,
   },
   {
      id: genId(),
      name: 'Պատասխանել է պատվերներին',
      action: () => {
         dispatch(getResponseOrders());
         setResponseOrdersSubmitted(true);
         setShowFilter(false);
      },
      activ: false,
      count: 0,
   },
   {
      id: genId(),
      name: 'Աշխատանքն ընթացքի մեջ է',
      action: () => {
         dispatch(getWorkOrders());
         setWorkOrdersSubmitted(true);
         setShowFilter(false);
      },
      activ: false,
      count: 0,
   },
   {
      id: genId(),
      name: 'Անձնական պատվերներ',
      action: () => {
         dispatch(getNotConfirmedEmployer());
         setPersonalOrders(true);
         setShowFilter(false);
      },
      activ: false,
      count: 0,
   },
   {
      id: genId(),
      name: 'Ավարտված պատվերներ',
      action: () => {
         dispatch(getCompletedOrders());
         setCompletedOrdersSubmitted(true);
         setShowFilter(false);
      },
      activ: false,
      count: 0,
   },
];
