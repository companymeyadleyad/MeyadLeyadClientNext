import { Container, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Container className="py-5 text-center" style={{ direction: "rtl" }}>
      <Spinner animation="border" role="status" />
      <div className="mt-2">טוען דף קטגוריה...</div>
    </Container>
  );
}

