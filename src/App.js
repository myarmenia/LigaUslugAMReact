import './App.css';
import HomePage from './components/homePage/HomePage';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/authPages/loginPage/LoginPage';
import RegistrationPage from './components/authPages/registrationPage/RegistrationPage';
import React, { useEffect, useRef, useState } from 'react';
import NotificationPage from './components/notificationPages/NotificationPage';
import LogoBlock from './components/UI/headers/LogoBlock';
import Container from '@mui/material/Container';
import { MainNavBar } from './components/UI/headers/MainNavBar';
import { useDispatch, useSelector } from 'react-redux';
import Support from './components/clientPages/Support/Support';
import { MyOrders } from './components/clientPages/MyOrders/MyOrders';
import OrdersPage from './components/clientPages/ordersPage/OrdersPage';
import OrderAboutPage from './components/clientPages/orderAboutPage/OrderAboutPage';
import BalancePage from './components/clientPages/balancePage/BalancePage';
import { Worksheet } from './components/clientPages/Worksheet/Worksheet';
import ForgetPasswordPage from './components/authPages/forgetPassword/ForgetPassword';
import Footer from './components/homePage/blocks/footer/Footer';
import DocumentsPage from './components/documentsPage/DocumentsPage';
import TermsOfUsePage from './components/termsOfUsePage/TermsOfUsePage';
import UserInformation from './components/homePage/userInformation/UserInformation';
import { getExecutorBalance, getExecutorPageData } from './store/actions/ExecutorDataActions';
import { getProfilePageData, getЕxecutorProfilePageData } from './store/actions/ProfileDataActions';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { getNotAppliedTasks } from './store/actions/TaskActions';
import { getAllNotifications } from './store/actions/NotificationAction';
import { getHeaderData } from './store/actions/HeaderActions';
import { instance, options } from './store/api/api';
import { setNatificationCount } from './store/reducers/NotificationReducer';
import FindSpecialists from './components/find_specialists/FindSpecialists';
import PaymentMethods from './components/paymentMethodPages/PaymentMethod';
import { FilteredSpecialists } from './components/find_specialists/FilteredSpecialists';
import ClientOrderAboutPage from './components/clientOrderAboutPage/ClientOrderAboutPage';
import SearchWorks from './components/searchWorksPage/SearchWorks';
import Echo from 'laravel-echo';
import QuestionPage from './components/questionPage/QuestinPage';
import NewChatPage from './components/newChatPage/newChatPage';
import { setLoading } from './store/reducers/AuthReducer';
import { setMessageCount } from './store/reducers/MessagingReducer';
import DocumentPage from './components/documents/DocumentPage';
import AboutLiga from './components/aboutLiga/AboutLiga';

// const cookies = new Cookies();

