import { Tab } from "./enums";
import { RecordData } from "./data";

export type RecordsContainerProps = {
  type: Tab;
};

export type RecordProps = {
  call: RecordData;
};
