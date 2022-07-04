import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { iconColors } from "../../utils/customColors.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import styles from "./ProfileButton.module.css";
import { nameContext } from "../../lib/nameContext";

const ProfileButton = () => {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const { name, setName } = useContext(nameContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeUsername = () => {
    setOpen(false);
    setName(newName);
    localStorage.setItem("name", newName);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change your name on this website, please enter your desired
            username here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangeUsername}>Change</Button>
        </DialogActions>
      </Dialog>
      <ThemeProvider theme={iconColors}>
        <motion.button
          className={styles.button}
          animate={{ opacity: [0, 1], y: [400, 0] }}
          initial={{ opacity: 0 }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleClickOpen}
        >
          <PersonIcon color="neutral" fontSize="large" />
        </motion.button>
      </ThemeProvider>
    </>
  );
};

export default ProfileButton;
