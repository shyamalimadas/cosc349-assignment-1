USE inventory_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample book data
INSERT INTO products (name, description, quantity, price, category) VALUES
('The Great Gatsby', 'A classic American novel by F. Scott Fitzgerald set in the summer of 1922, exploring themes of decadence, idealism, and excess in the Jazz Age.', 3, 2.50, 'Classic Literature'),
('To Kill a Mockingbird', 'Harper Lee\'s Pulitzer Prize-winning novel about racial injustice and childhood innocence in the American South during the 1930s.', 4, 2.75, 'Classic Literature'),
('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling\'s magical adventure about a young wizard discovering his destiny at Hogwarts School of Witchcraft and Wizardry.', 6, 3.00, 'Fantasy'),
('1984', 'George Orwell\'s dystopian masterpiece about totalitarian control, surveillance, and the power of language in a dark future society.', 2, 2.25, 'Science Fiction'),
('Pride and Prejudice', 'Jane Austen\'s beloved romance novel about manners, marriage, and morality in Georgian England, featuring Elizabeth Bennet and Mr. Darcy.', 5, 2.00, 'Romance'),
('The Catcher in the Rye', 'J.D. Salinger\'s coming-of-age story following teenager Holden Caulfield as he navigates alienation and rebellion in New York City.', 3, 2.50, 'Coming of Age'),
('Lord of the Rings: Fellowship', 'J.R.R. Tolkien\'s epic fantasy adventure about hobbits, wizards, and the quest to destroy the One Ring and save Middle-earth.', 4, 3.25, 'Fantasy'),
('Gone Girl', 'Gillian Flynn\'s psychological thriller about a marriage gone wrong and the dark secrets that emerge when a wife mysteriously disappears.', 5, 2.75, 'Thriller'),
('The Da Vinci Code', 'Dan Brown\'s mystery thriller combining art, history, and religion as symbologist Robert Langdon uncovers a deadly secret.', 3, 2.50, 'Mystery'),
('Dune', 'Frank Herbert\'s science fiction epic set on the desert planet Arrakis, featuring political intrigue, ecology, and mystical powers.', 2, 3.00, 'Science Fiction'),
('The Hunger Games', 'Suzanne Collins\' dystopian novel about Katniss Everdeen fighting for survival in a televised death match in post-apocalyptic Panem.', 4, 2.75, 'Young Adult'),
('Sherlock Holmes: Complete Adventures', 'Arthur Conan Doyle\'s complete collection featuring the world\'s greatest detective and his loyal companion Dr. Watson.', 3, 2.25, 'Mystery');