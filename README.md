# Book Rental Management System

A full-stack web application for managing book inventory and rentals, built with a three-tier architecture using Docker containers.

## Architecture

This application consists of three main components:

- **Frontend**: HTML/CSS/JavaScript with Nginx web server
- **REST API**: Node.js/Express.js backend service
- **Database**: MySQL database with sample book data

## Features

- **Book Inventory Management**
  - View all books with details (title, description, genre, copies, daily rate)
  - Add new books to the collection
  - Delete books from inventory
  - Responsive grid layout for book display

- **REST API Endpoints**
  - `GET /api/products` - Retrieve all books
  - `GET /api/products/:id` - Get specific book by ID
  - `POST /api/products` - Add new book
  - `DELETE /api/products/:id` - Remove book
  - `GET /api/health` - API health check

- **Database Features**
  - Pre-populated with sample book data
  - Automatic timestamps for created/updated records
  - Proper indexing for performance

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/downloads)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-rental-system
   ```

2. **Start the application**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:4000
   - API: http://localhost:3000
   - Database: localhost:3306

## Project Structure

```
book-rental-system/
├── docker-compose.yml          # Container orchestration
├── frontend/                   # Web interface
│   ├── Dockerfile
│   ├── index.html             # Single-page application
│   └── nginx.conf             # Web server configuration
├── rest-api/                  # Backend API
│   ├── Dockerfile
│   ├── package.json
│   └── server.js              # Express.js server
└── database/                  # Database setup
    ├── Dockerfile
    └── init/
        └── init.sql           # Database schema and sample data
```

## API Documentation

### Books Endpoints

#### Get All Books
```http
GET /api/products
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "The Great Gatsby",
    "description": "A classic American novel...",
    "quantity": 3,
    "price": "2.50",
    "category": "Classic Literature",
    "created_at": "2024-09-09T10:00:00.000Z",
    "updated_at": "2024-09-09T10:00:00.000Z"
  }
]
```

#### Add New Book
```http
POST /api/products
Content-Type: application/json

{
  "name": "Book Title",
  "description": "Book description",
  "quantity": 5,
  "price": 2.75,
  "category": "Fantasy"
}
```

#### Delete Book
```http
DELETE /api/products/:id
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-09-09T10:00:00.000Z",
  "database": "connected"
}
```

## Database Schema

### Products Table
| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| id          | INT          | Primary key, auto-increment    |
| name        | VARCHAR(255) | Book title                     |
| description | TEXT         | Book description               |
| quantity    | INT          | Number of copies available     |
| price       | DECIMAL(10,2)| Daily rental rate              |
| category    | VARCHAR(100) | Genre/category                 |
| created_at  | TIMESTAMP    | Record creation time           |
| updated_at  | TIMESTAMP    | Last modification time         |

## Sample Data

The database is pre-populated with 12 popular books across various genres:

- Classic Literature (The Great Gatsby, To Kill a Mockingbird, Pride and Prejudice)
- Fantasy (Harry Potter, Lord of the Rings)
- Science Fiction (1984, Dune)
- Mystery/Thriller (Gone Girl, The Da Vinci Code, Sherlock Holmes)
- Young Adult (The Hunger Games, The Catcher in the Rye)

## Development

### Making Changes

To modify individual services:

```bash
# Frontend changes
docker compose down frontend
docker compose build frontend
docker compose up frontend

# API changes
docker compose down rest-api
docker compose build rest-api
docker compose up rest-api

# Database changes
docker compose down database
docker compose build database
docker compose up database
```

### Environment Variables

The API supports these environment variables:

- `DB_HOST` - Database hostname (default: database)
- `DB_USER` - Database username (default: root)
- `DB_PASSWORD` - Database password (default: password)
- `DB_NAME` - Database name (default: inventory_db)
- `PORT` - API port (default: 3000)

### Logs and Debugging

```bash
# View all service logs
docker compose logs

# View specific service logs
docker compose logs frontend
docker compose logs rest-api
docker compose logs database

# Follow logs in real-time
docker compose logs -f rest-api
```

## Testing

### Manual Testing

1. **API Testing**
   ```bash
   # Test API health
   curl http://localhost:3000/api/health
   
   # Get all books
   curl http://localhost:3000/api/products
   
   # Add a book
   curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Book","quantity":1,"price":2.50,"category":"Test"}'
   
   # Delete a book
   curl -X DELETE http://localhost:3000/api/products/1
   ```

2. **Database Testing**
   ```bash
   # Connect to database
   docker compose exec database mysql -u root -ppassword inventory_db
   
   # Check data
   SELECT COUNT(*) FROM products;
   ```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Ensure ports 3000, 4000, and 3306 are available
   - Modify port mappings in docker-compose.yml if needed

2. **Database Connection Issues**
   ```bash
   # Check if database is ready
   docker compose logs database | grep "ready for connections"
   
   # Test connectivity
   docker compose exec rest-api ping database
   ```

3. **API Not Responding**
   ```bash
   # Check API logs for errors
   docker compose logs rest-api
   
   # Verify environment variables
   docker compose exec rest-api env | grep DB_
   ```

4. **Frontend Issues**
   ```bash
   # Check nginx configuration
   docker compose exec frontend cat /etc/nginx/nginx.conf
   
   # View nginx logs
   docker compose logs frontend
   ```

### Complete Reset

To start fresh with clean data:

```bash
# Stop containers and remove volumes
docker compose down -v

# Remove unused containers and images
docker system prune -f

# Rebuild everything
docker compose up --build
```

## Future Enhancements

- User authentication and authorization
- Book cover image uploads
- Rental tracking with customer management
- Due date notifications
- Late fee calculations
- Search and filtering capabilities
- Book recommendations
- Mobile responsive design improvements
- Unit and integration tests

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Nginx
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0
- **Infrastructure**: Docker, Docker Compose
- **Architecture**: RESTful API, Microservices

## License

This project is for educational purposes as part of COSC349 Cloud Computing coursework.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review container logs
3. Verify all services are running with `docker compose ps`
