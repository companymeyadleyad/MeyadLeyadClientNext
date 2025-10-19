import { Container } from "react-bootstrap";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-5 text-center" style={{ direction: "rtl" }}>
      <div className="py-5">
        <h1 className="display-1 text-muted">404</h1>
        <h2 className="mb-4">קטגוריה לא נמצאה</h2>
        <p className="lead mb-4">
          הקטגוריה המבוקשת לא קיימת במערכת.
        </p>
        <Link href="/properties" className="btn btn-primary btn-lg">
          חזור לכל הנכסים
        </Link>
      </div>
    </Container>
  );
}
