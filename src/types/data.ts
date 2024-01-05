import { CallType } from "./enums";

export type RecordData = {
  id: string;
  call_type?: CallType;
  from?: Number;
  to?: Number;
  via?: Number;
  duration?: number;
  created_at: string;
  is_archived: boolean;
};
