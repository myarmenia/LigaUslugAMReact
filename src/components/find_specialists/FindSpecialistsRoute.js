import { Route, Routes } from "react-router-dom";
import FindSpecialists from "./FindSpecialists";
import { FilteredSpecialists } from "./FilteredSpecialists";

export default function FindSpecialistsRoute() {
  return (
    <Routes>
      <Route path="/" element={<FindSpecialists />} />
      <Route path="/specialists:id?=" element={<FilteredSpecialists />} />
    </Routes>
  );
}
