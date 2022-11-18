import React, { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { dia, shapes } from "@clientio/rappid";
import $ from "jquery";
import jsPDF from "jspdf";
import { FcRedo, FcUndo } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  AiFillDelete,
  AiOutlineZoomOut,
  AiOutlineZoomIn,
} from "react-icons/ai";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Modal from "react-modal";
import { getItem, setItem, removeItem } from "../utilities/common/index";
import { toolsView } from "../utilities/common/Tools/index";
import "../assets/scss/DrawToolPage/DrawToolPage.scss";

const DrawToolPage = () => {
  const customStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "auto",
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      height: "500px",
      p: 4,
    },
  };

  const params = useParams();
  // modal
  const [modalIsOpen, setIsOpen] = useState(false);

  let graph;
  let paper;
  let stencilGraph;
  let stencilPaper;
  let commandManager;
  let graphScale = 1;

  // functions
  const closeModal = () => setIsOpen(false);

  // Function for update the json data in backend
  const sendGraphJson = async () => {
    const jsonString = JSON.stringify(graph.toJSON());
    if (navigator.onLine) {
      await axios.post(`/paper/${params.id}`, {
        data: jsonString,
      });
    } else {
      setItem("tempGraphData", jsonString);
    }
  };

  // function for export graph
  const exportGraph = () => {
    setIsOpen(true);
    html2canvas(document.querySelector("#paper")).then((canvas) => {
      canvas.id = "newcanvas";
      canvas.style.width = "350px";
      canvas.style.height = "350px";
      const element = document.getElementById("newcanvas");
      if (element) {
        element.remove();
      }
      const menu = document.querySelector("#menu");
      menu.appendChild(canvas);
    });
  };
  // function for download image in diffrent format
  const downloadImage = async (type) => {
    const canvas = document.getElementById("newcanvas");
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    if (type === "jpeg") {
      canvas.style.backgroundColor = "#FFFFFF";
      const link = document.createElement("a");
      link.download = "my-image.jpeg";
      link.href = imgData;
      link.click();
    } else if (type === "png") {
      canvas.style.backgroundColor = "#FFFFFF";
      const link = document.createElement("a");
      link.download = "my-image.png";
      link.href = imgData;
      link.click();
    } else if (type === "pdf") {
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    } else if (type === "svg") {
      const svgDoc = paper.svg;
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgDoc);
      if (
        !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
      ) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns="http://www.w3.org/2000/svg"'
        );
      }
      if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
        );
      }
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
      const url =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      const link = document.createElement("a");
      link.download = "my-image.svg";

      link.href = url;
      link.click();
    }
  };

  const zoomOut = function () {
    graphScale -= 0.1;
    paper.scale(graphScale, graphScale);
  };

  const zoomIn = function () {
    graphScale += 0.1;
    paper.scale(graphScale, graphScale);
  };

  const resetZoom = function () {
    graphScale = 1;
    paper.scale(graphScale, graphScale);
  };
  // function for whole drawtool setup
  async function paperSetup() {
    // Creating graph and paper
    graph = new dia.Graph({}, { cellNamespace: shapes });
    let paperData = await axios.get(`/paper/${params.id}`);
    paperData = paperData.data;
    graph.fromJSON(JSON.parse(paperData.jsondata));
    paper = new dia.Paper({
      el: $("#paper"),
      width: "100%",
      height: "710px",
      model: graph,
      cellViewNamespace: shapes,
      background: {
        image: paperData.image,
        position: { x: 0, y: 0 },
        size: { width: 1200, height: 1000 },
      },
      defaultLink: () =>
        new dia.Link({
          attrs: { ".marker-target": { d: "M 10 0 L 0 5 L 10 10 z" } },
        }),
    });

    commandManager = new dia.CommandManager({ graph });
    // Creating stencilGraph and stencilPaper
    stencilGraph = new dia.Graph({}, { cellNamespace: shapes });
    stencilPaper = new dia.Paper({
      el: $("#stencil"),
      model: stencilGraph,
      interactive: false,
      height: "790px",
      width: "300px",
      background: {
        color: " rgb(240, 118, 18)",
      },
    });

    // Fetching shapes from database
    const allShapes = await axios.get("/shapes");
    let x;
    let y = 10;
    allShapes.data.forEach((item, index) => {
      if (index % 2 === 0) {
        x = 10;
      } else {
        x = 150;
      }
      const shape = JSON.parse(item.shapedata);
      shape.position = { x, y };
      shape.level = item.level;
      stencilGraph.addCell(shape);
      if (index % 2 !== 0) {
        y += 100;
      }
    });

    // getting papaer data from database

    // drag and drop functionality
    stencilPaper.on("cell:pointerdown", (cellView, e, X, Y) => {
      const data = cellView.model.getBBox();
      $("body").append(
        '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
      );
      const flyGraph = new dia.Graph({}, { cellNamespace: shapes });
      const flyPaper = new dia.Paper({
        el: $("#flyPaper"),
        model: flyGraph,
        width: data.width,
        height: data.height,
        interactive: false,
      });
      const flyShape = cellView.model.clone();
      const pos = cellView.model.position();
      const offset = {
        x: X - pos.x,
        y: Y - pos.y,
      };

      flyShape.position(0, 0);
      flyGraph.addCell(flyShape);
      $("#flyPaper").offset({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y,
      });

      $("body").on("mousemove.fly", (evt) => {
        $("#flyPaper").offset({
          left: evt.pageX - offset.x,
          top: evt.pageY - offset.y,
        });
      });
      $("body").on("mouseup.fly", (event) => {
        const { pageX, pageY } = event;
        const target = paper.$el.offset();
        // Dropped over paper ?
        if (
          pageX > target.left &&
          pageX < target.left + paper.$el.width() &&
          pageY > target.top &&
          pageY < target.top + paper.$el.height()
        ) {
          const s = flyShape.clone();
          s.position(
            pageX - target.left - offset.x,
            pageY - target.top - offset.y
          );

          graph.addCell(s);
        }
        $("body").off("mousemove.fly").off("mouseup.fly");
        flyShape.remove();
        $("#flyPaper").remove();
      });
    });

    // The ononline event occurs when the browser starts to work online.
    window.ononline = async () => {
      const jsonString = getItem("tempGraphData");
      if (jsonString) {
        try {
          await axios.post(`/paper/${params.id}`, {
            data: jsonString,
          });
          removeItem("tempGraphData");
        } catch (error) {
          console.log(error);
        }
      }
    };
    paper.on("cell:pointerup", async function () {
      await sendGraphJson();
    });
    paper.on("cell:pointerdown", function (cellView) {
      if (!cellView.model.isLink()) {
        cellView.addTools(toolsView);
      }
    });
    paper.on("blank:mousewheel", function (evt, x, y, delta) {
      evt.preventDefault();
      zoomOnMousewheel(x, y, delta);
    });

    paper.on("cell:mousewheel", function (_, evt, x, y, delta) {
      evt.preventDefault();
      zoomOnMousewheel(x, y, delta);
    });
  }
  function zoomOnMousewheel(x, y, delta) {
    var MIN_ZOOM = 0.2;
    var MAX_ZOOM = 4;
    var currentZoom = paper.scale().sx;
    var newZoom = currentZoom + delta * 0.2;
    if (newZoom > MIN_ZOOM && newZoom < MAX_ZOOM) {
      paper.translate(0, 0);
      paper.scale(newZoom, newZoom, x, y);
    }
  }

  useEffect(() => {
    paperSetup();
    return () => {
      (async () => {
        await sendGraphJson();
      })();
    };
  }, []);

  return (
    <div>
      <div className="draw-mainDiv">
        <div className="inner-div">
          <div className="draw-col1">
            <div id="stencil" />
          </div>
          <div id="total" className="draw-col2">
            <div className="toolbar">
              <div className="inner-toolbar">
                <button
                  type="button"
                  className="tools-btn"
                  onClick={exportGraph}
                >
                  export
                </button>
                <div className="undo-redo">
                  <button
                    className="tools-btn"
                    onClick={() => commandManager.undo()}
                  >
                    <FcUndo />
                  </button>
                  <button
                    className="tools-btn"
                    variant="btn-outline-info"
                    onClick={() => commandManager.redo()}
                  >
                    <FcRedo />
                  </button>
                </div>
                <div className="zoom">
                  <button className="tools-btn" onClick={zoomOut}>
                    <AiOutlineZoomOut />
                  </button>
                  <button
                    className="tools-btn"
                    variant="btn-outline-info"
                    onClick={zoomIn}
                  >
                    <AiOutlineZoomIn />
                  </button>
                  <button
                    className="tools-btn"
                    variant="btn-outline-info"
                    onClick={resetZoom}
                  >
                    <MdOutlineZoomOutMap />
                  </button>
                </div>
                <button
                  type="button"
                  className="tools-btn"
                  onClick={() => graph.clear()}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
            <div id="paper" />
          </div>
          <div className="draw-col3" />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div style={{ border: "1px solid black" }} id="menu" />
          <div className="formats-btn">
            <Button
              className="btn-danger d-btn mt-5"
              onClick={() => {
                downloadImage("jpeg");
              }}
            >
              JPEG
            </Button>
            <Button
              className="btn-danger d-btn mt-5"
              onClick={() => {
                downloadImage("png");
              }}
            >
              PNG
            </Button>
            <Button
              className="btn-danger d-btn mt-5"
              onClick={() => {
                downloadImage("svg");
              }}
            >
              SVG
            </Button>
            <Button
              className="btn-danger d-btn mt-5"
              onClick={() => {
                downloadImage("pdf");
              }}
            >
              PDF
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DrawToolPage;
