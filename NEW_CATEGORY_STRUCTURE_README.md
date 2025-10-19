# מבנה קטגוריות חדש - MeyadLeyad

## סקירה כללית

יצרתי מבנה קטגוריות חדש ומתקדם עם מערכת סינון מתקדמת ומפה אינטראקטיבית. המבנה החדש מאפשר למשתמשים לחפש נכסים לפי קטגוריות שונות עם אפשרויות סינון מגוונות.

## מבנה הקבצים החדש

```
app/
  properties/
    page.tsx                    // עמוד "כל הנכסים" עם סינון כללי
    [categorySlug]/
      page.tsx                  // עמוד קטגוריה דינמי + סינון
      loading.tsx               // מסך טעינה
      not-found.tsx             // דף 404
  categories/
    page.tsx                    // עמוד הצגת כל הקטגוריות
```

## תכונות עיקריות

### 1. מבנה URL גמיש
- `/properties` - כל הנכסים
- `/properties/דירות-למכירה` - קטגוריה ספציפית
- `/properties/דירות-להשכרה` - קטגוריה ספציפית
- `/properties/דירות-לשבת` - קטגוריה ספציפית
- `/properties/פרויקטים` - קטגוריה ספציפית

### 2. מערכת סינון מתקדמת
- סינון לפי עיר, סוג נכס, מספר חדרים
- סינון לפי טווח מחירים ושטח
- עדכון URL אוטומטי עם כל סינון
- פאנל סינון מתקדם עם אפשרויות מגוונות

### 3. מפה אינטראקטיבית
- הצגת נכסים על המפה
- לחיצה על נכס להצגת פרטים
- סימון נכסים נבחרים
- רחובות ושכונות מוצגים

### 4. רשת נכסים מעוצבת
- כרטיסי נכסים עם תמונות
- פרטי נכס (חדרים, שטח, קומה)
- מחיר מעוצב
- אנימציות חלקות

### 5. עיצוב רספונסיבי
- מותאם למובייל וטאבלט
- עיצוב מודרני ונקי
- צבעים מותאמים למותג

## איך זה עובד

### 1. מבחירת קטגוריה
המשתמש לוחץ על קטגוריה ומגיע לדף החדש:
```typescript
// מהדף הראשי או מבחירת קטגוריה
router.push('/properties/דירות-למכירה');
```

### 2. סינון
המשתמש יכול להוסיף סינונים שונים:
```typescript
// הוספת פרמטרים ל-URL
router.push('/properties/דירות-למכירה?city=תל%20אביב&rooms=3&price=2000000');
```

### 3. עדכון URL
ה-URL משתנה בהתאם לסינונים:
```
/properties/דירות-למכירה?city=תל%20אביב&rooms=3&price=2000000&area=80&topArea=120
```

### 4. תוצאות
הנכסים מסוננים ומוצגים ברשת ובמפה

## דוגמאות URL

```
/properties
/properties?city=תל%20אביב&rooms=3
/properties/דירות-למכירה
/properties/דירות-למכירה?city=תל%20אביב&rooms=3
/properties/דירות-למכירה?city=תל%20אביב&rooms=3&price=2000000
/properties/דירות-להשכרה?city=תל%20אביב&rooms=3&price=2000000&area=80&topArea=120
```

## התאמה אישית

### 1. הוספת סינונים חדשים
ערוך את `FilterPanel.tsx` והוסף שדות חדשים:

```typescript
// הוסף שדה חדש
<Col md={6} className="mb-3">
  <Form.Group>
    <Form.Label>סינון חדש</Form.Label>
    <Form.Select
      value={localFilters.newFilter}
      onChange={(e) => handleFilterChange('newFilter', e.target.value)}
    >
      <option value="">כל האפשרויות</option>
      <option value="option1">אפשרות 1</option>
    </Form.Select>
  </Form.Group>
</Col>
```

### 2. שינוי עיצוב
ערוך את קבצי ה-CSS בהתאם לצרכים:
- `CategoryPageContent.module.css` - עיצוב כללי
- `PropertyGrid.module.css` - עיצוב רשת הנכסים
- `MapComponent.module.css` - עיצוב המפה
- `FilterPanel.module.css` - עיצוב פאנל הסינון

### 3. הוספת נתונים אמיתיים
החלף את `mockCategories` בנתונים אמיתיים מהשרת:

```typescript
// במקום mockCategories
const realData = await fetchPropertiesFromAPI(filters);
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

1. **מפה**: כרגע המפה היא מוק (mock). לשילוב מפה אמיתית, השתמש ב-Google Maps או Mapbox.

2. **נתונים**: הנתונים מגיעים מ-`mockApartments.ts`. החלף בנתונים אמיתיים מהשרת.

3. **ביצועים**: הדף מותאם לביצועים טובים עם lazy loading ואנימציות חלקות.

4. **נגישות**: הדף תומך בנגישות בסיסית עם תמיכה במקלדת וקוראי מסך.

## תמיכה

לשאלות או בעיות, פנה לצוות הפיתוח.

