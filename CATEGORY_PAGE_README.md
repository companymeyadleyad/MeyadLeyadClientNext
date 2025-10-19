# דף קטגוריות חדש - MeyadLeyad

## סקירה כללית

יצרתי דף קטגוריות חדש עם מערכת סינון מתקדמת ומפה אינטראקטיבית. הדף מאפשר למשתמשים לחפש נכסים לפי קטגוריות שונות עם אפשרויות סינון מגוונות.

## מבנה הקבצים

### דפים חדשים
- `app/properties/page.tsx` - דף "כל הנכסים" עם סינון כללי
- `app/properties/[categorySlug]/page.tsx` - דף קטגוריה דינמי
- `app/properties/[categorySlug]/loading.tsx` - מסך טעינה
- `app/properties/[categorySlug]/not-found.tsx` - דף 404

### קומפוננטות
- `components/CategoryPage/CategoryPageContent.tsx` - הקומפוננטה הראשית
- `components/CategoryPage/PropertyGrid.tsx` - רשת הנכסים
- `components/CategoryPage/MapComponent.tsx` - קומפוננטת המפה
- `components/CategoryPage/FilterPanel.tsx` - פאנל הסינון

### קבצי עזר
- `utils/categoryUtils.ts` - פונקציות עזר ליצירת slug ומציאת קטגוריות

### קבצי עיצוב
- `components/CategoryPage/CategoryPageContent.module.css`
- `components/CategoryPage/PropertyGrid.module.css`
- `components/CategoryPage/MapComponent.module.css`
- `components/CategoryPage/FilterPanel.module.css`

## תכונות עיקריות

### 1. מערכת סינון מתקדמת
- סינון לפי עיר
- סינון לפי סוג נכס
- סינון לפי מספר חדרים
- סינון לפי טווח מחירים
- סינון לפי שטח (מינימלי ומקסימלי)
- סינון לפי רחוב

### 2. עדכון URL דינמי
הדף מעדכן את ה-URL בהתאם לסינונים שנבחרו:
```
/category/forsale?city=תל%20אביב&rooms=3&price=2000000
```

### 3. מפה אינטראקטיבית
- הצגת נכסים על המפה
- לחיצה על נכס להצגת פרטים
- סימון נכסים נבחרים
- רחובות ושכונות מוצגים

### 4. רשת נכסים
- כרטיסי נכסים עם תמונות
- פרטי נכס (חדרים, שטח, קומה)
- מחיר מעוצב
- אנימציות חלקות

### 5. עיצוב רספונסיבי
- מותאם למובייל וטאבלט
- עיצוב מודרני ונקי
- אנימציות חלקות
- צבעים מותאמים למותג

## איך להשתמש

### 1. ניווט לקטגוריה
```typescript
// מהדף הראשי או מבחירת קטגוריה
router.push('/properties'); // כל הנכסים
router.push('/properties/דירות-למכירה');
router.push('/properties/דירות-להשכרה');
router.push('/properties/דירות-לשבת');
router.push('/properties/פרויקטים');
```

### 2. הוספת סינונים
```typescript
// הוספת פרמטרים ל-URL
router.push('/properties/דירות-למכירה?city=תל%20אביב&rooms=3&price=2000000');
router.push('/properties?city=תל%20אביב&rooms=3&price=2000000&area=80&topArea=120');
```

### 3. קריאת סינונים
```typescript
const searchParams = useSearchParams();
const city = searchParams.get('city');
const rooms = searchParams.get('rooms');
const price = searchParams.get('price');
```

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
