import { NavLink } from "react-router-dom";
import classes from "./styles.module.css";

export default function Tabs() {
  return (
    <div className={classes.container}>
      <NavLink
        className={({ isActive }) =>
          isActive ? classes.activeTab : classes.tab
        }
        to="/activities"
        end
      >
        All
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? classes.activeTab : classes.tab
        }
        to="/activities/archived"
      >
        Archived
      </NavLink>
    </div>
  );
}
