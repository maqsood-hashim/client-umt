import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import base from "../../../TestInfo/BaseUrl";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import CheckIcon from '@material-ui/icons/Check';
import {
  Button,
  Box,
  Card,
  Container,
  IconButton,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import Axios from "axios";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// const [email, setEmail] = useState('');
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});

const StudentTable = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userList = async () => {
    setLoading(true)
    const user = await Axios.get(`${base}/users/student`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("auth_token")
        }
    })

    const filteredData =user.data.studentInfo.filter(item => item.status === "0");
    setData(filteredData)
    // console.log(user)
    setLoading(false)
  };

  useEffect(() => {
    userList()
  }, []);

  const handleStatusChange = async (id,email) => {
   
    console.log(id)
 

    setData((data) => data.filter((user) => user._id !== id));
    axios.post(`${base}/send-email`, { email })
    .then((response) => {
      console.log(response.data);
      // Handle success, e.g., show a success message to the user

      fetch(`${base}/auth/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
         
        },
      })
        .then((res) => res.json())
        .then((result) => {
         
          console.log(data);
          
        })
        .catch((err) => {
          console.log(err);
        });

    })
    .catch((error) => {
      console.log(error);
      alert('An error occurred: ' + error);
    });

     

       


      }
      
      const handleDisapprove = async (id) => {
   
        console.log("Disapproved")
     
    
        setData((data) => data.filter((user) => user._id !== id));
       
    
          fetch(`${base}/auth/disapprove/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
             
            },
          })
            .then((res) => res.json())
            .then((result) => {
             
              console.log(data);
              
            })
            .catch((err) => {
              console.log(err);
            });
    
       
         
    
           
    
    
          }

  //   const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <Container className={classes.root}>
      {
        loading? <div className="text-center my-4">
        <CircularProgress color="secondary" />
      </div>:
      
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-dark ">
              <TableCell align="center" className="text-light">
                Id
              </TableCell>
              <TableCell align="center" className="text-light">
                Profile
              </TableCell>
              <TableCell align="center" className="text-light">
                Student Name
              </TableCell>
              <TableCell align="center" className="text-light">
               Email
              </TableCell>
               <TableCell align="center" className="text-light">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data
              : data
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">
                  {row._id}
                </TableCell>

                <TableCell component="th" scope="row" align="center">
                  <img src={row.profilePicture} alt="Profile" style={{ width: '50px', height: '50px' }} />
                </TableCell>

                <TableCell align="center">{row.userName}</TableCell>
                <TableCell align="center">
                {row.email}
                </TableCell>
                
                 
                    
               
                
              

                <TableCell align="center">
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained"  onClick={()=>(handleStatusChange(row._id,row.email))}  style={{ backgroundColor: 'green', color: 'white' }}>
          Approve
        </Button>
        <Box marginLeft={1}>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}  onClick={()=>(handleDisapprove(row._id,row.email))}>
            Disapprove
          </Button>
        </Box>
      </Box>
    </TableCell>
              </TableRow>
            ))}

           
          </TableBody>
         
        </Table>
      </TableContainer>
}</Container>
            );
};

export default StudentTable;
