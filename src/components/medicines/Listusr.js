import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
medListColor: {
    backgroundColor: orange[400],
    color: "white"
},
    tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
},
})

const Listmed = () => {
const classes = useStyles();
const [medicines, setMedicines] = useState([]);

useEffect(() => {
    
getAllMedicines();
}, [])

const getAllMedicines= async () => {
    
    const medicines = await axios.get("http://localhost:9090/medicine/")
    console.log("medicines", medicines)
    setMedicines(medicines.data.reverse());
}

const handleDelete = async id => {
await axios.delete(`http://localhost:9090/medicine/${id}`)
getAllMedicines();

}

return (
    <>
    <Box textAlign="center" p={2} className={classes.medListColor}>
        <Typography variant="h4">Medicine List</Typography>
    </Box>
    <TableContainer component={Paper}>
    <Table>
        <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
            <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Medicine</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Commpany</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Brand</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Strength</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Type</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
            </TableRow>
        </TableHead>

    <TableBody>
        {
        medicines.map((medicine, i) => {
        return (
        <TableRow key={i}>
            <TableCell align="center">{i + 1}</TableCell>
            <TableCell align="center">{medicine.Medname}</TableCell>
            <TableCell align="center">{medicine.Medcomp}</TableCell>
            <TableCell align="center">{medicine.Brand}</TableCell>
            <TableCell align="center">{medicine.Strength}</TableCell>
            <TableCell align="center">{medicine.Medtype}</TableCell>

            <TableCell align="center">
            <Tooltip title="Edit">
                <IconButton><Link to={`/edit/${medicine.ID}`} ><EditIcon /></Link></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(medicine.ID)} ><Link to='/'><DeleteIcon  color="secondary" /></Link></IconButton>
            </Tooltip>
            </TableCell>
        </TableRow>
        )
        })
        }

    </TableBody>
    </Table>
    </TableContainer>
</>
)
}

export default Listmed





