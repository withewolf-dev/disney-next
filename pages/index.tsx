import type { NextPage } from "next";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {
  getProviders,
  getSession,
  GetSessionParams,
  signOut,
  useSession,
} from "next-auth/react";
import Login from "../components/Login";
import NavHeader from "../components/NavHeader";

export default function Home({ providers }) {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;
  return (
    <>
      <NavHeader providers={providers} />
    </>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export async function getServerSideProps(context: GetSessionParams) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}

//login lay out will have the provider
