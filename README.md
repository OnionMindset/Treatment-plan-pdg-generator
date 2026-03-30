# Treatment Plan — React App

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Open `src/config/supabase.js` and update:
```js
const SUPABASE_PROJECT = 'YOUR_PROJECT'   // your Supabase project ID
const IMAGES_BUCKET    = 'YOUR_BUCKET'    // bucket with logo & cover
```

### 3. Run locally
```bash
npm run dev
```

### 4. Test with mock data
Open in browser with URL params:
```
http://localhost:5173?customerName=Shreya&planCreatedBy=Dr.+James,Dr.+Priya&assignedTherapist=Dr.+Priya+Nair&assignedCommManager=Marcus+Webb&pricing=%E2%82%B918%2C500&planDetails=12-week+CBT+programme
```

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## Retool iFrame Setup

In Retool, add an **iFrame** component and set the source to:
```
https://your-app.vercel.app?customerName={{ submitJSON[0].customerName }}&planCreatedBy={{ submitJSON[0].planCreatedBy.join(',') }}&assignedTherapist={{ submitJSON[0].assignedTherapist }}&assignedCommManager={{ submitJSON[0].assignedCommManager }}&pricing={{ submitJSON[0].pricing }}&planDetails={{ encodeURIComponent(submitJSON[0].planDetails) }}
```

---

## Adding More Pages

1. Create `src/pages/Page2.jsx` and `src/pages/Page2.css`
2. Import and add `<Page2 data={data} />` in `App.jsx`
3. All pages are exported together in the PDF download

## Data Shape (from Retool submitJSON)

```json
{
  "customerName":        "Shreya",
  "planCreatedBy":       ["Dr. James Okafor", "Dr. Priya Nair"],
  "assignedTherapist":   "Dr. Priya Nair",
  "assignedCommManager": "Marcus Webb",
  "pricing":             "₹18,500",
  "planDetails":         "12-week CBT programme..."
}
```
