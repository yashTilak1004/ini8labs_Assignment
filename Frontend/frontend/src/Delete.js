import React from "react";
import axios from "axios";

const Delete = (param,GetData) => {
  const DeleteRow = async (absolute_path) => {
    const FilePath = new FormData();
    console.log("Absolute path:", absolute_path.param);
    FilePath.append("Absolute file path", absolute_path.param);

    try {
      await axios.post("http://localhost:8001/deletee", FilePath, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const modal = new window.bootstrap.Modal(
        document.getElementById("deleteModal")
      );
      modal.show();
      GetData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  return (
    <>
      <button className="btn btn-danger btn-sm" onClick={() => DeleteRow(param)}>
        Delete
      </button>
      {/* Modal for delete */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Deleted</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              File deleted successfully.
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default Delete;
