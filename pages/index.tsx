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

  // Hooks
  // Hook used for create, update, delete a task
  const {findAll, findById, deleteTask} = useTaskManager();

  // Function
  /**
   * @description Is executed for open modal
   * @returns {void}
   */
  const handleOpen = (): void => setOpen(true);

  /**
   * @description Is executed for close modal
   * @returns {void}
   */
  const handleClose = (): void => {
    setOpen(false);
    setTaskId(undefined);
  };

  // Retrieve all tasks
  const allTasks = findAll();

  // Filter tasks of the day
  const taskOfTheDay = allTasks?.filter(task => task.date === formatDate({date: new Date(), format: 'YYYY-MM-DD'}));

  // Filter other tasks
  const otherTasks = allTasks?.filter(task => task.date !== formatDate({date: new Date(), format: 'YYYY-MM-DD'}));
  /**
   * @description Handle click on row task
   * @param {number | undefined} taskId
   */
  const handleClickTask = (taskId: number | undefined) => {
    // Open modal
    handleOpen();
    // Set task id (for get task by id in modal)
    setTaskId(taskId);
  }

  /**
   * @description Handle on delete task
   * @param e
   * @param taskId
   */
  const handleDelete = async (e: React.MouseEvent<SVGSVGElement>, taskId: number | undefined) => {
    // For don't open modal
    e?.stopPropagation();
    // Delete task in database
    await deleteTask(taskId);
  }

  // Get default value for modal by task id
  const defaultValue = findById(taskId);

  return (
    <Layout>
      <Stack spacing={5}>
        {/* Title page + button create task */}
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
