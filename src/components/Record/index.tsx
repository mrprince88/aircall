import { Phone, PhoneMissed, Voicemail } from "@emotion-icons/material";
import { CallType, RecordProps } from "src/types";
import classes from "./styles.module.css";

const callIcon: { [key in CallType]: JSX.Element } = {
  missed: <PhoneMissed />,
  answered: <Phone />,
  voicemail: <Voicemail />,
};

export default function Record({ call }: RecordProps) {
  return (
    <div className={classes.container}>
      <div className={classes.callIcon}>
        {call.call_type && callIcon[call.call_type]}
      </div>
      <div className={classes.callDetails}>
        <div className={classes.phone}>{String(call.from)}</div>
        <div className={classes.callInfo}>
          tried to call on {String(call.to)}
        </div>
      </div>
      <div className={classes.callTime}>
        {call.created_at &&
          new Date(call.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </div>
    </div>
  );
}
