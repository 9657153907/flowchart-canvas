import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", type: "input", position: { x: 250, y: 0 }, data: { label: "Start Node" } },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "Middle Node" } },
  { id: "3", type: "output", position: { x: 250, y: 200 }, data: { label: "End Node" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function CanvasBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addShape = (shape) => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `${shape} Node` },
      style: getShapeStyle(shape),
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const getShapeStyle = (shape) => {
    if (shape === "rectangle")
      return { border: "2px solid #333", borderRadius: "4px", width: 100, height: 50, display: "flex", alignItems: "center", justifyContent: "center" };
    if (shape === "circle")
      return { border: "2px solid #333", borderRadius: "50%", width: 70, height: 70, display: "flex", alignItems: "center", justifyContent: "center" };
    if (shape === "diamond")
      return { border: "2px solid #333", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(45deg)" };
    return {};
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* Left = Flow board */}
      <div style={{ flex: 1, borderRight: "1px solid #ddd" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={16} color="#aaa" />
        </ReactFlow>
      </div>

      {/* Right = Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#f8f9fa",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "inset 0 0 5px #ccc",
        }}
      >
        <h3 style={{ marginBottom: "10px", textAlign: "center" }}>Canvas Tools</h3>
        <button onClick={() => addShape("rectangle")} style={btnStyle}>▭ Rectangle</button>
        <button onClick={() => addShape("circle")} style={btnStyle}>⚪ Circle</button>
        <button onClick={() => addShape("diamond")} style={btnStyle}>◇ Diamond</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};
