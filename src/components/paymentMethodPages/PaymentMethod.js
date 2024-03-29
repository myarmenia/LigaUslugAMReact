import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import img from '../../assets/New.png';
const paragraph = {
   fontWeight: 500,
   fontSize: '29px',
   lineHeight: '47px',
   color: '#445E77',
   margin: '0 auto',
   marginTop: '16px',
   '@media (max-width: 900px)': {
      fontSize: '20px',
      marginTop: '0px',
   },
};
const titlt = {
   fontStyle: 'normal',
   fontWeight: 500,
   fontSize: '40px',
   lineHeight: '47px',
   color: '#445E77',
   margin: '0 auto',
   marginTop: '30px',
   '@media (max-width: 900px)': {
      fontSize: '30px',
      marginTop: '20px',
   },
};
const text = {
   fontWeight: 400,
   fontSize: '16px',
};

const PaymentMethods = () => {
   const { auth } = useSelector((state) => state.auth);

   return (
      <Box
         sx={
            auth
               ? {
                    paddingTop: '100px',
                    paddingBottom: '20px',
                    // background: '#CFCFCF',
                    // background:
                    //   "linear-gradient(89.86deg, rgba(73, 148, 43, 0.2) 18.5%, rgba(68, 94, 119, 0.2) 74.84%)",
                    // width: "100%",
                    '@media (max-width: 900px)': {
                       paddingTop: '80px',
                    },
                 }
               : {
                    paddingTop: '10px',
                    paddingBottom: '20px',
                    background: '#CFCFCF',
                    // background:
                    //   "linear-gradient(89.86deg, rgba(73, 148, 43, 0.2) 18.5%, rgba(68, 94, 119, 0.2) 74.84%)",
                    width: '100%',
                 }
         }>
         <Container>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '1000px',
                  margin: '0 auto',
               }}>
               <Typography variant="h4" sx={paragraph}>
                  Ո՞վ ինչի համար է վճարում ?
               </Typography>
               <Typography sx={{ mt: 1, ...text }} component="div" variant="body2">
                  Ծառայության փոքր կանոններ՝ կապված վճարումների հետ:
               </Typography>
               <Typography sx={{ mt: 1, ...text }} component="span" variant="body2">
                  Քանի դեռ հաճախորդը չի ընտրել ճիշտ մասնագետին, ոչ ոք ոչինչ չի վճարում։
               </Typography>
               <Typography sx={{ mt: 1, ...text }} component="span" variant="body2">
                  Այն բանից հետո, երբ հաճախորդը առաջադրանք է թողնում «Ծառայությունների լիգա»
                  հարթակում, մասնագետներն այս առաջադրանքը տեսնում են ըստ իրենց կատեգորիաների, որոնք
                  նրանք նշել են հարցաշարում:Եթե ​​մասնագետը հետաքրքրված է տվյալ առաջադրանքով, եթե
                  այն ժամանակի և արժեքի առումով հարմար է, ապա մասնագետն արձագանքում է այդ
                  առաջադրանքին՝ հնարավորություն ստանալով իր ժամանակը և արժեքը առաջարկել պատվերն
                  ավարտելու համար։ Սեղմում է «արձագանքել» կոճակը, ըստ ալգորիթմի լրացնում է անհրաժեշտ
                  տվյալները և առաջարկն ուղարկում հաճախորդին։ Այդ պահին տվյալ պատասխանի համար
                  մասնագետի հաշվեկշռից հանվում է որոշակի գումար(Յուրաքանչյուր պատասխան արժե որոշակի
                  գումար):Պատասխանի համար վճարը գանձվում է յուրաքանչյուր մասնագետից, ով առաջարկ է
                  ուղարկել առաջադրանքի համար:Հաջորդը, հաճախորդը ուսումնասիրում է մասնագետների
                  առաջարկները:Ցանկության դեպքում նա մանրամասներ է պարզաբանում «Ծառայությունների
                  լիգա» կայքում յուրաքանչյուր մասնագետի հետ անձնական նամակագրության միջոցով, դիտում
                  է մասնագետի վարկանիշը, ինչպես նաև մասնագետի կատարած առաջադրանքների քանակը: Եվ
                  արդեն որոշելով, թե ում հետ է աշխատելու, ընտրում է արձագանքած մի քանի մասնագետներից
                  մեկին։ Հենց հաճախորդն ընտրել է մասնագետին, դա նշանակում է, որ գործարք է տեղի
                  ունեցել, և այս մասնագետի անձնական հաշվի մնացորդը մնում է անփոփոխ: Բոլոր մյուս
                  մասնագետները, ովքեր արձագանքել են առաջադրանքին, ստանում են ծանուցում, որ հաճախորդն
                  ընտրել է մասնագետին: իսկ պատասխանի համար գանձված գումարը վերադարձվում է մնացածին
               </Typography>
               <Typography sx={{ mt: 1, ...text }} component="span" variant="body2">
                  Այսինքն, մի խոսքով, հաճախորդի կողմից մասնագետ ընտրելու փուլում բոլոր պատասխանող
                  մասնագետները վճարում են պատասխանների համար: Վճարումը կատարվում է ավտոմատ կերպով
                  ձեր անձնական հաշվի մնացորդից: Այս դեպքում մնացորդը պետք է լինի դրական, որպեսզի
                  բավարարի պատասխանի ծախսերը հոգալու համար, այլապես հնարավոր չի լինի պատասխանել
                  պատվերին։ Մասնագետի կողմից մասնագետ ընտրելուց հետո բոլորը ծանուցում են ստանում, որ
                  հաճախորդն ընտրել է անհրաժեշտ մասնագետին, և գաձված գումարը վերադարձվում է
                  հաշվեկշռին: Իսկ ձեր ընտրած մասնագետին պատասխանի համար հանված գումարը չի
                  վերադարձվում։
               </Typography>
               <Typography variant="h4" sx={paragraph}>
                  Մասնագետների և հաճախորդների գրանցում
               </Typography>

               <Typography sx={{ mt: 1, ...text }} component="span" variant="body2">
                  Ծառայությունների լիգան առաջարկում է գրանցման եզակի ալգորիթմ: Ի տարբերություն այլ
                  հարթակների, որտեղ դուք պետք է առանձին էջեր ստեղծեք կատարողների և հաճախորդների
                  համար, շատ ժամանակ ծախսեք դրա վրա, լրացնեք շատ տեղեկություններ: Ամեն ինչ չէ, որ
                  միանգամից բոլորի մոտ է ստացվում։ Կամ գուցե ընդհանրապես հնարավոր չլինի գրանցվել:
                  Մենք լուծեցինք այս խնդիրը և ամեն ինչ պարզեցրեցինք, որպեսզի բոլորը կարողանան
                  գրանցվել։ Եվ ամենակարևորը՝ մեկ անգամ։
               </Typography>
               <Typography sx={{ mt: 1, ...text }} component="span" variant="body2">
                  Այսինքն, երբ առաջին անգամ գրանցվում եք, ձեզ համար ստեղծում եք մեկ հաշիվ
                  Ծառայությունների լիգայում: Հենց առաջին տվյալները լրացնելուց, մուտքի և գաղտնաբառի
                  պահպանումից հետո դուք տեղափոխվում եք հաճախորդի էջ:
               </Typography>

               <Box sx={{ mt: 1, ...text }}>
                  <Box
                     sx={{
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        width: '100%',
                        paddingTop: 'calc((16/21)*100%/2)',
                     }}
                  />
               </Box>
               <Typography component="span" variant="body2" sx={{ mt: 1, ...text }}>
                  Հաջորդը, որպես հաճախորդ, լրացրեք անհրաժեշտ տվյալները ձևի մեջ և հետևեք
                  Ծառայությունների լիգայի ծառայության ալգորիթմին: Առանց տեղափոխելու կամ նոր հաշիվներ
                  ստեղծելու, դուք կարող եք անցնել հաճախորդի և հաճախորդ և կատարող հաշիվների միջև
               </Typography>
               <Typography component="span" sx={{ mt: 1, ...text }} variant="body2">
                  Ի՞նչ է սա տալիս: Ո՞րն է առավելությունը: Մեկ մուտք և գաղտնաբառ երկու հաշիվների
                  համար, ինչպես կատարողի, այնպես էլ հաճախորդի համար: Դուք գրանցվում եք մեկ անգամ և
                  օգտագործում եք երկու հաշիվ:
               </Typography>
               <Typography component="span" variant="body2" sx={{ mt: 1, ...text }}>
                  Եթե ​​դուք պարզապես որոշել եք հաշիվ ստեղծել և գրանցվել Ծառայությունների Լիգայում
                  որպես հաճախորդ, ապա ստիպված չեք լինի գնալ կատարողի անձնական հաշիվ: Մասնագետներ
                  գտնելու և առաջադրանքները թողնելու համար բավարար են այն տվյալները, որոնք դուք
                  լրացնում եք հաճախորդի անձնական հաշվում։
               </Typography>
               <Typography component="span" variant="body2" sx={{ mt: 1, ...text }}>
                  Եթե ​​դուք մասնագետ եք, ապա հաշիվ ստեղծելուց հետո պարզապես անհրաժեշտ է անցնել
                  կատարողի հաշվին: Ձեր հաշիվը կատարողին անցնելուց հետո դուք պետք է լրացնեք
                  տեղեկատվությունը որպես կատարող, բայց առանց լրացուցիչ գրանցման:
               </Typography>
               <Typography component="span" variant="body2" sx={{ mt: 1, pb: 3, ...text }}>
                  Եվ այս դեպքում դուք ստանում եք երկու հաշիվ մեկ գրանցմամբ: Այս գործառույթը նաև
                  թույլ է տալիս կատարողներին ինքնուրույն թողնել առաջադրանքները, պարզապես կատարողի
                  հաշվից անցնել հաճախորդի հաշվին:
               </Typography>
            </Box>
         </Container>
      </Box>
   );
};
export default PaymentMethods;
