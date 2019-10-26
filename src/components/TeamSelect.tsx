import React from "react";
import { Row, Col, Form } from "react-bootstrap";

interface TeamSelectProps {
  teams: string[];
  allowAll?: boolean;
  teamSelected: (team: string) => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({ teams, allowAll, teamSelected }) => {
  return (
    <Row>
      <Col sm={12}>
        <Form.Group>
          <Form.Label>Joukkue:</Form.Label>
          <Form.Control
            as="select"
            className="custom-select"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => teamSelected(event.target.value)}
          >
            {allowAll && <option value="">&lt;Kaikki joukkueet&gt;</option>}
            {teams.map(team => (
              <option key={team} value={team}>
                Blues JR {team}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default TeamSelect;
