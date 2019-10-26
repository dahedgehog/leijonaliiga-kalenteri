import React, { useState } from "react";
import { Match } from "./MatchRecordForm";
import { Col, Form, Card } from "react-bootstrap";

interface MatchSelectProps {
  title: string;
  matches: Match[];
  matchSelected: (match?: Match) => void;
}

const MatchSelect: React.FC<MatchSelectProps> = ({ title, matches, matchSelected }) => {
  const [match, setMatch] = useState<Match | undefined>();

  const selectMatch = (id: string) => {
    const selected = matches.find(match => match.id === parseInt(id));
    setMatch(selected);
    matchSelected(selected);
  };

  return (
    <Col sm={6}>
      <Form.Group>
        <Form.Label>{title}</Form.Label>
        <Form.Control
          as="select"
          className="custom-select"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => selectMatch(event.target.value)}
        >
          <option value="">&lt;Ei ottelua&gt;</option>
          {matches.map(match => (
            <option value={match.id} disabled={match.away.includes("Blues JR")}>
              {match.date + " - " + match.home + " vs. " + match.away}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <p>Ottelun tiedot</p>
      <Card>
        <Card.Body>
          <p>
            Ottelun Tunnus: <strong>{(match && match.id) || "-"}</strong>
          </p>
          <p>
            Päivä ja aika: <strong>{(match && match.time) || "-"}</strong>
          </p>
          <p>
            Kotijoukkue: <strong>{(match && match.home) || "-"}</strong>
          </p>
          <p>
            Vierasjoukkue: <strong>{(match && match.away) || "-"}</strong>
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MatchSelect;
