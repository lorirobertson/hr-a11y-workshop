import Link from "next/link";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { format, startOfWeek, endOfWeek } from "date-fns";

const WeeklyTotal = () => {
  const [totalHours, setTotalHours] = useState(0);

  const today = new Date();

  useEffect(() => {
    const fetchURL = `/api/v1/timesheets/week/${format(
      startOfWeek(today),
      "yyyy-MM-dd"
    )}`;
    fetch(fetchURL)
      .then((resp) => resp.json())
      .then(({ calculated }) => {
        setTotalHours(calculated.totalHours);
      });
  }, []);

  const weekStart = format(startOfWeek(today), "MM/dd/yyyy").toString();
  const weekEnd = format(endOfWeek(today), "MM/dd/yyyy").toString();

  return (
    <>
      <Row>
        <Col>
          <div className="text-center">
            <p className="h1 mb-0">{totalHours}</p>
            <p className="mb-0">Hours logged this week</p>
            <p className="mb-0">
              {weekStart} through {weekEnd}
            </p>
          </div>
        </Col>
        <Col>
          <Row className="mb-2">
            <Link
              href=""
              href={`/timesheets/week/${format(startOfWeek(today), "yyyy-MM-dd")}/new`}
            >
              <Button block size="lg" color="success">
                Log Time
              </Button>
            </Link>
          </Row>
          <Row>
            <Link href={`/timesheets`}>
              <Button block size="lg" color="secondary">
                View All Timesheets
              </Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default WeeklyTotal;
