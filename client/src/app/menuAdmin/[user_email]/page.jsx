import Link from "next/link";
import { Button } from "@mui/material";

import "../../page.css";

export default function menuAdmin({ params }) {
  const userEmail = decodeURIComponent(params.user_email);
  return (
    <div className="container">
      <div className="header">
        <div className="text">Admin Menu</div>
        <div className="underline"></div>
      </div>
      <div className="submit-container">
      <Link href={`/quiz/${userEmail}`}>
        <Button variant="contained" color="primary" style={{ margin: "5px" }}>
          Take A Quiz
        </Button>
      </Link>
      <Link href={`/results/${userEmail}`}>
        <Button variant="contained" color="primary" style={{ margin: "5px" }}>
          View Results
        </Button>
      </Link>
      </div>
    </div>
  );
}
