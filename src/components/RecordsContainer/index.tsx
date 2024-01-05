import { useState } from "react";
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
  const [filteredData, setFilteredData] = useState<{
    [key: string]: RecordData[];
  }>({});

  const {
    data,
    isLoading: isRecordDataLoading,
    refetch,
  } = useQuery<RecordData[]>(
    ["records", type],
    async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/activities`);
      return res.data.filter(
        (call: RecordData) => call.is_archived === (type === Tab.ARCHIVED)
      );
    },
    {
      onError: (err) => {
        alert(err);
      },
      onSuccess: (data: RecordData[]) => {
        setFilteredData(getFilteredData(data));
      },
    }
  );

  const { mutate: archiveMutate, isLoading: isMutatationLoading } = useMutation(
    async () => {
      await Promise.allSettled(
        data?.map((call) =>
          axios.patch(`${import.meta.env.VITE_API_URL}/activities/${call.id}`, {
            is_archived: type === Tab.ALL ? true : false,
          })
        ) || []
      );
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return (
    <div className={classes.container}>
      {isRecordDataLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : !data ? (
        <div className={classes.noData}>No data</div>
      ) : (
        <>
          <button
            className={classes.archiveBtn}
            onClick={() => archiveMutate()}
          >
            {isMutatationLoading ? (
              <div className="loader" />
            ) : (
              <Archive size={30} color="#ddd" style={{ marginRight: 5 }} />
            )}
            {`${type === Tab.ALL ? "Archive" : "Unarchive"} all calls`}
          </button>
          {Object.keys(filteredData).map((date) => (
            <div key={date}>
              <div className={classes.date}>{date}</div>
              {filteredData[date].map((call) => (
                <Record key={call.id} call={call} />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
