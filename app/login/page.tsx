"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Card, Button } from "react-bootstrap";

import PageTitle from "../../components/GlobalComponent/PageTitle";
import { TextField, PasswordField } from "../../components/Fields/FormFields";

import type { LoginRequest } from "../../types/LoginAndRegister/Login/LoginRequest";
import { userStore } from "../../stores/User.store";
import { UserService } from "../../services/userService";
import { usePopup } from "../../components/Common/Popup/PopupContext";

function LoginForm() {
  const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });
  const router = useRouter();
  const search = useSearchParams();
  const showPopup = usePopup();

  // תמיכה ב־?from=/some/path  (ברירת מחדל: "/")
  const from = useMemo(() => {
    const f = search?.get("from");
    // היגיינה בסיסית – מתירים רק נתיב פנימי שמתחיל ב־/ כדי למנוע open redirect
    if (f && f.startsWith("/")) return f;
    return "/";
  }, [search]);

  const handleChange =
    (field: keyof LoginRequest) =>
    (value: unknown) =>
      setFormData((prev) => ({ ...prev, [field]: value as string }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userService = new UserService();

    try {
      const response = await userService.login(formData);

      if (response?.success) {
        userStore.setToken(response.data.token);
        userStore.setUser(response.data.user);

        // אם תרצי גם Cookie ל־SSR/מִדלוור – אפשר כאן:
        // document.cookie = `auth=${response.data.token}; Path=/; SameSite=Lax`;

        showPopup({
          type: "success",
          message: "ההתחברות בוצעה בהצלחה",
          title: "",
          actionHandler: () => router.replace(from), // כמו navigate(from, { replace: true })
        });
      } else {
        showPopup({
          type: "error",
          message: "ההתחברות נכשלה. אנא נסה שוב.",
          title: "",
        });
      }
    } catch (err) {
      showPopup({
        type: "error",
        message: "שגיאה בהתחברות. נסי/ה שוב בעוד רגע.",
        title: "",
      });
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Card className="shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
          <Card.Body className="p-4">
            <PageTitle text="התחברות" className="text-center mb-4" />
            <form onSubmit={handleSubmit}>
              <TextField
                label="אימייל"
                name="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="הכנס אימייל"
                required={true}
              />
              <PasswordField
                label="סיסמה"
                name="password"
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="הכנס סיסמה"
                required={true}
              />
              <Button
                type="submit"
                variant="primary"
                className="btn btn-outline-primary btn-success p-2 w-100 mt-3"
                size="lg"
              >
                התחבר
              </Button>
            </form>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <Link
                href="/register"
                style={{
                  color: "var(--site-primary)",
                  fontWeight: 600,
                  fontSize: "1.08rem",
                  textDecoration: "underline",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s",
                }}
              >
                להרשמה
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
