import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const useStyles = makeStyles({
 stuListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
});
const Viewmed = () => {
 const classes = useStyles();
 const [medicine, setMedicine] = useState([]);
 const navigate = useNavigate();
 useEffect(() => {
  async function getMedicine() {
   try {
    const medicine = await axios.get(`http://localhost:9090/medicine/`)
    console.log("wwwwwwwww", medicine)

    setMedicine(medicine.data);
   } catch (error) {
    console.log("Failed");
   }
  }
  getMedicine();
 }, [])

 function handleClick() {
  navigate("/")
 }
 return (
  <>
   <Box textAlign="center" p={2} className={classes.stuListColor}>
    <Typography variant="h4">Medicine Detail</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Medicine</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Company</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Brand</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Strength</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Type</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
        {medicine.map((item, index) => {
            return(
                 <TableRow>
                    <TableCell align="center">{index+1}</TableCell>
                    <TableCell align="center">{item.Medname}</TableCell>
                    <TableCell align="center">{item.Medcomp}</TableCell>
                    <TableCell align="center">{item.Brand}</TableCell>
                    <TableCell align="center">{item.Strength}</TableCell>
                    <TableCell align="center">{item.Medtype}</TableCell>
                </TableRow>
            )
        } )}
     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default Viewmed