import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/shared/Card";

const AboutPage = () => {
  return (
    <Card>
      <div className="about">
        <h4>About This Project</h4>
        <p>This is a react app to give feedback</p>
        <p>Version: 1.0</p>

        <p>
          <Link to={"/"}>
            Back to home page
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
