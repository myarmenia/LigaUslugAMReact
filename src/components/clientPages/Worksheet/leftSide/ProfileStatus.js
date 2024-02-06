import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import 'moment/locale/ru';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoSVG from '../../../../assets/svg/Profile/InfoSVG';
import SuccessSVG from '../../../../assets/svg/Profile/SuccessSVG';
import { EXECUTOR_STATUS } from '../../../../constants/auth';
import { LightTooltip } from '../../../../globalStyles/LightTooltip';
import { useProfileCardStyles } from '../../../../globalStyles/ProfileCardStyles';
import { resetResponseErr } from '../../../../store/reducers/ProfileDataReducer';
import { AddAvatar } from '../../../UI/modals/Avatar/AddAvatar';
import ProgressLine from '../../../UI/progressLine/ProgressLine';
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Upload2 from '../../../../assets/image/upload2.png';
import { verifyPhoneCode } from '../../../../store/actions/ProfileDataActions';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   maxWidth: 400,
   width: '100%',
   bgcolor: 'background.paper',
   borderRadius: '20px',
   boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.15)',
   boxShadow: 24,
   p: '20px 90px',
   '@media(max-width: 560px)': {
      maxWidth: 'auto',
      width: '50%',
   },
};

const ProfileStatus = ({ setShowModal, user, role, profile }) => {
   const classes = useProfileCardStyles();
   const dispatch = useDispatch();
   const { created_at, img_path } = user;
   const {
      profile: { profile_persent },
      user: { name, last_name },
   } = useSelector((state) => state.profile);
   const boz = useSelector((state) => state.profile);
   const [avatarPreview, setAvatarPreview] = useState(img_path);
   const status = useSelector((state) => state.auth.status);
   const err = useSelector((state) => state.profile.responseErr);
   const onTheDayOfRegistration = useMemo(() => {
      if (Array.isArray(user) && user[0]?.created_at) {
         return moment(user[0]?.created_at).format('L');
      } else if (user?.created_at) {
         return moment(user?.created_at).format('L');
      } else {
         return moment().format('L');
      }
   }, [user]);
   useEffect(() => {
      if (user[0]?.img_path && err) {
         setAvatarPreview(user[0]?.img_path);
         dispatch(resetResponseErr());
      }
      if (user?.img_path && err) {
         setAvatarPreview(user?.img_path);
         dispatch(resetResponseErr());
      }
   }, [user[0]?.img_path, user.img_path, err]);
   useEffect(() => {
      if (user[0]?.img_path) {
         setAvatarPreview(user[0].img_path);
      }
      if (user?.img_path) {
         setAvatarPreview(user?.img_path);
      }
   }, [user[0]?.img_path, user.img_path]);

   const [open, setOpen] = useState(false);
   const [value, setValue] = useState('');
   return (
      <Card sx={{ boxShadow: 2 }} className={classes.root}>
         <Box className={classes.orderSubBlockSpaceBetween}>
            <Typography
               sx={{ fontSize: '23px', color: '#000', fontWeight: '500', paddingBottom: '13px' }}>
               Պրոֆիլի կարգավիճակ{' '}
            </Typography>
         </Box>

         <Box style={{ background: '#808080', height: 2, marginBottom: '10px' }} />
         <Box style={{ display: 'flex', alignItems: 'center' }}>
            <AddAvatar
               avatarPreview={avatarPreview} // skzbnakan nkarna (personi icon)
               setAvatarPreview={setAvatarPreview} // vereviny poxox funkcian
            />

            <Box>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '21px', color: '#000', fontWeight: '500' }}>
                     {name && last_name
                        ? `${name} ${last_name}`
                        : `${user[0]?.name} ${user[0]?.last_name}`}
                  </Typography>
                  <InfoSVG size={8} color={'#4B9A2D'} margin={'-5px 0 0 5px'} />
               </div>
               {status === EXECUTOR_STATUS && (
                  <Box
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                     }}>
                     <Rating
                        style={{ color: '#FFF066' }}
                        size={'small'}
                        name="half-rating-read"
                        defaultValue={profile?.total_reiting || 0}
                        readOnly
                        precision={0.5}
                     />
                     <Typography style={{ whiteSpace: 'nowrap' }} variant={'h4'}>
                        ({profile?.executor_review_count || 'Нет'} отзывов)
                     </Typography>
                  </Box>
               )}
            </Box>
         </Box>
         <Typography variant={'h5'} component="div">
            {user?.email || user[0]?.email ? (
               <>
                  <SuccessSVG />
                  էլ փոստը հաստատված է
               </>
            ) : (
               <>
                  <InfoSVG /> Էլ էլփոստը հաստատված չէ{' '}
               </>
            )}
         </Typography>

         <LightTooltip
            title="Սեղմեք՝ ձեր հեռախոսահամարը հաստատելու համար"
            placement="bottom-start"
            arrow>
            <Typography
               variant={'h5'}
               component="div"
               className={classes.textBtn}
               onClick={() => setShowModal(true)}>
               {(user.phone_status === 'verified' && user.phone_status) ||
               (user[0]?.phone_status === 'verified' && user[0]?.phone_status) ? (
                  <>
                     <SuccessSVG />
                     Հեռախոսահամարը հաստատված է
                  </>
               ) : (
                  <Box sx={{ display: 'flex' }} onClick={() => setOpen(!open)}>
                     <InfoSVG /> Հեռախոսահամարը հաստատված չէ{' '}
                  </Box>
               )}
            </Typography>
         </LightTooltip>
         <Typography variant={'h5'} component="div">
            {user?.status || user[0]?.status ? (
               <>
                  <SuccessSVG />
                  էջը հաստատված է{' '}
               </>
            ) : (
               <>
                  <InfoSVG /> էջդ հաստատված չէ{' '}
               </>
            )}
         </Typography>
         {role === 'executor' && (
            <Typography variant={'h5'} component="div">
               {user?.status === 'Пасив' ? (
                  <>
                     <InfoSVG />
                     Ձեր էջը ակտիվ չէ
                  </>
               ) : (
                  <>
                     <SuccessSVG />
                     Ձեր էջը ակտիվացված է
                  </>
               )}
            </Typography>
         )}
         {role === 'executor' && (
            <ProgressLine persent={profile_persent?.toFixed(0) ? profile_persent?.toFixed(0) : 0} />
         )}
         <Typography variant="caption" style={{ fontStyle: 'italic', color: '#808080' }}>
            Կայքում եք {onTheDayOfRegistration}
         </Typography>

         <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
               <Box sx={{ textAlign: 'center' }}>
                  <Typography
                     sx={{
                        fontSize: '23px',
                        fontWeight: '500',
                        marginBottom: '10px',
                        '@media (max-width: 560px)': {
                           fontSize: '18px',
                        },
                     }}>
                    Հաստատեք ձեր հեռախոսահամարը
                  </Typography>
               </Box>
               <Box style={{ background: '#808080', height: 1, marginBottom: '10px' }} />

               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '48px',
                     paddingTop: '41px',
                  }}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '22px',
                     }}>
                     <TextField
                        placeholder="+374 77 777 777"
                        sx={{ width: '100%' }}
                        type="number"
                        onChange={(e) => setValue(e.target.value)}></TextField>
                     <Button
                        onClick={() => dispatch(verifyPhoneCode(value))} // es padverditi hamara es zaprosy ,,otpravit kodiny chka
                        sx={{
                           backgroundColor: '#FF6B00',
                           color: '#FFF',
                           borderRadius: '10px',
                           fontSize: '18px',
                           width: '60%',
                           '&:hover': { backgroundColor: '#FF6B00' },
                           '@media (max-width: 560px)': {
                              fontSize: '14px',
                           },
                        }}>
                        Ուղարկեք կոդը
                     </Button>
                  </Box>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '22px',
                     }}>
                     <TextField placeholder="կոդ" sx={{ width: '100%' }}></TextField>
                     <Button
                        sx={{
                           backgroundColor: '#FF6B00',
                           color: '#FFF',
                           borderRadius: '10px',
                           fontSize: '18px',
                           width: '60%',
                           '&:hover': { backgroundColor: '#FF6B00' },
                           '@media (max-width: 560px)': {
                              fontSize: '14px',
                           },
                        }}>
                        Հաստատել
                     </Button>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </Card>
   );
};
export default ProfileStatus;
