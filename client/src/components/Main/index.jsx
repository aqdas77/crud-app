import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const Main = () => {
  const [userData,setUserData]= useState({
    firstName : "",
    lastName : "",
    email : "",
    phoneNumber : "",
    password : ""
  });
  const [tasks, setTasks] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    phoneNumber : "",
    password : ""
  });
  


  const fetchUserData = async ()=>{
    try{
         const token = localStorage.getItem("token");
         if(!token)
         console.error("No token found!")
         const res = await axios.get("http://localhost:8080/api/users/get-data", { headers: {"Authorization" : `Bearer ${token}`} })
          console.log("res: ",res)
         if(res.status==200){
          setUserData({...userData,
            firstName : res.data._doc.firstName,
            lastName : res.data._doc.lastName,
            email : res.data._doc.email,
            phoneNumber : res.data._doc.phoneNumber,
            password : res.data.password
           })
           setData({...data,
            firstName : res.data._doc.firstName,
            lastName : res.data._doc.lastName,
            email : res.data._doc.email,
            phoneNumber : res.data._doc.phoneNumber,
            password : res.data.password
           })
           console.log("data :",data)
         }
         
        //  console.log("userData",userData)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
   fetchUserData();
  },[])
 
 
  const handleEditInput = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data.taskDeadline)
  };
  
  const handleUpdate = async (data)=>{
     try{
          const token = localStorage.getItem("token")
          const res = await axios.post("http://localhost:8080/api/users/update",data,{
            headers: { Authorization: `Bearer ${token}` }
          })
          if(res.status==200)
          fetchUserData()
     }catch(error){
      console.log(error)
     }
  }
 
  const handleDelete = async()=>{
    try{
       const token = localStorage.getItem("token")
       const res = await axios.delete("http://localhost:8080/api/users/delete",{
        headers: { Authorization: `Bearer ${token}` }
      })
      if(res.status==200)
      handleLogout();
    }catch(error){
      console.log(error)
    }
  }
  const navigate = useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "teal" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: 5,maxWidth:360 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            
          }}
        >
          
          
          <Grid container spacing={1}  width={500} >
            <Grid item xs={12} display="flex" alignItems="center" justifyContent="center" marginBottom={3}>
            <Typography variant="h5" color="white" borderRadius={2} backgroundColor="#DF589A" paddingY={1} paddingX={2}>
            Profile
          </Typography>
            </Grid>
            <Grid item xs={6} borderRadius ="8px 0 0 0" backgroundColor="#B6D0E2" display="flex" alignItems="center" justifyContent="center">
               <Typography variant="h6" fontWeight={500} paddingTop={2} >Name </Typography>
            </Grid>
            <Grid item xs={6} paddingTop={3} borderRadius ="0 8px 0 0" backgroundColor="#B6D0E2"  display="flex" alignItems="center" justifyContent="center">
               <Typography variant="body" paddingTop={2}>{userData.firstName+" "+userData.lastName}</Typography>
            </Grid>
            

            <Grid item xs={6} display="flex" backgroundColor="#B6D0E2"  alignItems="center" justifyContent="center">
               <Typography variant="h6" fontWeight={500}>Email </Typography>
            </Grid>
            <Grid item xs={6} display="flex" backgroundColor="#B6D0E2"  alignItems="center" justifyContent="center">
               <Typography variant="body">{userData.email}</Typography>
            </Grid>

            <Grid item xs={6} display="flex"  backgroundColor="#B6D0E2" alignItems="center" justifyContent="center">
               <Typography variant="h6" fontWeight={500}>Password </Typography>
            </Grid>
            <Grid item xs={6} display="flex" backgroundColor="#B6D0E2"  alignItems="center" justifyContent="center">
               <Typography variant="body">{userData.password}</Typography>
            </Grid>

            <Grid item xs={6} borderRadius ="0 0 0 8px " backgroundColor="#B6D0E2"  display="flex" alignItems="center" justifyContent="center">
               <Typography variant="h6" fontWeight={500} paddingBottom={2}>Mobile Number </Typography>
            </Grid>
            <Grid item xs={6} borderRadius ="0 0 8px 0" backgroundColor="#B6D0E2"  display="flex" alignItems="center" justifyContent="center">
               <Typography variant="body" paddingBottom={2}>{userData.phoneNumber}</Typography>
            </Grid>

            <Grid item  xs={12} marginY={5} display="flex" alignItems="center" justifyContent="center" >
                  <Button variant="outlined" sx={{marginRight:"3rem"}} onClick={()=>setEditModal(true)} >Update Profile</Button>
                  <Button variant="outlined" color="error" onClick={()=>handleDelete()} >Delete Account</Button>
            </Grid>
          </Grid>
        </Box>
        

       
        <Modal
          open={editModal}
          onClose={() => setEditModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Edit Details</h2>
            <form>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                name="firstName"
                onChange={(e) => handleEditInput(e)}
                value={data.firstName}
                fullWidth
                required
                sx={{ mb: 4 }}
              />

              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                name="lastName"
                onChange={(e) => handleEditInput(e)}
                value={data.lastName}
                fullWidth
                required
                sx={{ mb: 4 }}
              />

              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Email"
                name="email"
                onChange={(e) => handleEditInput(e)}
                value={data.email}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Password"
                name="password"
                onChange={(e) => handleEditInput(e)}
                value={data.password}
                fullWidth
                required
                sx={{ mb: 4 }}
              />

              <Stack container spacing={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="submit"
                  onClick={() => handleUpdate(data)}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>

       
      </Container>
    </>
  );
};

export default Main;
