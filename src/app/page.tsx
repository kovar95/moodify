// import Image from "next/image";
// import styles from "./page.module.css";
import Header from "../components/Header";
// import { useSidebar } from "./providers/SidebarContextProvider";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";

export default function Home() {
  return (
    <>
      <Header />
      {/* <main className={styles.main}>Main</main> */}
      <Main />
      <Sidebar />
    </>
  );
}
