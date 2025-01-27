"use client";

import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import {
  Canvas,
  FabricImage,
  Line,
  PatternBrush,
  PencilBrush,
  SprayBrush,
} from "fabric";
import React, { FC, useEffect, useRef, useState } from "react";

import { useMapStore } from "../../store";

type MapCanvasProps = {};

const MapCanvas: FC<MapCanvasProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasObjectRef = useRef<Canvas | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasObjectRef.current && canvasRef.current) {
        const mapCanvas = document.getElementById("map-canvas");
        if (mapCanvas) {
          canvasObjectRef.current.setWidth(mapCanvas.clientWidth);
          canvasObjectRef.current.setHeight(mapCanvas.clientHeight);
          canvasObjectRef.current.renderAll();
        }
      }
    };

    updateCanvasSize();

    // Add resize listener to adjust canvas size when the window or parent size changes
    window.addEventListener("resize", updateCanvasSize);

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // Set initial size

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log(canvasRef.current.clientWidth);

    const mapCanvas = document.getElementById("map-canvas");
    // Initialize Fabric.js canvas
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "#fff",
      width: mapCanvas?.clientWidth!,
      height: mapCanvas?.clientHeight!,
    });

    // Function to draw the grid
    const drawGrid = (canvas: Canvas) => {
      const gridSize = 50;
      const gridColor = "#ccc";

      // Draw horizontal lines
      for (let i = 0; i < canvas.height!; i += gridSize) {
        const line = new Line([0, i, canvas.width!, i], {
          stroke: gridColor,
          selectable: false,
          evented: false,
        });
        canvas.add(line);
      }

      // Draw vertical lines
      for (let i = 0; i < canvas.width!; i += gridSize) {
        const line = new Line([i, 0, i, canvas.height!], {
          stroke: gridColor,
          selectable: false,
          evented: false,
        });

        canvas.add(line);
      }
    };

    // Initialize the brush tool
    const brush = new PencilBrush(canvas);
    brush.width = 10; // Set brush size
    brush.color = "green"; // Set brush color (for terrain)

    canvas.freeDrawingBrush = brush;

    // Draw the grid
    drawGrid(canvas);

    canvasObjectRef.current = canvas;
    useMapStore.setState({ canvas });

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const assetUrl = event.dataTransfer.getData("assetUrl");

    const canvasContainer = event.target.getBoundingClientRect();

    // Calculate mouse position relative to canvas
    const mouseX = event.clientX - canvasContainer.left;
    const mouseY = event.clientY - canvasContainer.top;

    FabricImage.fromURL(assetUrl).then((img) => {
      img.set({
        left: mouseX,
        top: mouseY,
        scaleX: 0.2,
        scaleY: 0.2,
        selectable: true,
      });
      img.setControlsVisibility({ mtr: true });
      const canvas = canvasObjectRef.current;
      if (canvas) {
        canvas.add(img);
        canvas.renderAll();
      }
    });
  };

  useEffect(() => {
    const unsubscribe = useMapStore.subscribe((state, oldState) => {
      const canvas = canvasObjectRef.current;
      if (state.activeTool && canvas) {
        switch (state.activeTool) {
          case "draw":
            if (state.drawOptions.texture) {
              const image = new Image(10, 10);
              image.src = state.drawOptions.texture.src;

              const textureBrush = new PatternBrush(canvas);
              textureBrush.source = image;

              canvas.freeDrawingBrush = textureBrush;
            } else if (state.drawOptions.brushType === "spray") {
              canvas.freeDrawingBrush = new SprayBrush(canvas);
            } else {
              canvas.freeDrawingBrush = new PencilBrush(canvas);
            }
            canvas.freeDrawingBrush!.width = state.drawOptions.size * 3;
            canvas.freeDrawingBrush!.color = state.drawOptions.color;

            canvas.isDrawingMode = true;
            break;
          case "pan":
          case "move":
            canvas.getObjects().forEach((obj) => {
              if (obj.type !== "image") obj.set({ selectable: false });
            });
            canvas.isDrawingMode = false;
            break;
          default:
            break;
        }
      }
    });
    () => unsubscribe();
  }, []);

  const handleZoom = (zoomIn: boolean) => {
    const canvas = canvasObjectRef.current;
    if (canvas) {
      const newZoom = zoomIn ? zoomLevel + 0.1 : zoomLevel - 0.1;

      // Clamp zoom level between 0.5 and 2
      const clampedZoom = Math.max(0.1, Math.min(newZoom, 4));
      setZoomLevel(clampedZoom);
      canvas.setZoom(clampedZoom);
      canvas.requestRenderAll();
    }
  };

  return (
    <Box onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <canvas ref={canvasRef} />
      <Box
        sx={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <IconButton onClick={() => handleZoom(false)}>
          <Remove />
        </IconButton>
        <Typography variant="body2">{Math.round(zoomLevel * 100)}%</Typography>
        <IconButton onClick={() => handleZoom(true)}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MapCanvas;
