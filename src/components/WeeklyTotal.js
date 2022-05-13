// import styles from "../styles/components/WeeklyTotal.module.scss";
import Link from "next/link";
import { useState, useEffect  } from "react";
import { Row, Col, Button } from "reactstrap";
import { startOfWeek, endOfWeek } from "date-fns";

const WeeklyTotal = () => {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
      const fetchURL = '';
    //   const fetchURL = `/api/v1/timesheets/week/${moment().startOf("week").format("YYYY-MM-DD")}`;
    fetch(fetchURL)
      .then((resp) => resp.json())
      .then(({ calculated }) => {
        setTotalHours(calculated.totalHours);
      });
  }, []);

  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  
  console.log('TESTING')
  console.log(weekStart, weekEnd);

  return (
    <>
      <Row>
        <Col>
          <div className="text-center">
            <p className="h1">{totalHours}</p>
            <p>Hours logged this week</p>
            <p>
              {/* {weekStart} through {weekEnd} */}
            </p>
          </div>
        </Col>
        <Col>
          <Link
            href=""
            // href={`/timesheets/week/${moment()
            //   .startOf("week")
            //   .format("YYYY-MM-DD")}/new`}
          >
            <Button block size="lg" color="success">
              Log Time
            </Button>
          </Link>

          <Link href={`/timesheets`}>
            <Button block size="lg" color="secondary">
              View All Timesheets
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default WeeklyTotal;
