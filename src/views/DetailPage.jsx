import { useQuery } from "@tanstack/react-query";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";

async function getProjects() {
  // const res = await fetch('https://api.gcfund.org/v1/projects')
  const res = await fetch(
    "https://raw.githubusercontent.com/dakaii/musical-octo-journey/30e6d7de386fb3065442cfdc3033b75f4d7294a0/src/mock_json_response.json"
  );
  return await res.json();
}

function DetailPage() {
  const { detailId } = useParams();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["project-details"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const project = data.find((item) => item.ProjectsID == detailId);

  return (
    <div style={{ margin: "230px 440px" }}>
      <Card style={{ width: "18rem", margin: "20px 40px" }}>
        <Card.Body>
          <Card.Title> Project Name: {project.ProjectName}</Card.Title>
          <Card.Text>Approval Date: {project.ApprovalDate}</Card.Text>
          <Card.Text>Total GCF Funding: {project.TotalGCFFunding}</Card.Text>
          <Card.Text>Total Co Financing: {project.TotalCoFinancing}</Card.Text>
          <Card.Text>Duration Months: {project.DurationMonths}</Card.Text>
          <Card.Text>
            Countries:
            {project.Countries.map((country, index) => {
              return <li key={index}>{country.CountryName}</li>;
            })}
          </Card.Text>
          <Card.Text>
            Result Areas:
            {project.ResultAreas.map((area, index) => {
              return <li key={index}>{area.Area}</li>;
            })}
          </Card.Text>
          <a href={project.ProjectURL}>More Details</a>
        </Card.Body>
      </Card>
      <Link to={"/"}>Go Back</Link>
    </div>
  );
}

export default DetailPage;
