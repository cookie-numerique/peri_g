import {tasksTable} from "../config/database.config";
import {TaskType} from "types/TaskType";
import {useLiveQuery} from "dexie-react-hooks";

/**
 * @description This hook is used to manage the storage of tasks
 */
export const useTaskManager = (): {
  addTask: (task: TaskType) => Promise<TaskType>,
  updateTask: (task: TaskType) => Promise<TaskType>,
  findAll: () => Array<TaskType> | undefined,
  findById: (taskId: number | undefined) => TaskType | undefined,
  deleteTask: (taskId: number | undefined) => Promise<null>
} => {

  /**
   * @description This function is used to add a task
   * @param {{addTask: <T = any>(task: TaskType) => Promise<TaskType>}} task
   */
  const addTask = async (task: TaskType): Promise<TaskType> => {

    try {
      const id = await tasksTable.add(task);
      console.info(`A new task was created with id ${id}`);
      return task;
    } catch
      (error) {
      console.error(`Failed to add ${task?.name}: ${error}`);
      return task;
    }
  }

  /**
   * @description This function is used to update a task
   * @param {{addTask: <T = any>(task: TaskType) => Promise<TaskType>}} task
   */
  const updateTask = async (task: TaskType): Promise<TaskType> => {
    try {
      tasksTable.update(task?.id, task);
      console.info(`Task updated with success.`);
      await findAll();
      return task;
    } catch
      (error) {
      console.error(`Failed to add ${task?.name}: ${error}`);
      return task;
    }
  }

  const findAll = (): Array<TaskType> | undefined => {
    try {
      return useLiveQuery(
        () => tasksTable?.orderBy('date')?.toArray()
      );
    } catch (error) {
      console.error('Something went wrong while fetching data.', error)
    }
  }
  const findById = (taskId: number | undefined): TaskType | undefined => {
    try {
      return useLiveQuery(
        () => {
          if (!taskId) return;
          return tasksTable?.where('id')?.equals(taskId)?.first()
        }, [taskId]);
    } catch (error) {
      console.error('Something went wrong while fetching data.', error)
    }
  }

  const deleteTask = async (taskId: number | undefined): Promise<null> => {
    try {
      if (!taskId) return null;
      tasksTable?.delete(taskId);
      console.info(`Task deleted with success.`);
      return null;
    } catch
      (error) {
      console.error(`Failed to delete ${task?.name}: ${error}`);
      return null;
    }
  }


  return {
    addTask,
    updateTask,
    deleteTask,
    findAll,
    findById
  }
}