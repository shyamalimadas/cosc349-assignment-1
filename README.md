# Book Rental Management System - AWS Cloud Deployment

A full-stack web application for managing book inventory and rentals, deployed on AWS cloud infrastructure.

## Architecture

**Cloud Services:**
- Application Load Balancer (ALB)
- EC2 × 2 (Frontend: Nginx, Backend: Node.js)
- RDS MySQL

**Architecture Diagram:**
Internet → ALB → Frontend EC2 (Nginx) → Backend EC2 (Node.js/Express) → RDS MySQL

## Live Application

**Access:** `http://book-rental-alb-1234567890.us-east-1.elb.amazonaws.com`

**Features:**
- View book inventory
- Add new books
- Delete books
- Real-time updates

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript, Nginx
- **Backend:** Node.js 18, Express.js, PM2
- **Database:** MySQL 8.0 (RDS)
- **Cloud:** AWS (EC2, RDS, ALB)

## Prerequisites

- AWS Academy Learner Lab access
- SSH key pair (`book-rental-key.pem`)
- Git

## Deployment Instructions

### 1. Database Setup

**Create RDS MySQL instance:**
```bash
# AWS Console → RDS → Create database
Engine: MySQL 8.0
Instance: db.t3.micro
Master username: admin
Database name: inventory_db
Public access: Yes
Import schema:
bashmysql -h book-rental-db.c1qyqa4g4d1i.us-east-1.rds.amazonaws.com -u admin -p inventory_db < database/init/init.sql
2. Backend API (EC2)
Launch instance:

AMI: Amazon Linux 2023
Type: t2.micro
Security group: SSH (22), Custom TCP (3000)

Deploy:
bash# SSH to instance
ssh -i book-rental-key.pem ec2-user@54.86.126.91

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs git

# Clone and setup
git clone https://github.com/shyamalimadas/cosc349-assignment-1.git
cd cosc349-assignment-1/rest-api
npm install

# Create .env
cat > .env << EOF
DB_HOST=book-rental-db.c1qyqa4g4d1i.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your_password_here (I know it's not conventional to share, but for this case, the password is "Shyamalima2003!").
DB_NAME=inventory_db
PORT=3000
EOF

# Start with PM2
sudo npm install -g pm2
pm2 start server.js --name book-api
pm2 startup
pm2 save
3. Frontend (EC2)
Launch instance:

AMI: Amazon Linux 2023
Type: t2.micro
Security group: SSH (22), HTTP (80)

Deploy:
bash# SSH to instance
ssh -i book-rental-key.pem ec2-user@54.164.100.248

# Install Nginx
sudo dnf install -y nginx git
sudo systemctl start nginx
sudo systemctl enable nginx

# Deploy files
git clone https://github.com/shyamalimadas/cosc349-assignment-1.git
sudo cp cosc349-assignment-1/frontend/index.html /usr/share/nginx/html/

# Configure Nginx proxy
sudo nano /etc/nginx/conf.d/book-rental.conf
Nginx configuration:
nginxserver {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://54.86.126.91:3000;
        proxy_set_header Host $host;
    }
}
bashsudo systemctl restart nginx
4. Application Load Balancer
Create target group:

Target: Frontend EC2
Protocol: HTTP, Port: 80

Create ALB:

Type: Application Load Balancer
Scheme: Internet-facing
Listener: HTTP:80 → Forward to target group





Built upon COSC349 Assignment 1 (Docker deployment)
Migrated to AWS cloud infrastructure for Assignment 2
AWS services: EC2, RDS, ALB

License
Educational project for COSC349 - University of Otago
Author
Shyamalima Das (dashy491)

