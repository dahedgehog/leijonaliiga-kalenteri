import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import MatchCalendar from "./components/MatchCalendar";
import MatchRecordForm from "./components/MatchRecordForm";

interface TeamsResponse {
  teams: string[];
}
const App: React.FC = () => {
  const [teams, setTeams] = useState<string[]>([]);
  useEffect(() => {
    fetch("/allteams")
      .then(res => res.json())
      .then(json => json as TeamsResponse)
      .then(teams => setTeams(teams.teams));
  }, []);

  return (
    <>
      <Container>
        <Navbar variant="dark" expand="lg" className="rounded-bottom ylapalkki">
          <Navbar.Brand href="#">
            <img src="/static/logo90.png" height="30" className="d-inline-block align-top" alt="Blues Juniors" />
            {" Blues Juniors"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Otteluohjelma</Nav.Link>
              <Nav.Link href="#link">Pöytäkirja</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <Container className="sisalto">
        <MatchCalendar teams={teams} />
      </Container>
      <Container className="sisalto">
        <MatchRecordForm teams={teams} />
      </Container>
    </>
  );
};

export default App;
