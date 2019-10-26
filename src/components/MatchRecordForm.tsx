import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
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
  useEffect(() => {
    fetchMatches(teams[0]);
  }, [teams]);

  const fetchMatches = (team: string) => {
    setMatches([]);
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
        <Row>
          <MatchSelect matchSelected={() => {}} matches={matches} title="Ottelu 1" />
          <MatchSelect matchSelected={() => {}} matches={matches} title="Ottelu 2" />
        </Row>
      </Card.Body>
    </Card>
  );
};
export default MatchRecordForm;
