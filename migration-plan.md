# Migration Plan: Database Posts → Sanity CMS

## 📦 **What GETS MIGRATED to Sanity:**

### **From Database Post Table:**
```sql
-- These fields would migrate to Sanity:
SELECT 
  title,           → Sanity: title
  content,         → Sanity: body (converted to Portable Text)
  published,       → Sanity: publishedAt (conditional)
  createdAt,       → Sanity: publishedAt
  authorId         → Sanity: author (reference)
FROM Post
```

### **Your 10 Current Posts:**
1. "WEEEEEE" 
2. "Robust Database Test"
3. "Welcome to Our Church"
4. "Test Post from Admin"
5. "klangkejangea"
6. "THIS IS A TEST POST YAYYYY"
7. "Smoke Post" (2 instances)
8. "Smoke test post"
9. "Hello, world"

## 🗄️ **What STAYS in Database:**

### **User Management:**
- User authentication
- User profiles
- Permissions and roles

### **Events System:**
- Event creation/management
- Event RSVPs
- Calendar functionality

### **User Interactions:**
- Comments on posts
- Likes on posts
- Photo uploads
- User-generated content

### **Application Data:**
- Real-time features
- Analytics
- User preferences

## 🔄 **New Data Flow:**

### **Blog Post Display:**
```
1. Fetch post content from Sanity API
2. Fetch comments from Database API  
3. Fetch likes from Database API
4. Combine and display
```

### **User Interaction:**
```
1. User comments on Sanity post
2. Comment stored in Database
3. Linked to Sanity post via post ID
4. Displayed together
```

## 💾 **Database Schema After Migration:**

```sql
-- Keep these tables:
User (unchanged)
Event (unchanged) 
Comment (modified: link to Sanity post ID)
Like (modified: link to Sanity post ID)
Photo (unchanged)

-- Remove this table:
Post (delete after migration)
```

## 🎯 **Benefits:**
- ✅ Rich content editing in Sanity
- ✅ Keep all dynamic features in database
- ✅ Better performance for content management
- ✅ Professional CMS for church staff
- ✅ Maintain all user interaction features
