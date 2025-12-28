# TrackFlow


### Setup Instructions

#### Clone the project
 
```bash
 git clone https://github.com/<username>/<repository>
```

#### Go to backend directory

```bash
 cd backend
```
#### Install dependencies

```bash
 npm install 
```
#### Create .env file in root and add this 

```bash

NODE_ENV="development"
PORT=3000
DATABASE_URL=db_url
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=expiry_time
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=expiry_time

```

#### Run project in dev mode

```bash
 npm run dev
```
