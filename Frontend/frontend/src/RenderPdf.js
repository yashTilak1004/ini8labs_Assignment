import React from "react";

const RenderPdf = ({ absolutePath }) => {
  if (!absolutePath) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <iframe src={absolutePath} width="100%" height="500px" />
    </div>
  );
};

export default RenderPdf;
