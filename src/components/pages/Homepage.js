import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import Listmed from "../medicines/Listmed";
import axios from "axios";
import { useState } from "react";



const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addMedColor: {
  backgroundColor: green[400],
  color: "Red"
 },
})

const Homepage = () => {
 const classes = useStyles();
 const [medicine, setMedicine] = useState({
  Medname: "",
  Medcomp: "",
  Brand:   "",
  Strength: "",
  Medtype: ""
 });
 const [status, setStatus] = useState();

 function onTextFieldChange(e) {
  setMedicine({
   ...medicine,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.post(`http://localhost:9090/medicine/`, medicine)
   setStatus(true);
  } catch (error) {
   console.log("Failed");
  }
 }
 if (status) {
  return <Homepage />
 }
 return (
  <>
   <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
    <Typography variant="h2">Healthplix Medicine Directory</Typography>
   </Box>
   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addMedColor} mb={2}>
      <Typography variant="h4">Add Medicine</Typography>
     </Box>
     <form noValidate>
    <Grid container spacing={2}>
    <Grid item xs={12}>
        <TextField autoComplete="medname" name="medname" variant="outlined" required fullWidth id="medname" label="Name" onChange={e => onTextFieldChange(e)}/>
    </Grid>
    <Grid container spacing={2}></Grid>
    <Grid item xs={12}>
        <TextField autoComplete="medcomp" name="medcomp" variant="outlined" required fullWidth id="medcomp" label="Commpany Name" onChange={e => onTextFieldChange(e)} />
    </Grid>
    </Grid>
      <Grid item xs={12}>
        <TextField autoComplete="brand" name="brand" variant="outlined" required fullWidth id="brand" label="Brand" onChange={e => onTextFieldChange(e)}/>
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="strength" name="strength" variant="outlined" required fullWidth id="strength" label="Strength" onChange={e => onTextFieldChange(e)}/>
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="medtype" name="medtype" variant="outlined" required fullWidth id="medtype" label="Type" onChange={e => onTextFieldChange(e)}/>
       </Grid>

      <Box m={3}>
       <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Add Medicine</Button>
      </Box>
     </form>
    </Grid>

    <Grid item md={6} xs={12}>
     <Listmed />
    </Grid>
   </Grid>
  </>
 )
}

export default Homepage