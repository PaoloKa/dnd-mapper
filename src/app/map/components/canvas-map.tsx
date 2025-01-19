"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import {
  Canvas,
  Line,
  PencilBrush,
  FabricImage,
  PatternBrush,
  CircleBrush,
  SprayBrush,
  Rect,
  Triangle,
} from "fabric";
import { useMapStore } from "../../store";

type MapCanvasProps = {};

const MapCanvas: FC<MapCanvasProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasObjectRef = useRef<Canvas | null>(null);

  useEffect(() => {
    const updateCanvasSize = () => {
      console.log("Updating canvas size");
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
      console.log("Setting active tool", state.activeTool);
      const canvas = canvasObjectRef.current;
      if (state.activeTool && canvas) {
        console.log("Setting active tool", state.activeTool);
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
              if(obj.type !== "image")
              obj.set({ selectable: false });
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

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MapCanvas;
