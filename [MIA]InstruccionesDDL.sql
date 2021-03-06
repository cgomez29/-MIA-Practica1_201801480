CREATE DATABASE GrandVirusEpicenter;

-- DROP DATABASE GrandVirusEpicenter;

USE GrandVirusEpicenter;

CREATE TABLE TEMPORAL (
	nombre_victima VARCHAR(60) NOT NULL,					-- X
    apellido_victima VARCHAR(60) NOT NULL,					-- X
    direccion_victima VARCHAR(150) NOT NULL,				-- X
    fecha_primera_sospecha VARCHAR(25) NOT NULL,
    fecha_confirmacion VARCHAR(25) NOT NULL,
    fecha_muerte VARCHAR(25) DEFAULT NULL,					-- X
    estado_victima VARCHAR(25) NOT NULL,					-- X
    nombre_asociado VARCHAR(60) NOT NULL,
    apellido_asociado VARCHAR(60) NOT NULL,
    fecha_conocio VARCHAR(25) NOT NULL,
    contacto_fisico VARCHAR(60) DEFAULT NULL,				-- x
    fecha_inicio_contacto VARCHAR(25) DEFAULT NULL,
    fecha_fin_contacto VARCHAR(25) DEFAULT NULL,
    nombre_hospital VARCHAR(60) DEFAULT NULL,           	-- X
	direccion_hospital VARCHAR(120) DEFAULT NULL,       	-- X
    ubicacion_victima VARCHAR(120) DEFAULT NULL,			-- X
    fecha_llegada VARCHAR(25) DEFAULT NULL,					-- X   registration_date
    fecha_retiro VARCHAR(25) DEFAULT NULL,					-- X
    tratamiento VARCHAR(60) DEFAULT NULL,					-- X
    efectividad VARCHAR(5) DEFAULT NULL,					-- X
    fecha_inicio_tratamiento VARCHAR(25) DEFAULT NULL,
    fecha_fin_tratamiento VARCHAR(25) DEFAULT NULL,
    efectividad_en_victima VARCHAR(5) DEFAULT NULL
);

CREATE TABLE HOSPITAL (
	hospital_id INT NOT NULL AUTO_INCREMENT,
    hospital_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    PRIMARY KEY (hospital_id)
);

CREATE TABLE TREATMENT (
	treatment_id INT NOT NULL AUTO_INCREMENT,
    tname VARCHAR(255) NOT NULL,
    effect INT NOT NULL,
    PRIMARY KEY (treatment_id)
);

CREATE TABLE STATE (
	state_id INT NOT NULL AUTO_INCREMENT,
    state_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (state_id)
);

CREATE TABLE ASSOCIATED (
	associated_id INT NOT NULL AUTO_INCREMENT,
    associated_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    -- datetime_associated DATETIME NOT NULL,
    PRIMARY KEY (associated_id)
);


-- ALTER TABLE ASSOCIATED DROP COLUMN datetime_associated;


CREATE TABLE TYPE_CONTACT (
	type_id INT NOT NULL AUTO_INCREMENT,
    type_name VARCHAR(200) NOT NULL,
    PRIMARY KEY(type_id)
);

CREATE TABLE VICTIM (
	victim_id INT NOT NULL AUTO_INCREMENT,
	victim_name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    confirmacion_date DATETIME NOT NULL,
    sospecha_date DATETIME NOT NULL NULL,
    death_date DATETIME DEFAULT NULL,
    state_id INT NOT NULL,
    PRIMARY KEY (victim_id),
    FOREIGN KEY (state_id) REFERENCES STATE(state_id)
);

-- ALTER TABLE VICTIM_LOCATION MODIFY location VARCHAR(255) NOT NULL;

CREATE TABLE VICTIM_LOCATION (
	victim_location_id INT NOT NULL AUTO_INCREMENT,
    location VARCHAR(255) NOT NULL,
    entrance_datetime DATETIME NOT NULL,
    exit_datetime DATETIME NOT NULL,
    victim_id INT NOT NULL,
    PRIMARY KEY (victim_location_id),
    FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id)
);

DESCRIBE VICTIM_LOCATION;

CREATE TABLE VICTIM_STUDIED (
	studied_id INT NOT NULL AUTO_INCREMENT,
    hospital_id INT NULL,
	victim_id INT NOT NULL,
    PRIMARY KEY (studied_id),
    FOREIGN KEY (hospital_id) REFERENCES HOSPITAL(hospital_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE VICTIM_TREATMENT (
	treatvictim_id INT NOT NULL AUTO_INCREMENT,
    effect INT NOT NULL,
    start_date DATETIME NOT NULL,
    fin_date DATETIME NOT NULL,
    treatment_id INT NOT NULL,
    victim_id INT NOT NULL,
    PRIMARY KEY (treatvictim_id),
    FOREIGN KEY (treatment_id) REFERENCES TREATMENT(treatment_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ASSOCIATED_VICTIM (
	assvictim_id INT NOT NULL AUTO_INCREMENT,
    datetime_associated DATETIME NOT NULL,
    victim_id INT NOT NULL,
    associated_id INT NOT NULL, 
    PRIMARY KEY (assvictim_id),
    FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (associated_id) REFERENCES ASSOCIATED(associated_id) ON DELETE CASCADE ON UPDATE CASCADE
); 


CREATE TABLE ASSOCIATED_DETAIL (
	associated_detail_id INT NOT NULL AUTO_INCREMENT,
    datetime_start_contact DATETIME NOT NULL,
    datetime_fin_contact DATETIME NOT NULL,
    assvictim_id INT NOT NULL,
    type_id INT NOT NULL,
    PRIMARY KEY (associated_detail_id),
    FOREIGN KEY (assvictim_id) REFERENCES ASSOCIATED_VICTIM(assvictim_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (type_id) REFERENCES TYPE_CONTACT(type_id) ON DELETE CASCADE ON UPDATE CASCADE
); 


-- ALTER TABLE ASSOCIATED_VICTIM ADD datetime_associated DATETIME NOT NULL ;












