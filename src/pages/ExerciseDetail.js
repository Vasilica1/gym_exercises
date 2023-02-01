import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import { exerciseOptions, fetchData} from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideous from '../components/ExerciseVideous';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);
      
    }
  }, [id]);

  return (
    <Box>
      <Detail ExerciseDetail={exerciseDetail}/>
      <ExerciseVideous />
      <SimilarExercises />
    </Box>
  )
}

export default ExerciseDetail