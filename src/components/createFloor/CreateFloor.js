import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsPlusCircleDotted } from "react-icons/bs";
import Modal from "react-modal";
import axios from "../../utilities/axios";

const CreateFloor = () => {
  const customStyles = {
    content: {
      osition: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  };
  const [paperName, setPaperName] = useState("");
  const [paperBackground, setPaperBackground] = useState(
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJ2LTQiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzIGlkPSJ2LTMiPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3QgaWQ9InYtNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0FBQUFBQSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgaWQ9InYtNyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuXzApIi8+PC9zdmc+"
  );
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const uploadBackground = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.set("name", paperName);
    formData.set("background", paperBackground);
    try {
      const { data } = await axios.post("/paper", formData);
      setIsOpen(false);
      setLoading(false);
      setPaperBackground(data.image);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <h5 className="sideNav">
        Create Floor
        <span className="px-2">
          <BsPlusCircleDotted onClick={openModal} />
        </span>
      </h5>
      <h5 className="sideNav">
        Create shapes
        <span className="px-2">
          <BsPlusCircleDotted />
        </span>
      </h5>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={uploadBackground}>
          <div className="modalInner">
            <h4 className="mt-3">Paper Name</h4>
            <input
              type="text"
              onChange={(e) => {
                setPaperName(e.target.value);
              }}
            />
          </div>
          <div className="modalInner">
            <h4 className="mt-3">Choose Bckground</h4>

            <label className="mt-3" htmlFor="icon-button-file">
              <input
                accept="image/*"
                onChange={(e) => {
                  setPaperBackground(e.target.files[0]);
                }}
                id="icon-button-file"
                type="file"
              />
            </label>
          </div>
          {loading ? (
            <p>loading</p>
          ) : (
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "200px", marginTop: "10px" }}
            >
              Create
            </Button>
          )}
        </form>
      </Modal>
    </div>
  );
};
export default CreateFloor;
