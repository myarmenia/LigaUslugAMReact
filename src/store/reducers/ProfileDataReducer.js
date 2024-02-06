import {createSlice} from "@reduxjs/toolkit"
import {
	choosesAvatarData,
	choosesProfessionData,
	getProfilePageData,
	getUsersInformation,
	getЕxecutorProfilePageData,
	updateAddressesData,
	updateAddressesDataEmployer,
	updateExecutorData,
	updateNotifications,
	updatePersonalData,
	updatePortfolioData,
	updateSocLink,
	verifyPhoneCode,
} from "../actions/ProfileDataActions"

const initialState = {
	status: "executor",
	profile: {},
	user: {},
	usersInformation: null,
	load: false,
	error: "",
	message: "",
	success: false,
	successWork: false,
	isWrongCode: false,
	responseErr: false,
	reytingPosition:false
}

const profileDataSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		resetProfile: () => initialState,
		resetResponseErr: state => {
			state.responseErr = false
		},
		resetPartReducer: state => {
			state.successWork = false
			state.error = false
			state.message = ""
		},
		resetGettingNotificationsExecutor: (state, {payload}) => {
			if (Array.isArray(state.user)) {
				state.user = state.user.map(el => ({
					...el,
					geting_notification: payload,
				}))
			} else {
				state.user.geting_notification = payload
			}
		},
		changeGettingNotifications: (state, {payload}) => {
			state.user.geting_notification = payload
		},
		changeSocLinks: (state, action) => {
			state.profile.fasebook_link = action.payload.fasebook_link
			state.profile.instagram_link = action.payload.instagram_link
		},
		setProfileIsWrongCode: state => {
			state.isWrongCode = false
		},
		setClearMessage: state => {
			state.message = ""
		},
		setReytingPosition :(state,{payload})=>{
			state.reytingPosition=payload
		}
	},
	extraReducers: (builder)=> {
		builder
		.addCase(getProfilePageData.pending, (state) => {
		  state.load = true;
		})
		.addCase(getProfilePageData.fulfilled, (state, action) => {
		  state.load = false;
		  state.profile = {};
		  state.user = action.payload.user;
		  state.error = false;
		  state.success = true;
		})
		.addCase(getProfilePageData.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.profile = {};
		  state.message = action.payload;
		})
		.addCase(getЕxecutorProfilePageData.pending, (state) => {
		  state.load = true;
		})
		.addCase(getЕxecutorProfilePageData.fulfilled, (state, action) => {
		  state.load = false;
		  state.profile = action.payload.data[0];
		  state.user = action.payload.data[0].user;
		  state.error = false;
		  state.success = true;
		})
		.addCase(getЕxecutorProfilePageData.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.profile = {};
		  state.message = action.payload;
		})
		.addCase(choosesAvatarData.pending, (state) => {
		  state.load = true;
		})
		.addCase(choosesAvatarData.fulfilled, (state, action) => {
		  state.load = false;
		  state.error = false;
		  if (Array.isArray(state.user)) {
			 state.user[0].img_path = action.payload.img_name;
		  } else {
			 state.user.img_path = action.payload.img_name;
		  }
		  state.message = action.payload.message;
		  state.successWork = true;
		})
		.addCase(choosesAvatarData.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.message = action.payload;
		  state.successWork = false;
		  state.responseErr = true;
		})
		.addCase(choosesProfessionData.pending, (state) => {
		  state.load = true;
		})
		.addCase(choosesProfessionData.fulfilled, (state, action) => {
		  state.load = false;
		  state.profile = action.payload.data[0];
		  state.error = false;
		  state.successWork = true;
		  state.message = "Профессия и опыт успешно обновлены";
		})
		// Остальные обработчики событий
		// Можно продолжить добавление обработчиков событий здесь
		.addCase(updateSocLink.pending, (state) => {
		  state.load = true;
		})
		.addCase(updateSocLink.fulfilled, (state, action) => {
		  state.load = false;
		  state.error = false;
		  state.message = action.payload;
		  state.user = action.payload.user;
		  state.successWork = true;
		})
		.addCase(updateSocLink.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.message = action.payload.facebook.message;
		  state.successWork = false;
		})
		.addCase(updateNotifications.pending, (state) => {
		  state.load = true;
		})
		.addCase(updateNotifications.fulfilled, (state, action) => {
		  state.load = false;
		  state.error = false;
		  state.message = action.payload.message;
		  state.successWork = true;
		})
		.addCase(updateNotifications.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.message = "";
		  state.successWork = false;
		})
		.addCase(updatePersonalData.pending, (state) => {
		  state.load = true;
		})
		.addCase(updatePersonalData.fulfilled, (state, { payload }) => {
		  state.load = false;
		  state.error = false;
		  state.user = payload.user ? payload.user[0] : payload.data[0].user;
		  state.successWork = true;
		  state.message = "Личные данные успешно обновлены";
		})
		.addCase(updatePersonalData.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.message = action.payload;
		  state.successWork = false;
		})
		.addCase(updatePortfolioData.pending, (state) => {
		  state.load = true;
		})
		.addCase(updatePortfolioData.fulfilled, (state, action) => {
		  state.load = false;
		  state.error = false;
		  state.profile = action.payload.data[0];
		  state.successWork = true;
		  state.message = "Данные портфеля успешно обновлены";
		})
		// Продолжайте добавлять обработчики событий здесь
		.addCase(updatePortfolioData.rejected, (state, action) => {
		  state.load = false;
		  state.error = true;
		  state.message = action.payload;
		  state.successWork = false;
		});
	}
	// extraReducers: {
	// 	[getProfilePageData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[getProfilePageData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.profile = {}
	// 		state.user = action.payload.user
	// 		state.error = false
	// 		state.success = true
	// 	},
	// 	[getProfilePageData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.profile = {}
	// 		state.message = action.payload
	// 	},
	// 	[getЕxecutorProfilePageData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[getЕxecutorProfilePageData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.profile = action.payload.data[0]
	// 		state.user = action.payload.data[0].user
	// 		state.error = false
	// 		state.success = true
	// 	},
	// 	[getЕxecutorProfilePageData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.profile = {}
	// 		state.message = action.payload
	// 	},
	// 	[choosesAvatarData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[choosesAvatarData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		if (Array.isArray(state.user)) {
	// 			state.user[0].img_path = action.payload.img_name
	// 		} else {
	// 			state.user.img_path = action.payload.img_name
	// 		}
	// 		state.message = action.payload.message
	// 		state.successWork = true
	// 	},
	// 	[choosesAvatarData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 		state.responseErr = true
	// 	},
	// 	[choosesProfessionData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[choosesProfessionData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.profile = action.payload.data[0]
	// 		state.error = false
	// 		state.successWork = true
	// 		state.message = "Профессия и опыт успешно обновлены"
	// 	},
	// 	[choosesProfessionData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 	},
	// 	[updateSocLink.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updateSocLink.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.message = action.payload
	// 		state.user = action.payload.user
	// 		state.successWork = true
	// 	},
	// 	[updateSocLink.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload.facebook.message
	// 		state.successWork = false
	// 	},
	// 	[updateNotifications.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updateNotifications.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.message = action.payload.message
	// 		state.successWork = true
	// 	},
	// 	[updateNotifications.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = ""
	// 		state.successWork = false
	// 	},
	// 	[updatePersonalData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updatePersonalData.fulfilled]: (state, {payload}) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.user = payload.user ? payload.user[0] : payload.data[0].user
	// 		state.successWork = true
	// 		state.message = "Личные данные успешно обновлены"
	// 	},
	// 	[updatePersonalData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 	},
	// 	[updatePortfolioData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updatePortfolioData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.profile = action.payload.data[0]
	// 		state.successWork = true
	// 		state.message = "Данные портфеля успешно обновлены"
	// 	},
	// 	[updatePortfolioData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 	},
	// 	[updateExecutorData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updateExecutorData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.profile = action.payload.data[0]
	// 		state.successWork = true
	// 		state.message = "Данные образование и сертификаты успешно обновлены"
	// 	},
	// 	[updateExecutorData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 	},
	// 	[updateAddressesData.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updateAddressesData.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.profile = action.payload.data[0]
	// 		state.user = {
	// 			...state.user,
	// 			...action.payload.data[0].user,
	// 		}
	// 		state.successWork = true
	// 		state.message = "Данные место жительства успешно обновлены"
	// 	},
	// 	[updateAddressesData.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 	},
	// 	[updateAddressesDataEmployer.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[updateAddressesDataEmployer.fulfilled]: (state, action) => {
	// 		state.load = false
	// 		state.error = false
	// 		state.profile = action.payload.user
	// 		state.user = {
	// 			...state.user,
	// 			...action.payload.user,
	// 		}
	// 		state.successWork = true
	// 		state.message = "Данные место жительства успешно обновлены"
	// 	},
	// 	[updateAddressesDataEmployer.rejected]: (state, action) => {
	// 		state.load = false
	// 		state.error = true
	// 		state.message = action.payload
	// 		state.successWork = false
	// 	},
	// 	[verifyPhoneCode.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[verifyPhoneCode.fulfilled]: (state, {payload}) => {
	// 		if (
	// 			state.user.phone_status &&
	// 			payload === "Ваш номер был успешно подтвержден"
	// 		) {
	// 			state.user.phone_status = "verified"
	// 		} else if (
	// 			Array.isArray(state.user) &&
	// 			payload === "Ваш номер был успешно подтвержден"
	// 		) {
	// 			state.user[0].phone_status = "verified"
	// 		}
	// 		state.message = payload
	// 		state.load = false
	// 	},
	// 	[verifyPhoneCode.rejected]: state => {
	// 		state.isWrongCode = true
	// 		state.load = false
	// 	},
	// 	[getUsersInformation.pending]: state => {
	// 		state.load = true
	// 	},
	// 	[getUsersInformation.fulfilled]: (state, {payload}) => {
	// 		state.usersInformation = payload
	// 		state.load = false
	// 	},
	// 	[getUsersInformation.rejected]: state => {
	// 		state.load = false
	// 	},
	// },
})

export const {
	resetProfile,
	resetResponseErr,
	changeGettingNotifications,
	changeSocLinks,
	resetPartReducer,
	setProfileIsWrongCode,
	setClearMessage,
	resetGettingNotificationsExecutor,
	setReytingPosition
} = profileDataSlice.actions
export default profileDataSlice.reducer
