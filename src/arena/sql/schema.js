export const SQL_SCHEMA = `CREATE TABLE dealerships (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO dealerships (id, name) VALUES
  (1, 'Downtown Motors'),
  (2, 'Riverside Auto'),
  (3, 'Highland Classics');

CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  dealership_id INTEGER NOT NULL REFERENCES dealerships(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL
);

INSERT INTO staff (id, dealership_id, name, role) VALUES
  (1, 1, 'Rodney Ride', 'CEO'),
  (2, 1, 'Penny Piston', 'Accountant'),
  (3, 1, 'Rhonda Rules', 'HR Officer'),
  (4, 1, 'Nina Nitro', 'Salesperson'),
  (5, 1, 'Frankie Fender', 'Salesperson'),
  (6, 1, 'Mike Anic', 'Mechanic'),
  (7, 1, 'Meg A Byte', 'Data Administrator'),
  (8, 2, 'Tina Torque', 'Salesperson'),
  (9, 2, 'Owen Carr', 'Salesperson'),
  (10, 2, 'Clara Beck', 'Salesperson'),
  (11, 2, 'Mo Motor', 'Mechanic'),
  (12, 3, 'Sasha Miles', 'Salesperson'),
  (13, 3, 'Bobby Turner', 'Salesperson'),
  (14, 3, 'Cal Mason', 'Salesperson'),
  (15, 3, 'Reggie Ratchet', 'Mechanic');

CREATE TABLE cars (
  id INTEGER PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  color TEXT NOT NULL,
  condition INTEGER NOT NULL,
  sold INTEGER NOT NULL,
  dealership_id INTEGER NOT NULL REFERENCES dealerships(id)
);

INSERT INTO cars (id, brand, model, year, price, color, condition, sold, dealership_id) VALUES
  (1, 'Ford', 'Mustang', 1965, 45000, 'white', 4, 0, 1),
  (2, 'Chevrolet', 'Camaro', 1970, 48000, 'red', 2, 0, 1),
  (3, 'Dodge', 'Charger', 1969, 58000, 'black', 4, 1, 1),
  (4, 'Porsche', '911', 1985, 85000, 'silver', 5, 0, 1),
  (5, 'Jaguar', 'E-Type', 1967, 56000, 'green', 2, 1, 1),
  (6, 'Jaguar', 'S-Type', 1963, 100000, 'dark green', 3, 1, 1),
  (7, 'Jaguar', 'X-Type', 2001, 10000, 'black', 3, 1, 1),
  (8, 'BMW', 'M3', 1990, 35000, 'green-yellow', 1, 1, 1),
  (9, 'Ferrari', 'F355', 1997, 150000, 'red', 5, 0, 1),
  (10, 'Ford', 'Mustang', 1967, 15000, 'dark blue', 0, 0, 1),
  (11, 'Aston Martin', 'DB5', 1964, 595000, 'silver', 5, 0, 1),
  (12, 'Aston Martin', 'DB4', 1960, 465000, 'light green', 5, 0, 1),
  (13, 'Aston Martin', 'DBS', 1969, 99000, 'red', 2, 0, 1),
  (14, 'Aston Martin', 'DB4', 1960, 425000, 'green', 3, 0, 1),
  (15, 'Aston Martin', 'DB5', 1965, 649000, 'dark red', 5, 0, 1),
  (16, 'Toyota', 'Supra', 1994, 68000, 'black', 4, 1, 1),
  (17, 'Nissan', 'Skyline GT-R', 1999, 95000, 'blue', 5, 0, 1),
  (18, 'Volkswagen', 'Beetle', 1963, 25000, 'yellow', 3, 1, 1),
  (19, 'Lamborghini', 'Countach', 1989, 320000, 'red', 5, 0, 1),
  (20, 'Rolls-Royce', 'Silver Shadow', 1975, 55000, 'white', 2, 1, 1),
  (21, 'Bentley', 'Continental GT', 2005, 85000, 'black', 5, 0, 1),
  (22, 'Maserati', 'GranTurismo', 2010, 75000, 'blue', 4, 1, 1),
  (23, 'Alfa Romeo', 'Spider', 1986, 28000, 'red', 3, 1, 1),
  (24, 'Ford', 'Mustang', 1965, 20000, 'dark red', 1, 1, 1),
  (25, 'Lotus', 'Esprit', 1993, 62000, 'light yellow', 4, 0, 1),
  (26, 'Triumph', 'Herald', 1965, 12500, 'cream', 3, 1, 1),
  (27, 'Ford', 'Capri', 1983, 22000, 'blue', 2, 0, 1),
  (28, 'Ford', 'Granada', 1977, 18000, 'black', 1, 0, 1),
  (29, 'Volkswagen', 'Golf GTI', 1991, 12500, 'light green', 1, 1, 1),
  (30, 'Chevrolet', 'Camaro', 1969, 54000, 'mint green', 5, 1, 1),
  (31, 'Chevrolet', 'Corvette', 1967, 88000, 'red', 5, 1, 1),
  (32, 'Chevrolet', 'Corvette C5', 2001, 32000, 'yellow', 4, 1, 1),
  (33, 'Ferrari', 'Testarossa', 1988, 195000, 'red', 5, 1, 1),
  (34, 'Ferrari', '360 Modena', 2003, 125000, 'silver', 5, 1, 1),
  (35, 'Bentley', 'Arnage', 2001, 45000, 'black', 4, 0, 1),
  (36, 'Bentley', 'Continental R', 1999, 68000, 'blue', 5, 0, 1),
  (37, 'Jaguar', 'XJ220', 1994, 450000, 'silver', 5, 0, 1),
  (38, 'Porsche', '911 Carrera', 1985, 85000, 'red', 5, 0, 1),
  (39, 'Porsche', '911 Turbo', 1995, 12000, 'black', 1, 0, 1),
  (40, 'Porsche', '944 Turbo', 1986, 48000, 'white', 4, 1, 1),
  (41, 'Porsche', '356B', 1960, 265000, 'silver', 4, 0, 1),
  (42, 'Mercedes-Benz', '300SLR', 1955, 142000000, 'silver', 5, 0, 1),
  (43, 'Bentley', 'T2', 1978, 52000, 'silver', 4, 0, 1),
  (44, 'Volkswagen', 'Beetle', 1967, 15000, 'black', 1, 0, 1),
  (45, 'Volkswagen', 'Beetle', 1967, 25000, 'red', 3, 1, 2),
  (46, 'Ford', 'Mustang', 1965, 10000, 'yellow', 0, 0, 2),
  (47, 'Mercedes-Benz', '300SL', 1954, 35000, 'green', 4, 0, 1),
  (48, 'Porsche', '356', 1955, 40000, 'cream', 5, 1, 2),
  (49, 'Aston Martin', 'DB5', 1964, 45000, 'blue', 5, 1, 2),
  (50, 'AMC', 'Javelin', 1971, 22000, 'cream', 2, 0, 1),
  (51, 'Fiat', '124 Spider', 1978, 30000, 'green', 3, 1, 1),
  (52, 'BMW', '2002', 1973, 32000, 'green', 4, 0, 2),
  (53, 'Volkswagen', 'Beetle', 1967, 28000, 'grey', 3, 0, 3),
  (54, 'Volkswagen', 'Beetle', 1967, 12000, 'blue', 1, 0, 3),
  (55, 'AMC', 'Javelin', 1971, 18000, 'blue', 1, 1, 2),
  (56, 'BMW', '2002', 1973, 35000, 'black', 4, 0, 1),
  (57, 'Chevrolet', 'Bel Air', 1957, 38000, 'white', 4, 0, 3),
  (58, 'Toyota', '2000GT', 1967, 45000, 'blue', 5, 1, 1),
  (59, 'Pontiac', 'GTO', 1966, 30000, 'cream', 3, 0, 2),
  (60, 'Chevrolet', 'Bel Air', 1957, 24000, 'white', 2, 1, 2),
  (61, 'Alfa Romeo', 'Spider', 1974, 33000, 'blue', 3, 0, 3),
  (62, 'AMC', 'Javelin', 1971, 16000, 'green', 1, 0, 3),
  (63, 'Fiat', '124 Spider', 1978, 18000, 'green', 2, 1, 1),
  (64, 'Pontiac', 'GTO', 1966, 50000, 'red', 5, 1, 1),
  (65, 'Toyota', '2000GT', 1967, 47000, 'red', 5, 1, 1),
  (66, 'Lincoln', 'Continental', 1965, 32000, 'white', 4, 1, 2),
  (67, 'Alfa Romeo', 'Spider', 1974, 26000, 'black', 2, 1, 3),
  (68, 'Ferrari', '250 GTO', 1962, 60000, 'white', 5, 0, 2),
  (69, 'AMC', 'Javelin', 1971, 22000, 'grey', 2, 1, 2),
  (70, 'Volkswagen', 'Beetle', 1967, 29000, 'green', 3, 0, 1),
  (71, 'Pontiac', 'GTO', 1966, 17000, 'cream', 2, 0, 1),
  (72, 'Toyota', '2000GT', 1967, 48000, 'black', 5, 0, 2),
  (73, 'AMC', 'Javelin', 1971, 14000, 'blue', 1, 1, 2);

CREATE TABLE sold_cars (
  id INTEGER PRIMARY KEY,
  cars_id INTEGER NOT NULL REFERENCES cars(id),
  seller INTEGER NOT NULL REFERENCES staff(id),
  sold_date TEXT NOT NULL,
  sold_price INTEGER NOT NULL
);

INSERT INTO sold_cars (id, cars_id, seller, sold_date, sold_price) VALUES
  (1, 49, 10, '2023-01-09', 45500),
  (2, 52, 5, '2025-04-17', 18500),
  (3, 53, 4, '2020-11-19', 51000),
  (4, 55, 8, '2020-06-28', 56500),
  (5, 59, 12, '2020-11-12', 58500),
  (6, 62, 10, '2022-10-05', 64500),
  (7, 64, 8, '2022-05-18', 33000),
  (8, 67, 10, '2024-03-17', 14500),
  (9, 68, 5, '2024-10-08', 44500),
  (10, 69, 14, '2021-06-21', 73500),
  (11, 70, 12, '2025-03-15', 56000),
  (12, 71, 4, '2020-09-01', 26000),
  (13, 73, 14, '2022-06-23', 19000);
`
