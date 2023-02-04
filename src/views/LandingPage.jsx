import { useQuery } from "@tanstack/react-query";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

async function getProjects() {
  // const res = await fetch('https://api.gcfund.org/v1/projects')
  const res = await fetch(
    "https://raw.githubusercontent.com/dakaii/musical-octo-journey/30e6d7de386fb3065442cfdc3033b75f4d7294a0/src/mock_json_response.json"
  );
  return await res.json();
}

function LandingPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div style={{ margin: "30px 40px" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Detail Link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{project.ProjectsID}</td>
              <td>{project.ProjectName}</td>
              <td>
                <Link to={"details/" + project.ProjectsID}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LandingPage;
