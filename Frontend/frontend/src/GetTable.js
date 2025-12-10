import React, { useEffect, useState } from "react";
import Delete from "./Delete";
import axios from "axios";
import RenderPdf from "./RenderPdf";

const GetTable = () => {
  const [data, setData] = useState([]);
  const [ipPath, setIpPath] = useState("");
  const [viewpath, setViewPath] = useState(""); //for viewing the pdf

  const GetData = async () => {
    try {
      const res = await axios.get("http://localhost:8001/");
      // assuming server returns JSON array/object as before
      setData(res.data);
    } catch (err) {
      console.error("Fetch data error:", err);
    }
  };

  const GetPdfUrl = async () => {
    const FilePath = new FormData();
    FilePath.append("Absolute file path", ipPath);
    console.log("IP", ipPath);
    try {
      const res = await axios.post("http://localhost:8001/host-pdf", FilePath, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Res:", res.data.url);
      setViewPath(res.data.url);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    if (!ipPath){setViewPath(''); return;}
    GetPdfUrl();
  }, [ipPath]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="w-75">
        <h3 className="text-center mb-3">PDF-Files List</h3>

        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Folder</th>
                <th>Insertion date</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((el) => (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.pdf_name}</td>
                    <td>{el.folder_path}</td>
                    <td>{el.insertion_date}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setIpPath(el.absolute_path)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <Delete param={el.absolute_path} GetData={GetData()} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-muted">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {viewpath!=='' && <RenderPdf absolutePath={viewpath} />}
      </div>

    </div>
  );
};

export default GetTable;
