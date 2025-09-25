import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate();

    const [allCourses, setallCourses] = useState([]);
    const [isEducator, setisEducator] = useState(true);

    const [enrolledCourses, setenrolledCourses] = useState([]);

    const fetchAllCourses = async () => {
        setallCourses(dummyCourses)
    }

    const calculateRating = (course) => {
        if(course.courseRatings.length === 0){
            return 0; 
        }
        let totalrating = 0; 
        course.courseRatings.forEach(rating => {
            totalrating += rating.rating; 
        })

        return totalrating/(course.courseRatings.length); 

    }

    // func to  calculate chapter time 
    const calculateChapterTime = (chapter) => {
        let time = 0; 
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time*60*1000 , {units : ["h","m"]})
    }

    // func to calc course duration 
    const calculateCourseDuration = (course) => {
        let time = 0; 
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time*60*1000 , {units : ["h","m"]})
    }

    // func to calc number of lectures in the course 
    const calculateNoOfLectures = (course) => {
        let count = 0; 
        course.courseContent.forEach((chapter) => {
            if(Array.isArray(chapter.chapterContent)){
                count += chapter.chapterContent.length; 
            }
        });
        return count; 
    }

    // fetch user enrolled courses 
    const fetchUserEnrolledCourses = async () => {
        setenrolledCourses(dummyCourses);
    }


    useEffect(() => {
      fetchAllCourses();
      fetchUserEnrolledCourses();
    }, [])
    

    const value = {
        currency , allCourses , navigate , calculateRating , isEducator , 
        setisEducator , calculateNoOfLectures , calculateCourseDuration , calculateChapterTime,
        enrolledCourses , fetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}