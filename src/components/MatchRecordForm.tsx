import React, { useState, useEffect, createRef } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import TeamSelect from "./TeamSelect";
import MatchSelect from "./MatchSelect";

interface MatchRecordFormProps {
  teams: string[];
}
export interface Match {
  id: number;
  date: string;
  place: string;
  time: string;
  home: string;
  away: string;
}

const MatchRecordForm: React.FC<MatchRecordFormProps> = ({ teams }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [team, setTeam] = useState<string>("");
  const [match1, setMatch1] = useState<Match | undefined>();
  const [match2, setMatch2] = useState<Match | undefined>();
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam1, setAwayTeam1] = useState<string>("");
  const [awayTeam2, setAwayTeam2] = useState<string>("");
  const formRef = createRef<HTMLFormElement>();

  useEffect(() => {
    setMatches([]);
    fetch("/teams/" + team)
      .then(res => res.json())
      .then(matches => setMatches(matches));
  }, [team]);
  useEffect(() => {
    setTeam(teams[0]);
  }, [teams]);

  return (
    <>
      <Card className="border-0">
        <Card.Header as="h5" className="ylapalkki text-white">
          Ottelupäivän tiedot
        </Card.Header>
        <Card.Body>
          <TeamSelect teamSelected={setTeam} teams={teams} />
          <Row>
            <MatchSelect matchSelected={setMatch1} matches={matches} title="Ottelu 1" />
            <MatchSelect matchSelected={setMatch2} matches={matches} title="Ottelu 2" />
          </Row>
        </Card.Body>
      </Card>
      <Card className="border-0">
        <Card.Header as="h5" className="ylapalkki text-white">
          Joukkueiden kokoonpanot
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={12} md={4}>
              <Form.Group>
                <Form.Label>Kotijoukkue:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="home"
                  rows={15}
                  value={homeTeam}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHomeTeam(event.target.value)}
                  placeholder="88 Matti Meikäläinen&#x0a;99 Wayne Gretzky"
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={4}>
              <Form.Group>
                <Form.Label>Vierasjoukkue 1:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="away1"
                  rows={15}
                  value={awayTeam1}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAwayTeam1(event.target.value)}
                  placeholder="39 Dominic Hasek&#x0a;88 Eric Lindros&#x0a;66 Mario Lemieux"
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={4}>
              <Form.Group>
                <Form.Label>Vierasjoukkue 2:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="away2"
                  rows={15}
                  value={awayTeam2}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAwayTeam2(event.target.value)}
                  placeholder="33 Patrick Roy (MV)&#x0a;77 Paul Coffey&#x0a;68 Jaromir Jagr"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-right">
              <Button variant="primary" onClick={() => formRef.current && formRef.current.submit()}>
                <FontAwesomeIcon icon={faFileDownload} /> Lataa pöytäkirjapohja
              </Button>
            </Col>
          </Row>
          <form ref={formRef} action="/load_template" method="POST">
            <input type="hidden" name="team" value={team} />
            <input type="hidden" name="match1" value={match1 && match1.id} />
            <input type="hidden" name="match2" value={match2 && match2.id} />
            <input type="hidden" name="home" value={homeTeam} />
            <input type="hidden" name="away1" value={awayTeam1} />
            <input type="hidden" name="away2" value={awayTeam2} />
          </form>
        </Card.Body>
      </Card>
    </>
  );
};
export default MatchRecordForm;
