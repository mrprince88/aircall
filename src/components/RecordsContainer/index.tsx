import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Archive } from "@emotion-icons/material";

import Record from "src/components/Record";
import { RecordsContainerProps, Tab } from "src/types";
import classes from "./styles.module.css";

import { RecordData } from "src/types";

const getFilteredData = (data: RecordData[]) => {
  return data
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
    }, {} as { [key: string]: RecordData[] });
};

export default function RecordsContainer({ type }: RecordsContainerProps) {
  const { data, isLoading } = useQuery<{ [key: string]: RecordData[] }>(
    ["records", type],
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
      if (type === Tab.ALL)
        return getFilteredData(
          res.data.filter((call: RecordData) => !call.is_archived) || []
        );
      else
        return getFilteredData(
          res.data.filter((call: RecordData) => call.is_archived) || []
        );
    },
    {
      onError: (err) => {
        alert(err);
      },
    }
  );

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : !data ? (
        <div className={classes.noData}>No data</div>
      ) : (
        <>
          <button className={classes.archiveBtn}>
            <Archive size={30} color="#ddd" style={{ marginRight: 5 }} />
            Archive all calls
          </button>
          {Object.keys(data).map((date) => (
            <div key={date}>
              <div className={classes.date}>{date}</div>
              {data[date].map((call) => (
                <Record key={call.id} call={call} />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
