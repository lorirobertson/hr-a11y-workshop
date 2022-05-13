import styles from "../styles/components/MainContent.module.scss";
import { Row, Col, Button } from "reactstrap";

import WeeklyTotal from "./WeeklyTotal";

const MainContent = () => {
  return (
    <div className={styles.mainContent} id="main-content">
      <Row>
        <Col>
          <div className="card">
             <WeeklyTotal/>
          </div>

          <div className="card">
            <div className="card-header">
              <h5>Corporate Message</h5>
            </div>
            <div className="card-body">
              Hello Everyone! Just as a reminder that stock bootstrapping series
              A financing channels user experience virality
              business-to-business. Early adopters first mover advantage
              hypotheses.
            </div>
          </div>
        </Col>

        <Col>
          <div className="card">
            <div className="card-header">
              <p className="h5">Request PTO</p>
            </div>
            <div className="card-body">
              <p>You have a PTO balance of 32 hours.</p>
              <div id="openPTOModal" className="btn btn-info btn-lg btn-block">
                Start a new PTO Request
              </div>
            </div>
          </div>

          <div className="BlogPost__PostContainer-sc-j7bot3-0 ldUkFV">
            <img className="post-image" />
            <div className="BlogPost__PostContent-sc-j7bot3-3 iIkaS">
              <a className="BlogPost__PostTitle-sc-j7bot3-2 bgqYfG"></a>
              <p className="post-body">
                ...<a href="/news/post/null">Read More</a>
              </p>
              <div className="BlogPost__PostFooter-sc-j7bot3-5 bRgQof">
                <a className="float-right" href="/news/category"></a>
                <div className="BlogPost__PostDate-sc-j7bot3-6 jLbblN">
                  Posted on Invalid date
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainContent;
