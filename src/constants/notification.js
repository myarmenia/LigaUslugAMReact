export const NOTIFICATION_STATUSES = {
   // "App\\Notifications\\NotifyAsTaskExecutor": "Вас выбрали",
   // "App\\Notifications\\RatingForCompletedTask": "Работа выполнена",
   'App\\Notifications\\NotifyExecutorForDeadline': 'Վերջնաժամկետը մոտենում է ավարտին',
   'App\\Notifications\\NotifyEmployerExecutorCompletedTask': 'Աշխատանքն ավարտված է',
   'App\\Notifications\\NotifiyEmployer': 'Ձեր առաջադրանքին նոր արձագանք կա',
   'App\\Notifications\\RatingForCompletedTask': 'Աշխատանքն ավարտված է',
   'App\\Notifications\\RejectTaskExecutorNotification': 'Ձեզ մերժել են',
   'App\\Notifications\\SupportFeedbackNotification': 'Հաղորդագրություն մոդերատորից',
   'App\\Notifications\\NotifyEmployerForGettingRating':
      'Հաճախորդը գնահատեց ձեզ: Ստուգեք ձեր վարկանիշը',
   'App\\Notifications\\NotifyExecutorForGettingRating':
      'Դուք գնահատվել եք օգտվողի կողմից: Ստուգեք ձեր վարկանիշը',
   'App\\Notifications\\NotifyAsTaskExecutor': 'Դուք ընտրվել եք',
   'App\\Notifications\\NotifyExecutorEmployerCompletedTask': 'Հաճախորդը ավարտված պատվերը',
   'App\\Notifications\\NotifyExecutorForNewJobEveryTime': 'Նոր առաջադրանք կա',
   'App\\Notifications\\NotifyEmployerExecutorRejectedSpecialTask':
      'Ձեր անձնական պատվերը չեղարկվել է:',
   'App\\Notifications\\NotifyExecutorForSpecialTask': 'Անձնական պատվերն ուղարկվել է ձեզ',
   'App\\Notifications\\NotifyEmployerForDeletingTask':
      'Ձեր թափուր աշխատատեղը ջնջվել է: Դուք կարող եք կրկին տեղադրել այն:',
   'App\\Notifications\\NotifyExecutorForNewJob': '',
   // "App\\Notifications\\NotifyExecutorForSpecialTask"

   'App\\Notifications\\NotifyEmployerDeleteTaskFromThreeDay': 'Ձեր պատվերը կջնջվի վաղը',
   // 'App\\Notifications\\NotifyEmployerDeleteTaskFromTwoDay': 'Ваш заказ будет удален, через 2 дня',
   'App\\Notifications\\NotifyEmployerDeleteTaskFromTwoDay': 'Ձեր առաջադրանքին պատասխաններ չկան, ',
   "App\\Notifications\\ReturnedMoneyExecutorTwoDay": 'Գումարի հետփոխանցում կատարողին'
};

export const CHECK_EXECUTOR_ICON = [
   'App\\Notifications\\NotifiyEmployer',
   'App\\Notifications\\NotifyEmployerExecutorCompletedTask',
   'App\\Notifications\\NotifiyEmployer',
   'App\\Notifications\\NotifyEmployerForGettingRating',
   'App\\Notifications\\NotifyExecutorEmployerCompletedTask',
   'App\\Notifications\\NotifyEmployerExecutorRejectedSpecialTask',
   'App\\Notifications\\NotifyEmployerForDeletingTask',

   'App\\Notifications\\NotifyEmployerDeleteTaskFromTwoDay',
   'App\\Notifications\\NotifyEmployerDeleteTaskFromThreeDay',
];

export const EMPLOYER_RATING = ['App\\Notifications\\NotifyEmployerForGettingRating'];
export const EXECUTOR_RATING = ['App\\Notifications\\NotifyExecutorForGettingRating'];

export const EXECUTOR_LINK = [
   'App\\Notifications\\NotifyExecutorForDeadline',
   'App\\Notifications\\NotifyAsTaskExecutor',
   'App\\Notifications\\NotifyExecutorForNewJobEveryTime',
   'App\\Notifications\\NotifyExecutorForSpecialTask',
   'App\\Notifications\\NotifyExecutorForGettingRating',
   "App\\Notifications\\NotifyEmployerExecutorCompletedTask",
   "App\\Notifications\\ReturnedMoneyExecutorTwoDay"
];

export const EMPLOYER_LINK = [
   'App\\Notifications\\NotifiyEmployer',
   'App\\Notifications\\NotifyEmployerForGettingRating',
   'App\\Notifications\\NotifyExecutorEmployerCompletedTask',
   'App\\Notifications\\NotifyEmployerForGettingRating',
   'App\\Notifications\\NotifyEmployerExecutorRejectedSpecialTask',
  
   'App\\Notifications\\NotifyEmployerDeleteTaskFromTwoDay',   // naxazgushacum 2 rd or
   'App\\Notifications\\NotifyEmployerDeleteTaskFromThreeDay', // naxazgushacum 3 or@
   'App\\Notifications\\NotifyEmployerForDeletingTask',        // jnjvel e
];
