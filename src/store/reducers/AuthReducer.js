import { createSlice } from '@reduxjs/toolkit';
import { ForgetPassword, Login, Logouts, Registration, RemoveUser } from '../actions/AuthActions';

const initialState = {
   auth: false,
   authStatus: false,
   status: null,
   users: {},
   load: false,
   error: '',
   message: '',
   loadAuth: false,
   errorAuth: '',
   success: false,
   successWork: false,
   messageForget: '',
   loadForget: false,
   forgetErrorError: false,
   isOpenLogoutModal: false,
   requestStatus: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      changeStatus: (state, action) => {
         state.status = action.payload;
      },
      resetAuth(state) {
         state.success = false;
         state.error = false;
         state.forgetPassword = false;
         state.successWork = false;
      },
      setIsOpenLogoutModal: (state, { payload }) => {
         state.isOpenLogoutModal = payload;
      },
      setLoading: (state, { payload }) => {
         state.load = payload;
      },
   },

  //  extraReducers: {
  //    [Registration.pending]: (state) => {
  //      state.loadAuth = true;
  //    },
  //    [Registration.fulfilled]: (state, action) => {
  //      console.log('loginn',action.payload);
  //      state.loadAuth = false;
  //      state.message = action.payload.message;
  //      state.error = false;
  //      state.successWork = true;
  //      state.requestStatus = true;
  //    },
  //    [Registration.rejected]: (state, action) => {
  //      state.loadAuth = false;
  //      state.error = true;
  //      state.message = action.payload;
  //    },
  //    [Login.pending]: (state, action) => {
  //      state.load = true;
  //    },
  //    [Login.fulfilled]: (state, action) => {
  //      state.load = false;
  //      state.users = action.payload.user;
  //      state.error = false;
  //      state.auth = true;
  //      state.success = true;
  //    },
  //    [Login.rejected]: (state, action) => {
  //      state.load = false;
  //      state.error = true;
  //      state.message = action.payload;
  //      state.auth = false;
  //    },
  //    [Logouts.pending]: (state) => {
  //      state.load = true;
  //    },
  //    [Logouts.fulfilled]: (state) => initialState,
  //    [Logouts.rejected]: (state, action) => {
  //      state.load = false;
  //      state.error = action.payload;
  //      state.auth = false;
  //    },
  //    [ForgetPassword.pending]: (state) => {
  //      state.loadForget = true;
  //    },
  //    [ForgetPassword.fulfilled]: (state, action) => {
  //      state.loadForget = false;
  //      state.message = action.payload.message;
  //      state.successWork = true;
  //      state.forgetErrorError = false;
  //    },
  //    [ForgetPassword.rejected]: (state, action) => {
  //      state.loadForget = false;
  //      state.message = action.payload;
  //      state.forgetErrorError = true;
  //    },
  //    [RemoveUser.fulfilled]: (state) => {
  //      state = {
  //        auth: false,
  //        authStatus: false,
  //        status: null,
  //        users: {},
  //        load: false,
  //        error: "",
  //        message: "",
  //        loadAuth: false,
  //        errorAuth: "",
  //        success: false,
  //        successWork: false,
  //        messageForget: "",
  //        loadForget: false,
  //        forgetErrorError: false,
  //        isOpenLogoutModal: false,
  //      };
  //    },
  //    [RemoveUser.pending]: (state) => {
  //      state.load = true;
  //    },
  //    [RemoveUser.rejected]: (state) => {
  //      state.load = false;
  //    },
  //  },
   extraReducers: (builder) => {
      builder
         .addCase(Registration.pending, (state) => {
            state.loadAuth = true;
         })
         .addCase(Registration.fulfilled, (state, action) => {
            state.loadAuth = false;
            state.message = action.payload.message;
            state.error = false;
            state.successWork = true;
            state.requestStatus = true;
         })
         .addCase(Registration.rejected, (state, action) => {
            state.loadAuth = false;
            state.error = true;
            state.message = action.payload;
         })
         .addCase(Login.pending, (state, action) => {
            state.load = true;
         })
         .addCase(Login.fulfilled, (state, action) => {
            state.load = false;
            state.users = action.payload.user;
            state.error = false;
            state.auth = true;
            state.success = true;
         })
         .addCase(Login.rejected, (state, action) => {
            state.load = false;
            state.error = true;
            state.message = action.payload;
            state.auth = false;
         })
         .addCase(Logouts.pending, (state) => {
            state.load = true;
         })
         .addCase(Logouts.fulfilled, (state) => initialState)
         .addCase(Logouts.rejected, (state, action) => {
            state.load = false;
            state.error = action.payload;
            state.auth = false;
         })
         .addCase(ForgetPassword.pending, (state) => {
            state.loadForget = true;
         })
         .addCase(ForgetPassword.fulfilled, (state, action) => {
            state.loadForget = false;
            state.message = action.payload.message;
            state.successWork = true;
            state.forgetErrorError = false;
         })
         .addCase(ForgetPassword.rejected, (state, action) => {
            state.loadForget = false;
            state.message = action.payload;
            state.forgetErrorError = true;
         })
         .addCase(RemoveUser.fulfilled, (state) => {
            state = {
               auth: false,
               authStatus: false,
               status: null,
               users: {},
               load: false,
               error: '',
               message: '',
               loadAuth: false,
               errorAuth: '',
               success: false,
               successWork: false,
               messageForget: '',
               loadForget: false,
               forgetErrorError: false,
               isOpenLogoutModal: false,
            };
         })
         .addCase(RemoveUser.pending, (state) => {
            state.load = true;
         })
         .addCase(RemoveUser.rejected, (state) => {
            state.load = false;
         });
   },
});

export const { changeStatus, resetAuth, setIsOpenLogoutModal, setLoading } = authSlice.actions;

export default authSlice.reducer;
