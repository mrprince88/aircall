import Call from "src/components/Call";
import { CallsContainerProps, Tab } from "src/types";
import classes from "./styles.module.css";
import data from "src/data/sample";

export default function CallsContainer({ type }: CallsContainerProps) {
  const filteredData = data
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .reduce((acc, call) => {
      const date = new Date(call.created_at);
      const dateStr = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (acc[dateStr]) {
        acc[dateStr].push(call);
      } else {
        acc[dateStr] = [call];
      }
      return acc;
    }, {} as Record<string, any[]>);

  return (
    <div className={classes.container}>
      {Object.keys(filteredData).map((date) => (
        <div key={date}>
          <div className={classes.date}>{date}</div>
          {filteredData[date].map((call) => (
            <Call key={call.id} call={call} />
          ))}
        </div>
      ))}
    </div>
  );
}
