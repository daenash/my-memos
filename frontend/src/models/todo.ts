import moment from "moment";
import todos from "../store/reducers/todos";

const SOFT_WARNING_DAYS = 5;
const HARD_WARNING_DAYS = 2;

export default class TodoModel {
  id: number;
  title: string;
  description?: string;
  isChecked: boolean;
  dueDate?: moment.Moment;
  createdAt: moment.Moment;

  constructor(data: {
    id: number;
    title: string;
    dueDate?: Date | moment.Moment;
    isChecked?: boolean;
    createdAt?: Date | moment.Moment;
    description?: string;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.isChecked = data.isChecked || false;
    this.dueDate = data.dueDate ? moment(data.dueDate) : undefined;
    this.createdAt = data.createdAt
      ? moment(data.createdAt)
      : moment("2020-05-01");
    this.description = data.description;
  }

  dueIn = (): number | null => {
    if (!this.dueDate) return null;

    const numberOfDaysDueIn = this.dueDate
      ? this.dueDate.diff(moment(), "day")
      : -1;
    return numberOfDaysDueIn;
  };

  isSoftWarning = (): boolean => {
    return (
      (this.dueDate && !this.isChecked && this.dueIn()! < SOFT_WARNING_DAYS) ||
      false
    );
  };

  isHardWarning = (): boolean => {
    return (
      (this.dueDate && !this.isChecked && this.dueIn()! < HARD_WARNING_DAYS) ||
      false
    );
  };

  warningMessage = (): string | null => {
    if (this.dueIn() === null || this.isChecked) {
      return null;
    }

    const dueDays = this.dueIn()! + 1;
    if (dueDays > 0) {
      return `due in less than ${dueDays} day(s)`;
    }
    if (dueDays <= 0) {
      return `overdue ${dueDays} day(s)`;
    }

    return null;
  };
}
