import { useNavigate, useParams } from "react-router-dom";
import { Archive, ArrowBackIos } from "@emotion-icons/material";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { RecordData } from "src/types";
import classes from "./styles.module.css";

export default function RecordDeatils() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading, refetch } = useQuery<RecordData>(
    "record",
    async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/activities/${params.id}`
      );

      return data;
    },
    {
      enabled: !!params.id,
    }
  );

  const { mutate: archiveMutate, isLoading: mutationLoading } = useMutation(
    async () => {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/activities/${params.id}`,
        {
          is_archived: !data?.is_archived,
        }
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
      <div className={classes.header}>
        <button
          className={classes.backButton}
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/activites");
            }
          }}
        >
          <ArrowBackIos size={25} fontWeight="normal" />
        </button>
        <h4 className={classes.title}>Call Details</h4>
      </div>

      <div className={classes.content}>
        {isLoading && <div>Loading...</div>}
        {data && (
          <>
            <div>
              <div>From: {String(data?.from) || ""}</div>
              <div>To: {String(data?.to) || ""}</div>
              <div>Via: {Number(data.via) || ""}</div>
              <div>Duration: {data.duration}</div>
              <div>Call Type: {data.call_type}</div>
              <div>
                Created At:{" "}
                {new Date(data.created_at).toLocaleDateString([], {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
            <button
              className={classes.archiveBtn}
              onClick={() => archiveMutate()}
            >
              {mutationLoading ? (
                <div className="loader" />
              ) : (
                <Archive size={25} style={{ marginRight: 5 }} />
              )}
              {data.is_archived ? "Unarchive" : "Archive"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
