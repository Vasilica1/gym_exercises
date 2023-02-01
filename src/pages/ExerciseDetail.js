import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import { youtubeOptions, exerciseOptions, fetchData} from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideous from '../components/ExerciseVideous';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideous, setExerciseVideous] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      const exerciseVideousData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);

      // console.log(exerciseDetailData);
      setExerciseDetail(exerciseDetailData);
      setExerciseVideous(exerciseVideousData.contents);
      setTargetMuscleExercises(targetMuscleExercisesData);
      setEquipmentExercises(equipmentExercisesData);
    }

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={ exerciseDetail }/>
      <ExerciseVideous exerciseVideous={ exerciseVideous }  name={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail