import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Button,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress
} from '@material-ui/core';
import {
  ExploreOutlined,
  SportsEsportsOutlined,
  EmojiObjectsOutlined
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import CommonHeader from '../../components/Common/CommonHeader';
import Styles from './CourseInfo.module.css';
import NoticeToggle from './NoticeToggle/NoticeToggle';
import PlanModel from './NoticeToggle/Content/ThreeDModels/PlanModel';
import FootTraffic from './NoticeToggle/Content/ThreeDModels/FootTraffic';
import Simulation from './NoticeToggle/Content/ThreeDModels/Simulation';


import {  SchoolOutlined, WorkOutlineOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#f44336', // Custom color
    color: '#fff', // Custom text color
    fontSize: '1rem', // Custom font size
    fontFamily: 'Arial', // Custom font family
    padding: '4px', // Custom padding
    borderRadius: '20px', // Custom border radius
    '&:hover': {
      backgroundColor: '#d32f2f', // Custom hover color
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2), // Adjust the margin as needed
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const CourseInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const handleBegin = () => {
    setCategory(0);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleInter = () => {
    setCategory(1);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleExpert = () => {
    setCategory(2);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const history = useHistory();

  const handleButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      const queryParams = new URLSearchParams();
      queryParams.append('level', category);
      queryParams.append('category', 'mega');
      const queryString = queryParams.toString();
      history.push(`/TestInfo?${queryString}`);
      setIsLoading(false);
    }, 5000);
  };

  const classes = useStyles();

  return (
    <div>
      <CommonHeader title="Airport Fundamentals-AM124" />
      <Container className="my-5">
        <Paper className="px-5 py-3">
          <div className="">
            <div className="d-flex justify-content-between align-items-center my-4">
              <Typography variant="h6">Course Content</Typography>
            
             
            
              
            </div>
            {category === 0 ? (
              <FootTraffic />
            ) : category === 1 ? (
              <PlanModel />
            ) : (
              <Simulation />
            )}
            <NoticeToggle catogory={category} />
            <div className={classes.buttonContainer}>
              <Button
                onClick={handleButtonClick}
                className={classes.button}
                variant="contained"
                link="/TestInfo"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={25} color="inherit" />
                ) : (
                  'Attempt Mega Quiz'
                )}
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
     

<BottomNavigation
  value={category}
  onChange={(event, newValue) => {
    setCategory(newValue);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }}
  showLabels
  className={`${classes.bottomNavigation} ${Styles.bottomNavigationMargin}`}
  style={{
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f5f5f5', // Custom background color
    padding: '10px', // Custom padding
    borderRadius: '10px', // Custom border radius
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Custom box shadow
  }}
>
<BottomNavigationAction
  label={<span style={{ fontWeight: 'bold',  fontSize: '1.2rem' }}>Beginner</span>}
  icon={<ExploreOutlined />}
  value={0}
/>
<BottomNavigationAction
  label={<span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Intermediate</span>}
  icon={<SchoolOutlined />}
  value={1}
/>
<BottomNavigationAction
  label={<span style={{ fontWeight: 'bold',fontSize: '1.5rem' }}>Expert</span>}
  icon={<WorkOutlineOutlined />}
  value={2}
/>


</BottomNavigation>


    </div>
  );
};

export default CourseInfo;
