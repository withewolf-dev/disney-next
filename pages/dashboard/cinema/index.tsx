import React, { useState } from "react";
import styled from "styled-components";
import DashNavBar from "../../../components/DashNavBar";

interface Props {}

const AddCinema = (props: Props) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [titleImg, settitleImg] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [backgroundImg, setbackgroundImg] = useState("");
  const [cardImg, setcardImg] = useState("");
  const [type, settype] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let movies = {
        title,
        description,
        titleImg,
        subTitle,
        backgroundImg,
        cardImg,
        type,
        published: false,
        createdAt: new Date().toISOString(),
      };
      // save the post
      let response = await fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(movies),
      });

      let data = await response.json();

      if (data.success) {
        settitle("");
        setdescription("");
        settitleImg("");
        setsubTitle("");
        setbackgroundImg("");
        setcardImg("");
        settype("");
        alert("Submited");
      } else {
        // set the error
        return alert(data.message);
      }
    } catch (e) {
      alert("Error adding document: ");
    }
  };

  return (
    <>
      <DashNavBar />
      <Container>
        <Input
          value={backgroundImg}
          type={"url"}
          placeholder="background Img url"
          onChange={(e) => {
            setbackgroundImg(e.target.value);
          }}
        />
        <Input
          value={cardImg}
          type={"url"}
          placeholder="Card Img url"
          onChange={(e) => {
            setcardImg(e.target.value);
          }}
        />
        <Input
          value={description}
          type={"text"}
          placeholder="description"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />

        <Input
          value={subTitle}
          type={"text"}
          placeholder="sub title"
          onChange={(e) => {
            setsubTitle(e.target.value);
          }}
        />
        <Input
          value={title}
          type={"text"}
          placeholder="title"
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />

        <Input
          value={titleImg}
          type={"url"}
          placeholder="Title Img url"
          onChange={(e) => {
            settitleImg(e.target.value);
          }}
        />
        <Select
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        >
          <option hidden>choose type</option>

          <option value={"newDisney"}>New Disney</option>
          <option value={"originals"}>Originals</option>
          <option value="recommends">Recommends</option>
          <option value="trending">Trending</option>
        </Select>
        <button onClick={onSubmit}>submit</button>
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  background: url("/images/home-background.png") center center / cover no-repeat
    fixed;
  /* &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  } */
`;

const Input = styled.input`
  height: 40px;
  width: 500px;
  margin: 10px 10px;
  padding: 5px 5px;
`;
const Select = styled.select`
  height: 40px;
  width: 500px;
  margin: 10px 10px;
  padding: 5px 5px;
`;
const Submit = styled.button`
  width: 200px;
  height: 40px;
  background-color: whitesmoke;
  color: black;
  cursor: pointer;
`;
export default AddCinema;
