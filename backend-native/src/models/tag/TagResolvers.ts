import { dummyTasksTags, dummyTasks, dummyTags } from "../DummyData";

export const getTags = () => {
  return dummyTags;
};

export const getTag = (id: number) => {
  return dummyTags.find((dt) => dt.id == id);
};

export const getTagsForTask = (taskId: number) => {
  const tagIds = dummyTasksTags
    .filter((dtt) => dtt.taskId == taskId)
    .map((dtt) => dtt.tagId);
  return dummyTags.filter((dt) => tagIds.includes(dt.id));
};
