import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

interface Props {
  titleProp: string;
  descriptionProp: string;
  titleImgProp: string;
  subTitleProp: string;
  backgroundImgProp: string;
  cardImgProp: string;
  typeProp: string;
  Id: string;
}

const UpdateCinema = ({
  titleProp,
  descriptionProp,
  titleImgProp,
  subTitleProp,
  backgroundImgProp,
  cardImgProp,
  typeProp,
  Id,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, settitle] = useState(titleProp);
  const [description, setdescription] = useState(descriptionProp);
  const [titleImg, settitleImg] = useState(titleImgProp);
  const [subTitle, setsubTitle] = useState(subTitleProp);
  const [backgroundImg, setbackgroundImg] = useState(backgroundImgProp);
  const [cardImg, setcardImg] = useState(cardImgProp);
  const [type, settype] = useState(typeProp);

  const [loading, setloading] = useState(false);

  const onUpdate = async () => {
    setloading(true);

    let movie = {
      title,
      description,
      titleImg,
      subTitle,
      backgroundImg,
      type,
    };
    try {
      await fetch(`/api/movies/${Id}`, {
        method: "PUT",
        body: JSON.stringify(movie),
      });
    } catch (e) {
      alert(`${e}`);
    }

    setloading(false);
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
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
            <option value={"original"}>Originals</option>
            <option value="recommend">Recommends</option>
            <option value="trending">Trending</option>
            <option value="viewrs">Viewrs</option>
          </Select>
          {!loading && <Submit onClick={onUpdate}>Update</Submit>}
          {loading && <CircularProgress />}
        </ModalBox>
      </Modal>
    </div>
  );
};

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

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: #cacad1;
  border: 2px solid #000;
  box-shadow: 24;
  padding: 4px;
  color: black;
  display: flex;
  flex-direction: column;
`;

const Submit = styled.button`
  width: 200px;
  height: 40px;
  background-color: whitesmoke;
  color: black;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  background-color: #f9f9f9;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border-color: transparent;
  }
`;
export default UpdateCinema;
