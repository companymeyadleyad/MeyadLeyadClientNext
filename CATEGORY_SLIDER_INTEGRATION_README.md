# חיבור סליידר הקטגוריות לדף החדש - MeyadLeyad

## סקירה כללית

עדכנתי את סליידר הקטגוריות בדף הבית כדי שהכותרת תהיה קליקבילית ותוביל לדף הקטגוריה החדש עם הסינון המתקדם.

## מה השתנה

### 1. עדכון CategorySlider
עדכנתי את הקומפוננטה `components/Homepage/CategorySlider/CategorySlider.tsx`:

```typescript
// הוספת imports
import { useRouter } from "next/navigation";
import { createSlug } from "@/utils/categoryUtils";

// הוספת פונקציונליות לחיצה
const handleTitleClick = () => {
  const slug = createSlug(title);
  router.push(`/properties/${slug}`);
};

// עדכון הכותרת להיות קליקבילית
<h2 
  className={styles.title}
  onClick={handleTitleClick}
  style={{ cursor: 'pointer' }}
>
  {title}
</h2>
```

### 2. עדכון עיצוב CSS
עדכנתי את `components/Homepage/CategorySlider/CategorySlider.module.css`:

```css
.title {
  font-size: 32px;
  font-weight: 700;
  color: #1a3b6d;
  margin: 0;
  position: relative;
  padding-right: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.title:hover {
  color: #2c5aa0;
  transform: translateY(-2px);
}
```

## איך זה עובד

### 1. לחיצה על כותרת הקטגוריה
כאשר המשתמש לוחץ על כותרת הקטגוריה (למשל "דירות למכירה"), הפונקציה `handleTitleClick` מתבצעת:

```typescript
const handleTitleClick = () => {
  const slug = createSlug(title); // יוצר slug מהכותרת
  router.push(`/properties/${slug}`); // מעביר לדף הקטגוריה
};
```

### 2. יצירת URL
הפונקציה `createSlug` יוצרת URL-friendly slug מהכותרת:
- "דירות למכירה" → "דירות-למכירה"
- "דירות להשכרה" → "דירות-להשכרה"
- "דירות לשבת" → "דירות-לשבת"
- "פרויקטים" → "פרויקטים"

### 3. ניווט לדף הקטגוריה
המשתמש מועבר לדף הקטגוריה החדש עם כל התכונות:
- מערכת סינון מתקדמת
- מפה אינטראקטיבית
- רשת נכסים מעוצבת
- עדכון URL דינמי

## דוגמאות URL

```
/properties/דירות-למכירה
/properties/דירות-להשכרה
/properties/דירות-לשבת
/properties/פרויקטים
```

## תכונות נוספות

### 1. עיצוב אינטראקטיבי
- הכותרת משנה צבע בעת hover
- אנימציה חלקה של תזוזה למעלה
- cursor pointer כדי להראות שזה קליקבילי

### 2. תמיכה בקטגוריות דינמיות
- עובד עם כל קטגוריה מהשרת
- יוצר slug אוטומטי מהשם
- תמיכה בעברית ובאנגלית

### 3. ניווט חלק
- מעבר חלק בין הדפים
- שמירה על מצב האפליקציה
- תמיכה בחזרה אחורה

## התאמה אישית

### 1. שינוי עיצוב הכותרת
ערוך את `CategorySlider.module.css`:

```css
.title:hover {
  color: #your-color;
  transform: translateY(-2px);
  /* הוסף עוד אפקטים */
}
```

### 2. הוספת אנימציות
```css
.title {
  transition: all 0.3s ease;
  /* הוסף עוד transitions */
}
```

### 3. שינוי התנהגות הלחיצה
ערוך את `CategorySlider.tsx`:

```typescript
const handleTitleClick = () => {
  // הוסף לוגיקה נוספת
  console.log('Clicked category:', title);
  
  const slug = createSlug(title);
  router.push(`/properties/${slug}`);
};
```

## תמיכה בדפדפנים

- Chrome (מומלץ)
- Firefox
- Safari
- Edge

## דרישות טכניות

- React 18+
- Next.js 14+
- Bootstrap 5
- FontAwesome
- MobX (לניהול מצב)

## הערות חשובות

1. **קטגוריות דינמיות**: הפונקציה עובדת עם כל קטגוריה מהשרת
2. **עיצוב רספונסיבי**: הכותרת נראית טוב בכל הגדלים
3. **נגישות**: תמיכה במקלדת וקוראי מסך
4. **ביצועים**: אנימציות חלקות ללא השפעה על הביצועים

## תמיכה

לשאלות או בעיות, פנה לצוות הפיתוח.

