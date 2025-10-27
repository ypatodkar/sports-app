# PostgreSQL Migration Summary

## ✅ What Was Changed

Your backend has been successfully migrated from **SQLite** to **PostgreSQL** (AWS RDS compatible).

---

## 📝 Files Modified

### 1. `backend/database.js`
- ❌ Removed: `better-sqlite3` (SQLite)
- ✅ Added: `pg` (PostgreSQL client with connection pooling)
- ✅ Updated: Table creation to use PostgreSQL syntax
- ✅ Added: Async initialization

**Key Changes:**
- `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
- `TEXT` → `VARCHAR(255)` for limited strings
- `DATETIME` → `TIMESTAMP`
- Synchronous `db.exec()` → Async `pool.query()`

### 2. `backend/userController.js`
- ✅ Converted all functions to `async/await`
- ✅ Changed SQL placeholders from `?` to `$1, $2, $3...` (PostgreSQL style)
- ✅ Updated query syntax: `.get()` → `pool.query()` with `.rows[0]`
- ✅ Updated date functions: `DATE('now')` → `CURRENT_DATE`

### 3. `backend/package.json`
- ❌ Removed: `better-sqlite3`, `sqlite3`
- ✅ Added: `pg@^8.12.0`

### 4. `backend/env.template`
- ✅ Added RDS PostgreSQL configuration:
  ```env
  DB_HOST=your-rds-endpoint.rds.amazonaws.com
  DB_PORT=5432
  DB_NAME=sportsapp
  DB_USER=postgres
  DB_PASSWORD=your_password
  DB_SSL=true
  ```

### 5. Documentation
- ✅ Created: `RDS_POSTGRES_SETUP.md` - Complete setup guide
- ✅ Created: `POSTGRES_MIGRATION_SUMMARY.md` - This file

---

## 🚀 Next Steps

### Step 1: Set Up AWS RDS PostgreSQL
Follow the detailed guide: **`RDS_POSTGRES_SETUP.md`**

Quick checklist:
- [ ] Create RDS PostgreSQL instance in AWS Console
- [ ] Configure security group (allow port 5432)
- [ ] Get database endpoint
- [ ] Save master password

### Step 2: Update Backend `.env`
```bash
cd backend
cp env.template .env
# Edit .env with your RDS details
```

Required variables:
```env
DB_HOST=sports-app-db.xxxxxx.us-east-2.rds.amazonaws.com
DB_PORT=5432
DB_NAME=sportsapp
DB_USER=postgres
DB_PASSWORD=your_actual_password
DB_SSL=true
GEMINI_API_KEY=your_gemini_key
```

### Step 3: Test Locally
```bash
cd backend
npm install  # Already done ✅
npm start
```

Test the connection:
```bash
# Test user login
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"uid":"test123","email":"test@test.com","displayName":"Test"}'

# Check stats
curl http://localhost:5001/api/users/stats
```

### Step 4: Deploy to AWS Lambda
Your Lambda function will need:
1. Install `serverless-http`: `npm install serverless-http`
2. Create Lambda handler wrapper (see `RDS_POSTGRES_SETUP.md` Step 8)
3. Set environment variables in Lambda Console
4. Configure VPC if RDS is private

### Step 5: Update Frontend
Update frontend backend URL to point to your Lambda function URL.

---

## 🔄 Comparison: SQLite vs PostgreSQL

| Feature | SQLite (Old) | PostgreSQL (New) |
|---------|-------------|------------------|
| **Storage** | Local file (`users.db`) | AWS RDS (cloud) |
| **Lambda Compatible** | ❌ No | ✅ Yes |
| **Scalability** | Single file, limited | Production-grade |
| **Backups** | Manual | Automatic |
| **Concurrent Users** | Limited | High |
| **Cost** | Free | ~$15-20/month (after free tier) |
| **Setup Complexity** | Simple | Moderate |

---

## 📊 Database Schema (Unchanged)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  login_count INTEGER DEFAULT 1
);

CREATE INDEX idx_uid ON users(uid);
```

---

## 🔍 Code Changes Example

### Before (SQLite):
```javascript
const existingUser = db.prepare('SELECT * FROM users WHERE uid = ?').get(uid);
```

### After (PostgreSQL):
```javascript
const existingUserResult = await pool.query(
  'SELECT * FROM users WHERE uid = $1',
  [uid]
);
const existingUser = existingUserResult.rows[0];
```

---

## ⚠️ Important Notes

1. **SSL is Required**: RDS requires SSL connections
   - Ensure `DB_SSL=true` in `.env`

2. **Connection Pooling**: Already configured
   - Max 20 connections
   - Handles concurrent Lambda invocations

3. **Async/Await**: All database operations are now async
   - Better for Lambda's event-driven architecture

4. **Security Groups**: Must allow port 5432
   - From Lambda (if in VPC)
   - From your IP (for testing)

5. **Backward Compatibility**: Data migration required
   - Old SQLite data won't auto-migrate
   - Users will need to re-login (creates new records)

---

## 💰 Cost Breakdown

### Free Tier (12 months)
- ✅ 750 hours/month of db.t3.micro
- ✅ 20 GB storage
- ✅ 20 GB backups
- **Total: $0/month**

### After Free Tier
- db.t3.micro: $15/month
- Storage (20GB): $2.30/month
- Backups (20GB): Included
- **Total: ~$17/month**

---

## 🆘 Troubleshooting

### "Connection timeout"
- Check security group allows port 5432
- Verify RDS is publicly accessible (or Lambda in VPC)

### "Password authentication failed"
- Double-check password in `.env`
- Ensure username is `postgres`

### "Database does not exist"
- Verify `DB_NAME=sportsapp` in `.env`
- Check you entered database name during RDS creation

### Lambda can't connect
- Add Lambda to RDS security group
- Configure Lambda VPC settings
- Increase Lambda timeout to 30s

---

## ✅ Migration Checklist

- [x] Update database.js to PostgreSQL
- [x] Update userController.js to async/await
- [x] Update package.json dependencies
- [x] Install pg client (`npm install`)
- [x] Create env.template with RDS config
- [x] Create RDS setup guide
- [ ] **YOU**: Create RDS instance
- [ ] **YOU**: Update .env with RDS details
- [ ] **YOU**: Test locally
- [ ] **YOU**: Deploy to Lambda
- [ ] **YOU**: Update frontend backend URL

---

**🎉 Backend is PostgreSQL-ready! Follow `RDS_POSTGRES_SETUP.md` to complete deployment.**

