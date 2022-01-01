import Link from "next/link";
import React from "react";
import styled from "styled-components";
import DashNavBar from "../components/DashNavBar";

interface Props {}

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashNavBar />
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
