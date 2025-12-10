import Header from "./Header";
import Insertion from "./Insertion";
import GetTable from "./GetTable";
import { useState } from "react";

function App() {
  //Functional Navbar
  const [option, setOption] = useState("GetTable");
  const list = ["GetTable", "Insertion"];

  return (
    <div>
      <Header></Header>
      <br />
      
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#d99c52ff",
            borderBottom: "1px solid #1a1e25",
          }}
        >
        <div className="col-12 d-flex justify-content-center gap-3">
          <button
            className="btn btn-light"
            style={{
              fontSize: "17px",
              padding: "12px 24px",
              marginRight: "50px",
              fontWeight: "400"
            }}
            onClick={() => setOption("GetTable")}
          >
            View PDF List
          </button>

          <button
            className="btn btn-dark"
            style={{
              fontSize: "17px",
              padding: "12px 24px",
              paddingRight: "25px",
              fontWeight: "400"
            }}
            onClick={() => setOption("Insertion")}
          >
            Insert PDF
          </button>
        </div>
      </div>

      </div>
      

      <br />

      {option === "GetTable" && <GetTable />}
      {option === "Insertion" && <Insertion />}
    </div>
  );
}

export default App;
