import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useStyles } from "../../../globalStyles/ModalStyles";
import HeaderModal from "./blocks/HeaderModal";
import { useDispatch, useSelector } from "react-redux";
import { Logouts } from "../../../store/actions/AuthActions";
import BlueButton from "../CustomButtons/BlueButton";
import { resetProfile } from "../../../store/reducers/ProfileDataReducer";
import { resetTask } from "../../../store/reducers/TaskReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 3,
};

const ModalLogOut = ({ open, setOpen, setOpenLogOut }) => {
  const handleClose = () => setOpen(false);
  const { load } = useSelector((state) => state.auth);
  const [logout, setLogout] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(Logouts());
    setLogout(true);
  };
  React.useEffect(() => {}, []);
  React.useEffect(() => {
    if (logout) {
      handleClose();
      setLogout(false);
    }
  }, [logout]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ border: "none" }}
      >
        <Box sx={{ ...style, width: { xs: 270, md: 400 } }}>
          <Box className={classes.root}>
            <Box>
              <HeaderModal
                title={"Իսկապե՞ս ուզում եք հեռանալ:"}
                close={handleClose}
              />
              <Box className={classes.footer}>
                <Box
                  style={{
                    width: "50%",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <BlueButton
                    load={load}
                    label={"Դուրց գալ"}
                    variant={"contained"}
                    action={logOut}
                  />

                  <Button onClick={handleClose} className={classes.exitModal}>
                    Ոչ
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLogOut;
