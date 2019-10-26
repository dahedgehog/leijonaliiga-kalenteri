import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import TeamSelect from "./TeamSelect";

interface MatchRecordFormProps {
  teams: string[];
}
interface Match {
  id: number;
  date: string;
  place: string;
  time: string;
  home: string;
  away: string;
}

const MatchRecordForm: React.FC<MatchRecordFormProps> = ({ teams }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const fetchMatches = (team: string) => {
    fetch("/teams/" + team)
      .then(res => res.json())
      .then(matches => setMatches(matches));
  };
  return (
    <Card className="border-0">
      <Card.Header as="h5" className="ylapalkki text-white">
        Ottelupäivän tiedot
      </Card.Header>
      <Card.Body>
        <TeamSelect teamSelected={fetchMatches} teams={teams} />
      </Card.Body>
    </Card>
  );
};

export default MatchRecordForm;
