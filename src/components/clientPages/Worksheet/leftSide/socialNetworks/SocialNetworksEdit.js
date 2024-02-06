import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CustomInputIcon from '../../../../UI/customInput/CustomInputIcon';
import { useProfileCardStyles } from '../../../../../globalStyles/ProfileCardStyles';
import VK from '../../../../../assets/image/VK.png';
import instagram from '../../../../../assets/image/Instagram.png';
// import ok from '../../../../../assets/ok.svg';
import { FileSVG } from '../../../../../assets/svg/Profile/FileSVG';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocLink } from '../../../../../store/actions/ProfileDataActions';
import { changeSocLinks } from '../../../../../store/reducers/ProfileDataReducer';
import Button from '@mui/material/Button';
import save from '../../../../../assets/image/save.svg';

const SocialNetworksEdit = ({ setEditSocialNetwork, setOpenToaster }) => {
  const classes = useProfileCardStyles();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [fasebook_link, setFacebookLink] = useState(
    user?.fasebook_link
      ? user?.fasebook_link
      : user[0]?.fasebook_link
      ? user[0]?.fasebook_link
      : '',
  );
  const [instagram_link, setinstagramLink] = useState(
    user?.instagram_link
      ? user?.instagram_link
      : user[0]?.instagram_link
      ? user[0]?.instagram_link
      : '',
  );
  const [linkError, setLinkError] = useState(false);
  const changeMyProfiles = async () => {
    window.ym(91484981, 'reachGoal', 'zayavka');
    setLinkError('');
    if (!fasebook_link && !instagram_link) {
      return setLinkError('emptys');
    }
    if (fasebook_link && !instagram_link) {
      if (
        !(
          fasebook_link.startsWith('www.vk.com') ||
          fasebook_link.startsWith('vk.com') ||
          fasebook_link.startsWith('https://www.vk.com') ||
          fasebook_link.startsWith('https://vk.com')
        )
      ) {
        return setLinkError('vk');
      }
      await dispatch(
        updateSocLink({
          fasebook_link: fasebook_link.startsWith('https://')
            ? fasebook_link
            : 'https://' + fasebook_link,
        }),
      );
      await dispatch(changeSocLinks({ instagram_link, fasebook_link }));
      setLinkError('');
      setFacebookLink('');
      setinstagramLink('');
      await setOpenToaster(true);
      await setEditSocialNetwork(false);
      return;
    }
    if (instagram_link && !fasebook_link) {
      if (
        !(
          instagram_link.startsWith('www.instagram.com') ||
          instagram_link.startsWith('instagram.com') ||
          instagram_link.startsWith('https://www.instagram.com') ||
          instagram_link.startsWith('https://instagram.com')
        )
      ) {
        return setLinkError('instagram');
      }
      await dispatch(
        updateSocLink({
          instagram_link: instagram_link.startsWith('https://')
            ? instagram_link
            : 'https://' + instagram_link,
        }),
      );
      await dispatch(changeSocLinks({ instagram_link, fasebook_link }));
      setLinkError('');
      setFacebookLink('');
      setinstagramLink('');
      await setOpenToaster(true);
      await setEditSocialNetwork(false);
      return;
    }
    if (
      fasebook_link &&
      !(
        fasebook_link.startsWith('www.vk.com') ||
        fasebook_link.startsWith('vk.com') ||
        fasebook_link.startsWith('https://www.vk.com') ||
        fasebook_link.startsWith('https://vk.com')
      ) &&
      instagram_link &&
      !(
        fasebook_link.startsWith('www.instagram.com') ||
        fasebook_link.startsWith('instagram.com') ||
        fasebook_link.startsWith('https://www.instagram.com') ||
        fasebook_link.startsWith('https://instagram.com')
      )
    ) {
      return setLinkError('not correct');
    }
    if (
      !(
        fasebook_link.startsWith('www.vk.com') ||
        fasebook_link.startsWith('vk.com') ||
        fasebook_link.startsWith('https://www.vk.com') ||
        fasebook_link.startsWith('https://vk.com')
      )
    ) {
      setLinkError('vk');
    }
    if (
      !(
        instagram_link.startsWith('www.instagram.com') ||
        instagram_link.startsWith('instagram.com') ||
        instagram_link.startsWith('https://www.instagram.com') ||
        instagram_link.startsWith('https://instagram.com')
      )
    ) {
      return setLinkError('instagram');
    } else {
      await dispatch(
        updateSocLink({
          fasebook_link: fasebook_link.startsWith('https://')
            ? fasebook_link
              ? fasebook_link
              : 'https://' + fasebook_link
            : '',
          instagram_link: instagram_link.startsWith('https://')
            ? instagram_link
              ? instagram_link
              : 'https://' + instagram_link
            : '',
        }),
      );
      await dispatch(changeSocLinks({ instagram_link, fasebook_link }));
      setLinkError('');
      setFacebookLink('');
      setinstagramLink('');
      await setOpenToaster(true);
      await setEditSocialNetwork(false);
    }
  };

  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box>
        <Box className={classes.orderSubBlockSpaceBetween} sx={{ pb: 1 }}>
          <Typography  sx={{color:"#000", fontWeight:"500",fontSize:"23px"}}>Կցել սոցիալական ցանցեր</Typography>
          <Box
            style={{
              cursor: 'pointer',
              padding: '0',
              '@media (max-width: 414px)': {
                padding: 0,
              },
            }}
            onClick={changeMyProfiles}>
            {/* <Button color="success" variant="contained" type={'submit'}>
              Сохранить
            </Button> */}
            <img src={save} alt="save" />
          </Box>
        </Box>
        <Box style={{ background: '#808080', height: 2, marginBottom: '10px' }} />
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
          <Avatar src={VK} style={{ marginRight: 25 }} variant="rounded" />
          <CustomInputIcon
            width={'100%'}
            value={fasebook_link ? fasebook_link : ''}
            handleChange={(e) => setFacebookLink(e.target.value)}
            placeholder={'Կցել'}
          />
        </Box>
        {linkError === 'vk' && (
          <Typography variant={'h5'} style={{ margin: 0, color: 'red' }}>
            Հղումը պետք է սկսվի կամ www.vk.com կամ vk.com-ով
          </Typography>
        )}
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={instagram} style={{ marginRight: 25 }} variant="rounded" />
          <CustomInputIcon
            width={'100%'}
            value={instagram_link ? instagram_link : ''}
            handleChange={(e) => setinstagramLink(e.target.value)}
            placeholder={'Կցել'}
          />
        </Box>
        {linkError === 'instagram' && (
          <Typography variant={'h5'} style={{ margin: 0, color: 'red' }}>
           Հղումը պետք է սկսվի կամ www.instagram.com կամ instagram.com-ով
          </Typography>
        )}
        {linkError === 'emptys' && (
          <Typography variant="h5" style={{ margin: 0, color: 'red' }}>
            Լրացրեք առնվազն մեկ դաշտ
          </Typography>
        )}
        {linkError === 'not correct' && (
          <Typography variant="h5" style={{ margin: 0, color: 'red' }}>
            Դաշտերը սխալ է լրացված
          </Typography>
        )}
      </Box>
    </Card>
  );
};
export default SocialNetworksEdit;
