import { Phone, PhoneMissed, Voicemail } from "@emotion-icons/material";
import classes from "./styles.module.css";

type callType = "missed" | "answered" | "voicemail";

const callIcon: { [key in callType]: JSX.Element } = {
  missed: <PhoneMissed />,
  answered: <Phone />,
  voicemail: <Voicemail />,
};

export default function Call({
  call,
}: {
  call: {
    call_type?: callType;
    from?: string;
    to?: string;
    via?: string;
    duration?: number;
    created_at?: string;
  };
}) {
  return (
    <div className={classes.container}>
      <div className={classes.callIcon}>
        {call.call_type && callIcon[call.call_type]}
      </div>
      <div className={classes.callDetails}>
        <div className={classes.phone}>{call.from}</div>
        <div className={classes.callInfo}>tried to call on {call.to}</div>
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
