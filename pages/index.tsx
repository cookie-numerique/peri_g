import {Stack, Typography} from "@mui/material";
import React from 'react';
import Layout from "components/layout/layout";
import {Button} from "components/buttons/Button";
import ModalTask from "app-components/tasks/ModalTask";
import {useTaskManager} from "services/useTaskManager";
import ListTasks from "app-components/tasks/ListTasks";
import {formatDate} from "functions/dates/dates";

export default function Home() {
  const [isOpen, setOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState<number | undefined>();
  const {findAll, findById, deleteTask} = useTaskManager();

  // Function
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTaskId(undefined);
  };
  const allTasks = findAll();
  const taskOfTheDay = allTasks?.filter(task => task.date === formatDate({date: new Date(), format: 'YYYY-MM-DD'}));
  const otherTasks = allTasks?.filter(task => task.date !== formatDate({date: new Date(), format: 'YYYY-MM-DD'}));
  const handleClickTask = (taskId: number | undefined) => {
    handleOpen();
    setTaskId(taskId);
  }

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>, taskId: number | undefined) => {
    e?.stopPropagation()
    deleteTask(taskId);
  }
  // Variables
  const defaultValue = findById(taskId);
  return (
    <Layout>
      <Stack spacing={5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h1" fontSize="2em">Liste des tâches</Typography>
          <Button onClick={handleOpen} label="Ajouter une tâche"/>
        </Stack>

        <Stack spacing={3}>

          {/* Task of the day */}
          <Typography variant="h2" fontSize="1em">Tâches du jour</Typography>
          <ListTasks tasks={taskOfTheDay} onClick={handleClickTask} onDelete={handleDelete}/>

          {/* Other tasks */}
          <Typography variant="h2" fontSize="1em">A venir:</Typography>
          <ListTasks tasks={otherTasks} onClick={handleClickTask} onDelete={handleDelete}/>
        </Stack>

      </Stack>
      {/* Modal for create or update a task */}
      <ModalTask isOpen={isOpen} handleClose={handleClose} task={defaultValue}/>
    </Layout>
  );
}
