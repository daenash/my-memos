import { dummyTasksTags, dummyTasks } from "../DummyData";

export const getTasks = () => {
  return dummyTasks;
};

export const getTask = (id: number) => {
  return dummyTasks.find((dt) => dt.id == id);
};

export const getTasksForTag = (tagId: number) => {
  const taskIds = dummyTasksTags
    .filter((dtt) => dtt.tagId == tagId)
    .map((dtt) => dtt.taskId);
  return dummyTasks.filter((dt) => taskIds.includes(dt.id));
};

export const addTask = ({
  title,
  description,
  tagIds,
}: {
  title: string;
  description: string;
  tagIds?: Array<string>;
}) => {
  const id = Math.max(...dummyTasks.map((dt) => dt.id), 0) + 1;
  const newItem = { id, title, description };
  dummyTasks.push(newItem);
  return newItem;
};
