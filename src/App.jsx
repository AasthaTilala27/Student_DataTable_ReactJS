import { useEffect, useState } from "react";

function App() {
  const [allData, setAllData] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  let [dataPerPage, setDataPerPage] = useState(5);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((response) => {
        response.json().then((data) => {
          setAllData(data);
        });
      });
  }, []);

  let totalPages = Math.ceil(allData.length / dataPerPage);

  let lastIndex = currentPage * dataPerPage;
  let firstIndex = lastIndex - dataPerPage;

  let currentData = allData.slice(firstIndex, lastIndex);

  return (
    <>

      <h1 className="text-center bg-dark text-white p-3 rounded mb-4">
        STUDENTS MARKSHEET DATA
      </h1>

      <div className="container mt-5">

        <table className="table table-bordered table-striped table-hover">

          <thead className="table-dark">
            <tr>
              <th>ROLL NO.</th>
              <th>NAME</th>
              <th>DSA</th>
              <th>MATHS</th>
              <th>DBMS</th>
              <th>NETWORKING</th>
            </tr>
          </thead>

          <tbody>
            {
              currentData.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.dsa}</td>
                    <td>{e.maths}</td>
                    <td>{e.dbms}</td>
                    <td>{e.networking}</td>
                  </tr>
                );
              })
            }
          </tbody>

        </table>

        <div className="d-flex justify-content-between align-items-center mt-3">

          <div className="d-flex align-items-center">

            <span className="me-2">
              Rows per page:
            </span>

            <select
              className="form-select"
              style={{ width: "75px" }}
              value={dataPerPage}
              onChange={(e) => {
                setDataPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>

          </div>


          <div className="d-flex align-items-center">

            <span className="me-3">
              {allData.length === 0
                ? "0 of 0"
                : `${firstIndex + 1}-${Math.min(lastIndex, allData.length)} of ${allData.length}`
              }
            </span>


            <button
              className="btn btn-outline-secondary me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>


            <button
              className="btn btn-outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default App;