import React from 'react';
import {Grid, Stack, Typography} from "@mui/material";
import {TaskType} from "types/TaskType";
import {formatDate} from "functions/dates/dates";
import ClearIcon from '@mui/icons-material/Clear';

type ListTasksProps = {
  tasks: Array<TaskType> | undefined;
  onClick: (taskId: number | undefined) => void;
  onDelete: (e: React.MouseEvent<SVGSVGElement>, taskId: number | undefined) => void;
}

export default function ListTasks(props: ListTasksProps) {

  const {tasks = [], onClick = () => null, onDelete = () => null} = props;

  return (<Stack
    marginTop="1em"
    marginBottom="1em"
    spacing={1}
  >
    {tasks?.map((task: TaskType) => (
      <Grid
        padding="0.5em"
        paddingLeft="1em"
        paddingRight="1em"
        border="1px solid gray"
        borderRadius="5px"
        key={task.id}
        onClick={() => onClick(task?.id)}
        sx={{
          '&:hover': {
            backgroundColor: 'snow',
            cursor: 'pointer'
          },
        }}
        container
      >
        {/* Date task*/}
        <Grid item xs={2}>
          <Typography fontWeight="bold">{formatDate({date: task?.date, format: 'DD/MM/YYYY'})}</Typography>
        </Grid>

        {/* Name task */}
        <Grid item xs={3}>
          <Typography>{task?.name}</Typography>
        </Grid>
        {/* Description task */}
        <Grid item xs={6}>
          <Typography
            sx={{wordWrap: 'break-word'}}
            fontStyle="italic"
          >{task?.description ?? 'Aucune description'}</Typography>
        </Grid>

        {/* Close icon for delete task */}
        <Grid item xs={1}>
          <Stack alignItems="end">
            <ClearIcon
              sx={{color: "#d01b1b"}}
              onClick={(e) => onDelete(e, task?.id)}/>
          </Stack>
        </Grid>
      </Grid>
    ))}
  </Stack>)
}
