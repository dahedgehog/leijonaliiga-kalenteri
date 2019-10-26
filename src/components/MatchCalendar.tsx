import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Button, Container } from "react-bootstrap";
import TeamSelect from "./TeamSelect";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import bootstap from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { EventInput, EventApi } from "@fullcalendar/core";
import "@fullcalendar/core/main.css";
import "@fullcalendar/bootstrap/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
const fiLocale = require("@fullcalendar/core/locales/fi");

interface MatchCalendarProps {
  teams: string[];
}

const MatchCalendar: React.FC<MatchCalendarProps> = ({ teams }) => {
  const [matches, setMatches] = useState<EventInput[]>([]);
  const [event, setEvent] = useState<EventApi | null>(null);
  const [team, setTeam] = useState<string>("");

  useEffect(() => {
    const fetchMatches = (teams: string[]) => {
      Promise.all(teams.map(team => fetch("/events/" + team).then(res => res.json()))).then(
        (allMatches: EventInput[][]) => {
          const flattened = allMatches.flatMap(matches => {
            return matches.reduce(
              (prev, match) => {
                const found = prev.find(m => m.start === match.start);
                if (!!found) {
                  found.title = found.title + ", " + match.title;
                } else {
                  prev.push(match);
                }
                return prev;
              },
              [] as EventInput[]
            );
          });
          setMatches(flattened);
        }
      );
    };
    if (team === "") {
      fetchMatches(teams);
    } else {
      fetchMatches([team]);
    }
  }, [teams, team]);

  return (
    <>
      <Card className="border-0">
        <Card.Header as="h5" className="ylapalkki text-white">
          Joukkueen otteluohjelma
        </Card.Header>
        <Card.Body>
          <TeamSelect teamSelected={setTeam} teams={teams} allowAll />
          <Row>
            <Col sm={12}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstap]}
                eventClick={({ event }) => setEvent(event)}
                header={{
                  left: "dayGridMonth,timeGridWeek,listWeek",
                  center: "title",
                  right: "today prev,next"
                }}
                defaultView="dayGridMonth"
                themeSystem="bootstrap"
                locale={fiLocale}
                events={matches}
                minTime="06:00"
                maxTime="22:00"
                eventTimeFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  omitZeroMinute: false
                }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Modal show={!!event} onHide={() => setEvent(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Blues Juniors {event && event.extendedProps["team"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {event && (
            <Container>
              {event.title.split(", ").map((match, index) => (
                <Row>
                  <Col xs={12}>
                    <strong>Ottelu {index + 1}:</strong>
                    {" " + match}
                  </Col>
                </Row>
              ))}
              <br />
              <Row>
                <Col xs={12}>
                  <strong>Aika:</strong>
                  {" " + moment(event.start!!).format("dddd[na] Do MMMM[ta] [klo] HH:mm")}
                </Col>
                <Col xs={12}>
                  <strong>Paikka:</strong>
                  {" " + event.extendedProps["place"]}
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MatchCalendar;
