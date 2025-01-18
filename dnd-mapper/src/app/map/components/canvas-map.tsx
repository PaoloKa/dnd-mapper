"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import {
  Canvas,
  Line,
  PencilBrush,
  FabricImage,
  PatternBrush,
  CircleBrush,
} from "fabric";
import { useMapStore } from "../../store";

type MapCanvasProps = {};

const MapCanvas: FC<MapCanvasProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasObjectRef = useRef<Canvas | null>(null);
  const [brushTexture, setBrushTexture] = useState<FabricImage | null>(null);

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

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvasObjectRef.current) return;
    console.log("Active tool changed");
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
              // textureBrush. = state.drawOptions.size / image.width;
              // textureBrush.scaleY = state.drawOptions.size / image.height;

              canvas.freeDrawingBrush = textureBrush;
            } else {
              canvas.freeDrawingBrush = new PencilBrush(canvas);
            }

            canvas.freeDrawingBrush!.width = state.drawOptions.size * 3;
            canvas.freeDrawingBrush!.color = state.drawOptions.color;

            canvas.isDrawingMode = true;
            break;
          case "pan":
            canvas.isDrawingMode = false;
            break;
          default:
            break;
        }
      }
    });
    () => unsubscribe();
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src =
      "https://forgottenadventures.piwigo.com/_datas/w/s/l/wslrhsw6z4/i/uploads/w/s/l/wslrhsw6z4//2021/06/23/20210623133616-773daf05-me.png";
    // Set the brush texture to be the one loaded
    const canvas = canvasObjectRef.current;
    if (canvas) {
      const textureBrush = new PatternBrush(canvas);
      textureBrush.source = image;
      canvas.freeDrawingBrush = textureBrush;
      canvas.freeDrawingBrush.width = 30;
    }
  }, [brushTexture]);

  const loadTexture = (src: string) => {
    FabricImage.fromURL(src).then((image) => {
      if (!image) return;
      // Scale the texture to fit the brush size
      image.scaleToWidth(50); // Adjust the width of the texture as needed
      image.scaleToHeight(50); // Adjust the height of the texture as needed
      setBrushTexture(image); // Store the texture image
    });
  };

  useEffect(() => {
    loadTexture(
      "https://i.pinimg.com/originals/76/27/4c/76274c56165d134fea4db2df9ada8dea.jpg"
    );
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MapCanvas;