function App() {
   const [showTermsOfUse, setShowTermsOfUse] = useState(false);
   const [footerHeight, setFooterHeight] = useState(0);
   const dispatch = useDispatch();
   const location = useLocation();
   const categoriesRef = useRef();
   const reviewsRef = useRef();
   const { auth, status, load } = useSelector((state) => state.auth);
   const loadFilterOrders = useSelector((state) => state.filterOrders.load);
   const loadHeader = useSelector((state) => state.header.load);
   const loadProfile = useSelector((state) => state.profile.load);
   const loadTask = useSelector((state) => state.task.load);
   const loadTaskExecutor = useSelector((state) => state.taskExecutor.load);
   const userId = useSelector((state) => state.auth.users?.user_id);
   const [newData, setNewData] = useState(null);
   const [socetMessageCount, setSocetMessageCount] = useState(null);
   const { messageCount } = useSelector((state) => state.messages);
   const { notifications } = useSelector((state) => state.notifications);

   // const isSubmited = useSelector((state) => state.taskExecutor.isSubmited);
   
   useEffect(() => {
      async function fetchData() {
         if (status === 'executor' && auth) {
            await dispatch(getExecutorPageData());
            await dispatch(getЕxecutorProfilePageData());
            await dispatch(getNotAppliedTasks());
            await dispatch(getExecutorBalance());
            await dispatch(getAllNotifications());
         } else if (status === 'client' && auth) {
            await dispatch(getProfilePageData());
            // await dispatch(getAllNotifications());
         }
      }
      fetchData();
   }, [status, auth, dispatch]);
   useEffect(() => {
      dispatch(getHeaderData());
   }, []);
   useEffect(() => {
      if (auth && !notifications) {
         dispatch(getAllNotifications());
      }
   }, [auth, dispatch]);
   useEffect(() => {
      const echo = new Echo(options);
   
      if (auth && userId) {
         echo
            .channel(`unreadnotificationcount_chanal.${userId}`)
            .listen('.unreadnotificationcount', (e) => {
               setNewData(e.unread_notification_count);
            });
      }
      // return echo.leave(`unreadnotificationcount_chanal.${userId}`)
   }, [userId, auth]);
   useEffect(() => {
      const echo = new Echo(options);
      if (auth && userId) {
         echo
            .channel(`updateUnreadChatsCount_chanal.${userId}`)
            .listen('.updateUnreadChatsCount', (e) => {
               setSocetMessageCount(
                  e.message.reduce((sum, el) => {
                     return (sum += el.unread_chat_count);
                  }, 0),
               );
            });
      }
      // return echo.leave(`unreadnotificationcount_chanal.${userId}`)
   }, [userId, auth]);
   useEffect(() => {
      if (!messageCount && typeof messageCount !== 'number') {
         (async () => {
            dispatch(setLoading(true));
            instance
               .get('v1/user/totalunreadmessagecount')
               .then((res) => {
                  dispatch(setMessageCount(res.data.data));
               })
               .catch((err) => {
                  console.log(err);
               })
               .finally(() => {
                  dispatch(setLoading(false));
               });
         })();
      }
   }, [messageCount]);

   useEffect(() => {
      if (socetMessageCount) {
         dispatch(setMessageCount(socetMessageCount));
         setSocetMessageCount(null);
      }
   }, [socetMessageCount, dispatch]);

   useEffect(() => {
      if (newData) {
         dispatch(setNatificationCount(newData));
         setNewData(null);
      }
   }, [newData, dispatch]);

   useEffect(() => {
      window.scroll(0, 0);
   }, [location]);

   const handleScroll = (ref) => {
      window.scrollTo({
         top: ref.offsetTop,
         left: 0,
         behavior: 'smooth',
      });
   };

   return (
      <Box>
         <Backdrop
            sx={{
               zIndex:
                  !!load ||
                  !!loadFilterOrders ||
                  !!loadHeader ||
                  !!loadProfile ||
                  !!loadTask ||
                  !!(loadTaskExecutor && location.pathname !== 'balance')
                     ? 1000000000
                     : 0,
               color: '#fff',
            }}
            open={
               !!load ||
               !!loadFilterOrders ||
               !!loadHeader ||
               !!loadProfile ||
               !!loadTask ||
               !!loadTaskExecutor
            }>
            <CircularProgress color="inherit" />
         </Backdrop>
         {location.pathname === '/login' ||
         location.pathname === '/forgetPassword' ||
         location.pathname === '/registration' ? null : (
            <Container maxWidth={'xl'}>
               {auth ? (
                  <MainNavBar categoriesRef={categoriesRef} handleScroll={handleScroll} />
               ) : (
                  <LogoBlock />
               )}
            </Container>
         )}

         <Routes>
            <Route
               path="/"
               element={
                  <HomePage
                     handleScroll={handleScroll}
                     categoriesRef={categoriesRef}
                     reviewsRef={reviewsRef}
                     showTermsOfUse={showTermsOfUse}
                     setShowTermsOfUse={setShowTermsOfUse}
                  />
               }
            />
            {/*AuthPages*/}

            <Route
               path="registration"
               element={auth ? <Navigate to="/" /> : <RegistrationPage />}
            />
            <Route path="login" element={auth ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="reset" element={auth ? <Navigate to="/" /> : <ForgetPasswordPage />} />
            {/*NavBar*/}
            <Route path={'work_sheet'} element={!auth ? <Navigate to="/" /> : <Worksheet />} />
            <Route path={'support'} element={!auth ? <Navigate to="/" /> : <Support />} />
            <Route path={'my_orders'} element={!auth ? <Navigate to="/" /> : <MyOrders />} />
            <Route path={'balance'} element={!auth ? <Navigate to="/" /> : <BalancePage />} />
            <Route path={'orders'} element={!auth ? <Navigate to="/" /> : <OrdersPage />} />

            <Route
               path={'order_about_page/:id'}
               element={!auth ? <Navigate to="/" /> : <OrderAboutPage />}
            />
            {/* client_order_about_page */}
            <Route
               path={'employer_task/:id'}
               element={!auth ? <Navigate to="/" /> : <ClientOrderAboutPage />}
            />
            {/*NavBarTabs*/}
            <Route
               path="notification"
               element={!auth ? <Navigate to="/" /> : <NotificationPage />}
            />

            <Route path={'chat'} element={!auth ? <Navigate to="/" /> : <NewChatPage />} />
            <Route path={'documents'} element={<DocumentsPage />} />
            <Route path={'terms_of_use'} element={<TermsOfUsePage status={'terms_of_use'} />} />
            <Route path={'public_offer'} element={<TermsOfUsePage status={'public_offer'} />} />
            <Route path={'privacy_policy'} element={<TermsOfUsePage status={'privacy_policy'} />} />
            <Route path={'user_information/:id'} element={<UserInformation />} />
            <Route path="find_specialists" element={<FindSpecialists />} />
            <Route path="find_specialists/:id" element={<FindSpecialists />} />
            <Route path="find_specialists/specialists/:id" element={<FilteredSpecialists />} />
            <Route path="payment_methods" element={<PaymentMethods />} />
            <Route path="search_works/:id" element={<SearchWorks />} />
            <Route path="question" element={<QuestionPage />} />
            <Route path="documents_all" element={<DocumentPage />} />
            <Route path="about_LigaUslug" element={<AboutLiga />} />
            <Route path="*" element={<HomePage />} />
         </Routes>
         {!location.pathname.startsWith('/reset') &&
         // location.pathname !== "/chat" &&
         location.pathname !== '/forgetPassword' &&
         location.pathname !== '/login' &&
         location.pathname !== '/registration' ? (
            <Footer
               setFooterHeight={setFooterHeight}
               handleScroll={handleScroll}
               categoriesRef={categoriesRef}
               reviewsRef={reviewsRef}
               setShowTermsOfUse={setShowTermsOfUse}
            />
         ) : (
            ''
         )}
      </Box>
   );
}

export default App;
