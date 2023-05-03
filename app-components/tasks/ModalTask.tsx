import {Box, Modal, Stack, Typography} from "@mui/material";
import React from "react";
import {Button} from "components/buttons/Button";
import {TaskType} from "types/TaskType";
import {Formiz, useForm} from "@formiz/core";
import TextInput from "components/fields/TextInput";
import {isMaxLength} from '@formiz/validations'
import {formatDate} from "../../functions/dates/dates";
import {useTaskManager} from "services/useTaskManager";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  paddingLeft: 4,
  paddingTop: 2,
  paddingBottom: 2,
  paddingRight: 4,
  borderRadius: '0.5em'
};

type ModalTaskProps = {
  isOpen: boolean;
  handleClose: () => void;
  task?: TaskType | undefined;
}

export default function ModalTask(props: ModalTaskProps) {
  const {isOpen, handleClose, task} = props;

  // Hooks
  const form = useForm();
  const {addTask} = useTaskManager();

  // Variables
  const isCreateForm = !task;

  const titleModal = isCreateForm ? "Ajouter une tâche" : "Modifier une tâche";
  const labelSubmit = isCreateForm ? "Ajouter" : "Modifier";

  const currentDate = formatDate({format: 'YYYY-MM-DD'});

  // Queries
  const {updateTask} = useTaskManager();
  // Functions
  /**
   * @description Handle submit form
   * @param {TaskType} values
   * @return {void}
   */
  const handleSubmit = async (task: TaskType) => {

    isCreateForm ? await addTask(task) : await updateTask(task);
    handleClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >

      <Box sx={style}>
        <Formiz connect={form} onValidSubmit={handleSubmit}>
          <Stack spacing={2}>

            <Typography>
              {titleModal}
            </Typography>
            {/* Task id*/}
            {task?.id && (
              <TextInput
                name="id"
                type="text"
                label="id"
                sx={{display: 'none'}}
                defaultValue={task?.id}
                key={task?.id}
              />
            )}
            {/* Field task date */}
            <TextInput
              required
              name="date"
              label="Date"
              type="date"
              defaultValue={task?.date ?? currentDate}
              key={task?.date}
            />

            {/* Field task name */}
            <TextInput
              required
              color="darkGrey"
              name="name"
              label="Nom"
              defaultValue={task?.name}
              key={task?.name}
            />
            {/* Field task description */}
            <TextInput
              color="darkGrey"
              name="description"
              label="Description"
              defaultValue={task?.description}
              key={task?.description}
              validations={[
                {
                  rule: isMaxLength(500),
                  message: '500 caractères maximum.',
                }
              ]}
            />
            {/* Button for submit form */}
            <Button onClick={form?.submit} label={labelSubmit}/>
          </Stack>

        </Formiz>
      </Box>
    </Modal>
  )
}