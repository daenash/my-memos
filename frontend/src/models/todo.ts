import moment from "moment";

export default class TodoModel {
  id: number;
  title: string;
  isChecked: boolean;
  dueDate?: moment.Moment;
  createdAt: moment.Moment;

  constructor(data: {
    id: number;
    title: string;
    dueDate?: Date | moment.Moment;
    isChecked?: boolean;
    createdAt?: Date | moment.Moment;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.isChecked = data.isChecked || false;
    this.dueDate = data.dueDate ? moment(data.dueDate) : undefined;
    this.createdAt = data.createdAt
      ? moment(data.createdAt)
      : moment("2020-05-01");
  }

  dueIn = (): number | null => {
    if (!this.dueDate) return null;

    const numberOfDaysDueIn = this.dueDate
      ? this.dueDate.diff(moment(), "day")
      : -1;
    return numberOfDaysDueIn;
  };
}
