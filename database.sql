CREATE DATABASE users;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    mdp VARCHAR(50) ,
    mail VARCHAR(50),
    Nom VARCHAR(50),
    Prenom VARCHAR(50)
);

CREATE TABLE client(
    client_id SERIAL PRIMARY KEY,
    user_id INT,
    Nom VARCHAR(50),
    Prenom VARCHAR(50),
    mail VARCHAR(50),
    add VARCHAR(50),
    tel NUMERIC(10),
    img VARCHAR(50),
    FOREIGN KEY(user_id) REFERENCES user (user_id)
);

CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    user_id INT,
    nom VARCHAR(50),
    prix NUMERIC(5,2),
    image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user (user_id) 
);

CREATE TABLE globalOrder (
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    dateOrder DATE,
    numeroOrder INT,
    montantTotal NUMERIC(5,2)
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE detailOrder (
    detailOrder_id SERIAL PRIMARY KEY,
    order_id INT,
    nom VARCHAR(50),
    prixUnitaire NUMERIC(5,2),
    image VARCHAR(255),
    quantite NUMERIC(5,2),
    prixTotal NUMERIC(5,2),
    FOREIGN KEY (order_id) REFERENCES globalOrder (order_id) 
);

CREATE TABLE sctedetails(
    sctedetails_id SERIAL PRIMARY KEY,
    user_id INT,
    Nom VARCHAR(50),
    add VARCHAR(50),
    mail VARCHAR(50),
    tel NUMERIC(10),
    siret VARCHAR(50),
    logo VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES user (user_id)
);


