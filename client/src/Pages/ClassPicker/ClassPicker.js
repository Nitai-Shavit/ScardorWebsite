import { useContext, useEffect, useState } from "react";
import ClassCardModal from "./ClassCardModal";
import "./ClassPicker.css";
import ClassFilters from "./Filters/ClassFilters";
import ApiHandler from "../../Hooks/ApiHandler";
import { AuthContext } from "../../Components/GlobalStates/Authstate";

export default function ClassPicker() {
  const { data, loading, error, setOp } = ApiHandler();
  const [classes, setClasses] = useState([]);
  const { authState } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    stat: [],
    type: [],
    race: [],
    partyRole: "",
    keyInput: 0,
    mobbing: 0,
    funding: 0,
    misc: [],
  });

  const [tags, setTags] = useState({
    stat: [],
    type: [],
    race: [],
    misc: [],
  });

  useEffect(() => {
    setOp("/api/class");
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      setClasses(data);
      const tempTags = { ...tags };
      data?.forEach((element) => {
        if (!tempTags.race.includes(element.race))
          tempTags.race.push(element.race);
        if (!tempTags.stat.includes(element.stat))
          tempTags.stat.push(element.stat);
        if (!tempTags.type.includes(element.archType))
          tempTags.type.push(element.archType);
        tempTags.misc.push(...element.tags);
      });
      tempTags.misc = [...new Set(tempTags.misc)];
      setTags(tempTags);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      let classArr = data ? [...data] : [];
      classArr = classArr.filter((item) => {
        //AND/ORS
        return (
          (!filters.race.length || filters.race.includes(item.race)) &&
          (!filters.stat.length || filters.stat.includes(item.stat)) &&
          (!filters.type.length || filters.type.includes(item.archType)) &&
          // YES/NOS
          (!filters.partyRole ||
            filters.partyRole === item.filters.partyRole) &&
          (filters.keyInput === 0 ||
            filters.keyInput === item.filters.keyInput) &&
          (filters.mobbing === 0 || filters.mobbing === item.filters.mobbing) &&
          (filters.funding === 0 || filters.funding === item.filters.funding) &&
          //TAGS
          (!filters.misc.length ||
            filters.misc.every((v) => item.tags.includes(v)))
        );
      });
      setClasses(classArr);
    }
  }, [filters]);

  return (
    <div className="class-wrapper">
      <div className="filter-wrapper">
        <ClassFilters filters={filters} setFilters={setFilters} tags={tags} />
      </div>
      <div className="cards-wrapper">
        {classes.length
          ? classes.map((item, index) => {
              return (
                <ClassCardModal
                  key={index}
                  job={item}
                  admin={authState.username}
                />
              );
            })
          : "No Classes Available"}
      </div>
    </div>
  );
}
