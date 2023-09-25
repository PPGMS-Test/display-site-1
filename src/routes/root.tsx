import SideBar from "../components/Sidebar/Sidebar";
import SearchBar from "../components/Searchbar/SearchBar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Use React Router</h1>
        <SearchBar />
        <SideBar />
      </div>

      <div id="detail" style={{ overflow: "scroll" }}>
        <Outlet />
      </div>
    </>
  );
}
