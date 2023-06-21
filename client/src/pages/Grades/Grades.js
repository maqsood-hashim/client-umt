import { Paper, Typography } from "@material-ui/core";
import React, { useState ,useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuestionTable from "./GradesTable";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from "react-redux";
import "./GradeInfo.css"
import base from "../TestInfo/BaseUrl";
const Grades = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [dataClone, setDataClone] = useState([]);
  const [qlevel , setQlevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const Button = ({ text, onClick, color, style }) => {
    const buttonStyle = {
      backgroundColor: color,
      ...style,
    };
  
    return (
      <button onClick={onClick} className="button" style={buttonStyle}>
        {text}
      </button>
    );
  };



  
    
  
  
    
 
 
    
  useEffect(() => {
    setIsLoading(true)
    const fetchGrades = async () => {
     
      try {
        const response = await fetch(`${base}/getStudentGrades/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setData(data);
        } else {
          console.error('Failed to fetch grades:', response.status);
        }
      } catch (error) {
        console.error('Error in fetching grades:', error);
      }
    };

    fetchGrades();
    setIsLoading(false)
  }, []);
   
    // getData();
    
 

  const headingStyle = {
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent black background
    padding: '20px',
    borderRadius: '8px',
    marginBottom:'10px'
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={2} sm={12} className={`d-none d-md-block leftSideBar`}>
          
        <Sidebar  Icon={DashboardIcon} title="Dashboard" link="/" />
        <Sidebar Icon={PersonIcon} title="Profile" link="/profile" />
        <Sidebar Icon={TouchAppIcon} title="Grades" link="/grades" />
     
        <Sidebar Icon={ExitToAppIcon} title="Logout" />
   
      
          </Col>
          <Col md={10}>
            <Container className="mb-5">
              <Paper>
              <Typography
                 Typography variant="h4" style={headingStyle}
                >
                  Grades
                </Typography>
</Paper>
              {/* <div className="button-row">
                <Button
        text="Beginner"
        onClick={() => handleClick(0)}
        color={selectedButton === 0 ? '#4caf50' : '#777'}
        style={{ marginRight: '10px' }}
      />
      <Button
        text="Intermediate"
        onClick={() => handleClick(1)}
        color={selectedButton === 1 ? '#ff9800' : '#777'}
        style={{ marginRight: '10px' }}
      />
      <Button
        text="Expert"
        onClick={() => handleClick(2)}
        color={selectedButton === 2 ? '#f44336' : '#777'}
        style={{ marginRight: '10px' }}
      />
    </div> */}
               {isLoading?   <div className="text-center my-4">
        <CircularProgress color="secondary" />
      </div>:  <QuestionTable Questiondata = {data}/>}
            
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Grades;
