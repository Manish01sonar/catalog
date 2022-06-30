import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
},
addMedColor: {
    backgroundColor: green[400],
    color: "white"
},
});

const Editmed = () => {
const classes = useStyles();
const { id } = useParams();
const navigate = useNavigate();
const [medicine, setMedicine] = useState({
    medname: "",
    medcomp: "",
    brand: "",
    strength: "",
    medtype: ""
});
useEffect(() => {
    async function getMedicine() {
    try {
        const student = await axios.get(`http://localhost:9090/medicine/:medicineId`)
        setMedicine(medicine.data);
    } catch (error) {
    console.log("Failed");
    }
}
getMedicine();
}, [id]);

function onTextFieldChange(e) {
setMedicine({
    ...medicine,
    [e.target.name]: e.target.value
})
}

async function onFormSubmit(e) {
e.preventDefault()
try {
    await axios.put(`http://localhost:9090/medicine/:medicineId`, medicine)
    navigate("/")
    } catch (error) {
    console.log("Failed");
}
}
function handleClick() {
    navigate("/")
}
return (
    <>
    <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">Hello!</Typography>
    </Box>

    <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
    <Box textAlign="center" p={2} className={classes.addMedColor} mb={2}>
        <Typography variant="h4">Edit Medicine</Typography>
    </Box>
    <form>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField autoComplete="medname" name="medname" variant="outlined" required fullWidth id="medname" label="Medicine" value={medicine.medname} onChange={e => onTextFieldChange(e)} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField autoComplete="medcomp" name="medcomp" variant="outlined" required fullWidth id="medcomp" label="Company" value={medicine.medcomp} onChange={e => onTextFieldChange(e)} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField autoComplete="brand" name="brand" variant="outlined" required fullWidth id="brand" label="Brand" value={medicine.brand} onChange={e => onTextFieldChange(e)} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField autoComplete="strength" name="strength" variant="outlined" required fullWidth id="strength" label="Strength" value={medicine.strength} onChange={e => onTextFieldChange(e)} />
        </Grid>
        <Grid item xs={12}>
            <TextField autoComplete="medtype" name="medtype" variant="outlined" required fullWidth id="medtype" label="Type" value={medicine.type} onChange={e => onTextFieldChange(e)} />
        </Grid>
        </Grid>
            <Box m={3}>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
        </Box>
    </form>
        <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
        </Box>
    </Grid>
    </Grid>
    </>
)
}

export default Editmed