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
  const [tab, setTab] = useState<number>(1);
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
            {" Blues Juniors F1"}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link active={tab === 1} href="#home" onClick={() => setTab(1)}>
                Otteluohjelma
              </Nav.Link>
              <Nav.Link active={tab === 2} href="#game" onClick={() => setTab(2)}>
                Pöytäkirja
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <Container className="sisalto">
        {tab === 1 && <MatchCalendar teams={teams} />}
        {tab === 2 && <MatchRecordForm teams={teams} />}
      </Container>
    </>
  );
};

export default App;
