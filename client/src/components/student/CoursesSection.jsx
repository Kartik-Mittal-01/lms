import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard';

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn From The Best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>
        Discover top-courses across various categories including JEE-MAIN, JEE-Advanced, Boards
      </p>

      <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course , index) => (
          <CourseCard key={index} course={course} />
        ) )}
      </div>

      <Link to = '/course-list' onClick={() => scrollTo(0,0)} className='bg-blue-600 text-white-500 border border-gray-500/30 px-10 py-3 rounded' >
        Show All Courses
      </Link>
    </div>
  )
}

export default CoursesSection
