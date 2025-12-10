import React, { useState } from "react";
import axios from "axios";

const Insertion = () => {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    if (!file || file.type !== "application/pdf") 
    {
      const modal = new window.bootstrap.Modal(
        document.getElementById("errorModal")
      );
      modal.show();
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("file_path", "PDFFolder");
    formData.append("pdf_name", file.name);

    try {
      await axios.post("http://localhost:8001/insert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const modal = new window.bootstrap.Modal(
      document.getElementById("successModal")
    );
      modal.show();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#f8f9fa' }}>
      <section className="upload p-4 border rounded" style={{ backgroundColor: '#174c09ff', color: '#fff' }}>
        <label className="upload-label">
          <span style={{marginRight:"30px"}}>Upload PDF:</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control-file"
            style={{marginRight:"30px"}}
          />
        </label>
        <button className="btn btn-light " style={{marginRight:"30px"}}  onClick={handleUpload} disabled={!file}>
          Upload
        </button>
      </section>

      {/* Success */}
      <div className="modal fade" id="errorModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Invalid File</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              Please upload a valid PDF file.
            </div>
          </div>
        </div>
      </div>

      {/* Failure for non pdf files. */}
      <div className="modal fade" id="successModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Success</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              File uploaded successfully.
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Insertion;
