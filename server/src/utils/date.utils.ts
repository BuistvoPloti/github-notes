import * as moment from "moment";

export const getFormattedDate = (date: string): string => moment(date).format("DD/MM/YYYY");
