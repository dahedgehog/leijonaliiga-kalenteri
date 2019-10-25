import React from "react";
import { Navbar, Container, Nav, Card, Row, Col, Form } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import bootstap from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./App.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/bootstrap/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
const fiLocale = require("@fullcalendar/core/locales/fi");

const App: React.FC = () => {
  const teams = ["Blue 1", "Blue 2", "Blue 3", "Blue 4", "White 1", "White 2", "White 3", "White 4"];
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
        <MatchRecord teams={teams} />
      </Container>
    </>
  );
};

const MatchCalendar: React.FC<{ teams: string[] }> = ({ teams }) => {
  return (
    <Card className="border-0">
      <Card.Header as="h5" className="ylapalkki text-white">
        Joukkueen otteluohjelma
      </Card.Header>
      <Card.Body>
        <TeamSelect teams={teams} allowAll/>
        <Row>
          <Col sm={12}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, bootstap]}
              header={{
                left: "dayGridMonth,timeGridWeek",
                center: "title",
                right: "today prev,next"
              }}
              defaultView="dayGridMonth"
              themeSystem="bootstrap"
              locale={fiLocale}
              minTime="06:00"
              maxTime="22:00"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const MatchRecord: React.FC<{ teams: string[] }> = ({ teams }) => {
  return (
    <Card className="border-0">
      <Card.Header as="h5" className="ylapalkki text-white">
        Ottelupäivän tiedot
      </Card.Header>
      <Card.Body>
        <TeamSelect teams={teams} />
      </Card.Body>
    </Card>
  );
};

const TeamSelect: React.FC<{ teams: string[]; allowAll?: boolean }> = ({ teams, allowAll }) => {
  return (
    <Row>
      <Col sm={12}>
        <Form.Group>
          <Form.Label>Joukkue:</Form.Label>
          <Form.Control as="select" className="custom-select">
            {allowAll && <option value="">&lt;Kaikki joukkueet&gt;</option>}
            {teams.map(team => (
              <option value={team}>Blues JR {team}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default App;
