
import { Typography } from '@material-ui/core';
import React,{lazy, Suspense} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CourseCard from '../DashBoard/CourseCard/CourseCard';
import CardOfAllCourse from './CardOfCourse/CardOfAllCourse';

import styles from "./allcources.module.css";
const AllCourses = () => {
    return (
        <div className={styles.main}>
            <Container>
               <Typography className='text-center my-3 border-bottom' variant='h3' color="primary" >
                   All Courses
               </Typography>
               <Suspense  fallback={<div>Loading...</div>}>
               <CardOfAllCourse/>
               </Suspense>
            
            </Container>
        </div>
    );
};

export default AllCourses;