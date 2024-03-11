import "./ClassFilters.css";
import InputFilter from "./InputFilter";
import TagBox from "./TagBox";

export default function ClassFilters({
  filters,
  setFilters,
  tags = { race: [], stat: [], type: [], misc: [] },
}) {
  return (
    <div className="filters-container">
      <TagBox
        id="race"
        title="Race"
        tags={tags["race"]}
        filters={filters}
        setFilters={setFilters}
      />
      <TagBox
        id="stat"
        title="Main Stat"
        tags={tags["stat"]}
        filters={filters}
        setFilters={setFilters}
      />
      <TagBox
        id="type"
        title="Job Type"
        tags={tags["type"]}
        filters={filters}
        setFilters={setFilters}
      />
      <InputFilter
        title="Party Role"
        dir="column"
        type="radio"
        args={{
          name: "party",
          set: (val) => setFilters({ ...filters, partyRole: val }),
          get: filters.partyRole,
          options: [
            { id: "all", label: "All", value: "", checked: true },
            {
              id: "damager",
              label: "Damager",
              value: "Damager",
              checked: false,
            },
            { id: "hybrid", label: "Hybrid", value: "Hybrid", checked: false },
            {
              id: "support",
              label: "Support",
              value: "Support",
              checked: false,
            },
          ],
        }}
      />
      <InputFilter
        title="High Key Input Only"
        type="toggle"
        args={{
          set: () =>
            setFilters({
              ...filters,
              keyInput: filters.keyInput === 2 ? 0 : filters.keyInput + 1,
            }),
          get: filters.keyInput,
        }}
      />
      <InputFilter
        title="Above Average Mobbing"
        type="toggle"
        args={{
          set: () =>
            setFilters({
              ...filters,
              mobbing: filters.mobbing === 2 ? 0 : filters.mobbing + 1,
            }),
          get: filters.mobbing,
        }}
      />
      <InputFilter
        title="Requires Funding"
        type="toggle"
        args={{
          set: () =>
            setFilters({
              ...filters,
              funding: filters.funding === 2 ? 0 : filters.funding + 1,
            }),
          get: filters.funding,
        }}
      />
      <TagBox
        id="misc"
        title="Misc"
        tags={tags["misc"]}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
