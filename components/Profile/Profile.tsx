// components/Profile/Profile.tsx
"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { Container, Row, Col, Card } from "react-bootstrap";
import { userStore } from "@/stores/User.store";
import SystemField from "@/components/SystemFields/SystemField";
import { FieldType } from "@/types/Fields/FieldType";
import styles from "./Profile.module.css";

const Profile: React.FC = observer(() => {
  const { user } = userStore;

  if (!user) return null;

  const handleChange = (fieldName: string) => (value: unknown) => {
    // השדות כאן לקריאה בלבד בפועל – נשאיר לוג הדגמה
    console.log(`Field ${fieldName} changed to:`, value);
  };

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={styles.profileCard}>
            <Card.Header className={styles.profileHeader}>
              <h2>פרופיל משתמש</h2>
            </Card.Header>
            <Card.Body className={styles.cardBody}>
              <div className={styles.profileFields}>
                <SystemField
                  fieldType={FieldType.TextField}
                  label="שם פרטי"
                  name="firstName"
                  value={user.firstName || ""}
                  onChange={handleChange("firstName")}
                />

                <SystemField
                  fieldType={FieldType.TextField}
                  label="שם משפחה"
                  name="lastName"
                  value={user.lastName || ""}
                  onChange={handleChange("lastName")}
                />

                <SystemField
                  fieldType={FieldType.TextField}
                  label="כתובת אימייל"
                  name="email"
                  value={user.emailAdress || ""}
                  onChange={handleChange("emailAdress")}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default Profile;
