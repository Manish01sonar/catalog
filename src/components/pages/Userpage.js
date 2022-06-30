import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import Listusr from "../medicines/Listusr";
import axios from "axios";
import { useState } from "react";



const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addUsrColor: {
  backgroundColor: green[400],
  color: "white"
 },
})

const Userpage = () => {
 const classes = useStyles();
 const [user, setUser] = useState({
  Username: "",
  UserID: "",
  Password:  ""
 });
 const [status, setStatus] = useState();

 function onTextFieldChange(e) {
  setUser({
   ...user,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.post(`http://localhost:9090/user/`, user)
   setStatus(true);
  } catch (error) {
   console.log("Failed");
  }
 }
 if (status) {
  return <Userpage />
 }
 return (
  <>
   <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
    <Typography variant="h2">Healthplix User Directory</Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addUsrColor} mb={2}>
      <Typography variant="h4">Add User</Typography>
     </Box>
     <form noValidate>
    <Grid container spacing={2}>
    <Grid item xs={12}>
        <TextField autoComplete="usrname" name="usrname" variant="outlined" required fullWidth id="usrname" label="Name" onChange={e => onTextFieldChange(e)}/>
    </Grid>
    <Grid container spacing={2}></Grid>
    <Grid item xs={12}>
        <TextField autoComplete="usrid" name="usrid" variant="outlined" required fullWidth id="usrid" label="UserID" onChange={e => onTextFieldChange(e)} />
    </Grid>
    <Grid container spacing={2}></Grid>
    </Grid>
        <Grid item xs={12}>
            <TextField autoComplete="password" name="password" variant="outlined" required fullWidth id="password" label="Password" onChange={e => onTextFieldChange(e)}/>
        </Grid>
       
    <Box m={3}>
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add User</Button>
    </Box>
    </form>
    </Grid>

    <Grid item md={6} xs={12}>
     <Listusr />
    </Grid>
   </Grid>
  </>
 )
}

export default Userpage