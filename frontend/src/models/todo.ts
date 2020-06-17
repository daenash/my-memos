import moment from "moment";

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

  dueIn = (type: "day" | "seconds" = "day"): number | null => {
    if (!this.dueDate) return null;

    const numberOfDaysDueIn = this.dueDate
      ? this.dueDate.diff(moment(), type)
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
    if (!this.dueDate || this.isChecked || this.dueIn()! >= SOFT_WARNING_DAYS) {
      return null;
    }

    if (this.dueIn()! >= 0) {
      return `Due @ ${this.dueDate.format("YYYY MMM D. HH:mm:ss")}`;
    }
    if (this.dueIn()! < 0) {
      return `Overdue`;
    }

    return null;
  };
}
