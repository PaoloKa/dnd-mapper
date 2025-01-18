"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Canvas,
  Line,
  PencilBrush,
  Circle,
  FabricImage,
  PatternBrush,
} from "fabric";

const MapCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPainting, setIsPainting] = useState(false);
  const canvasObjectRef = useRef<Canvas | null>(null);
  const [brushTexture, setBrushTexture] = useState<FabricImage | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: "#fff",
      width: 800,
      height: 600,
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
    const imageUrl = "path/to/your/image.png";
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
      canvas.isDrawingMode = true;
    }
  }, [isPainting, brushTexture]);

  const loadTexture = (src: string) => {
    FabricImage.fromURL(src).then((image) => {
      if (!image) return;
      // Scale the texture to fit the brush size
      image.scaleToWidth(50); // Adjust the width of the texture as needed
      image.scaleToHeight(50); // Adjust the height of the texture as needed
      setBrushTexture(image); // Store the texture image
    });
  };

  const togglePainting = () => {
    setIsPainting((prev) => !prev);
  };

  useEffect(() => {
    loadTexture(
      "https://i.pinimg.com/originals/76/27/4c/76274c56165d134fea4db2df9ada8dea.jpg"
    );
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={togglePainting}>
        {isPainting ? "Stop Painting" : "Start Painting"}
      </button>
    </div>
  );
};

export default MapCanvas;
