USE GrandVirusEpicenter;

--  SHOW GLOBAL VARIABLES LIKE 'local_infile';

--  SET GLOBAL local_infile = true;

-- SHOW VARIABLES LIKE "secure_file_priv";

/* CARGA DE DATOS */
LOAD DATA LOCAL INFILE '/var/lib/mysql-files/virus.csv'
INTO TABLE TEMPORAL
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(nombre_victima, apellido_victima, direccion_victima,
fecha_primera_sospecha, fecha_confirmacion, fecha_muerte, estado_victima,
nombre_asociado, apellido_asociado, fecha_conocio, contacto_fisico, 
fecha_inicio_contacto, fecha_fin_contacto, nombre_hospital, direccion_hospital,
ubicacion_victima, fecha_llegada, fecha_retiro, tratamiento, efectividad,
fecha_inicio_tratamiento, fecha_fin_tratamiento, efectividad_en_victima);

/* HOSPITAL */

INSERT INTO HOSPITAL(hospital_name, location) 
SELECT DISTINCT(nombre_hospital), direccion_hospital FROM TEMPORAL
WHERE nombre_hospital != '';

/* ESTADO DE UNA VICTIMA */

INSERT INTO STATE(state_name) 
SELECT DISTINCT(estado_victima) FROM TEMPORAL
WHERE estado_victima != '';

/* TIPO DE CONTACTO */

INSERT INTO TYPE_CONTACT(type_name)
SELECT DISTINCT(contacto_fisico) FROM TEMPORAL
WHERE contacto_fisico != '';

/* TRATAMIENTOS */

INSERT INTO TREATMENT(tname, effect) 
SELECT DISTINCT(tratamiento), (efectividad *1) AS efectividad FROM TEMPORAL 
WHERE tratamiento != '' AND efectividad != '';


/* VICTIMA */
INSERT INTO VICTIM(victim_name, surname, location, confirmacion_date, sospecha_date, death_date, state_id)
SELECT nombre_victima, apellido_victima, direccion_victima, fecha_primera_sospecha, fecha_confirmacion,
IF(fecha_muerte = '', NULL,STR_TO_DATE(fecha_muerte, '%Y-%m-%d %H:%i:%s')) AS muerte, STATE.state_id * 1 AS estado
FROM TEMPORAL
INNER JOIN STATE ON TEMPORAL.estado_victima = STATE.state_name
WHERE nombre_victima != ''
GROUP BY nombre_victima,
apellido_victima,
direccion_victima,
fecha_primera_sospecha,
fecha_confirmacion,
fecha_muerte, 
STATE.state_id;

/* UBICACION DE LA VICTIMA */
INSERT INTO VICTIM_LOCATION(location, entrance_datetime, exit_datetime, victim_id)
SELECT ubicacion_victima, fecha_llegada, fecha_retiro, VICTIM.victim_id  
FROM TEMPORAL
INNER JOIN VICTIM ON TEMPORAL.nombre_victima = VICTIM.victim_name
WHERE ubicacion_victima != ''
GROUP BY ubicacion_victima, fecha_llegada, fecha_retiro, VICTIM.victim_id;

/* VICTIMA ESTUDIADA */  -- ----------------------------------****************************************************************************
INSERT INTO VICTIM_STUDIED(hospital_id, victim_id)
SELECT HOSPITAL.hospital_id, VICTIM.victim_id
FROM TEMPORAL
INNER JOIN HOSPITAL ON (TEMPORAL.nombre_hospital = HOSPITAL.hospital_name AND TEMPORAL.direccion_hospital = HOSPITAL.location)
INNER JOIN VICTIM ON  (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname)
GROUP BY HOSPITAL.hospital_id, VICTIM.victim_id;

/* VICTIMA EN TRATAMIENTO */

INSERT INTO VICTIM_TREATMENT(effect, start_date, fin_date, treatment_id, victim_id)
SELECT efectividad_en_victima, fecha_inicio_tratamiento,
fecha_fin_tratamiento, TREATMENT.treatment_id, VICTIM.victim_id
FROM TEMPORAL
INNER JOIN TREATMENT ON TEMPORAL.tratamiento = TREATMENT.tname
INNER JOIN VICTIM ON (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname)
GROUP BY efectividad_en_victima, fecha_inicio_tratamiento,
fecha_fin_tratamiento, TREATMENT.treatment_id, VICTIM.victim_id; 


/* ASSOCIATED, Personas allegadas */
INSERT INTO ASSOCIATED(associated_name, surname)
SELECT nombre_asociado, apellido_asociado
FROM TEMPORAL
WHERE nombre_asociado != ''
GROUP BY nombre_asociado, apellido_asociado;


/* ASSOCIATED_VICTIM */
INSERT INTO ASSOCIATED_VICTIM(datetime_associated, victim_id, associated_id)
SELECT fecha_conocio,  VICTIM.victim_id, ASSOCIATED.associated_id
FROM TEMPORAL
INNER JOIN ASSOCIATED ON (TEMPORAL.nombre_asociado = ASSOCIATED.associated_name AND TEMPORAL.apellido_asociado = ASSOCIATED.surname)
INNER JOIN VICTIM ON (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname)
GROUP BY fecha_conocio, ASSOCIATED.associated_id, VICTIM.victim_id;


/* ASSOCIATED_DETAIL */
INSERT INTO ASSOCIATED_DETAIL(datetime_start_contact, datetime_fin_contact, assvictim_id, type_id)
SELECT fecha_inicio_contacto, fecha_fin_contacto,
(SELECT assvictim_id FROM ASSOCIATED_VICTIM
INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id
INNER JOIN ASSOCIATED ON ASSOCIATED_VICTIM.associated_id = ASSOCIATED.associated_id
WHERE VICTIM.victim_name = nombre_victima AND VICTIM.surname = TEMPORAL.apellido_victima AND
ASSOCIATED.associated_name = nombre_asociado AND ASSOCIATED.surname = TEMPORAL.apellido_asociado AND 
ASSOCIATED_VICTIM.datetime_associated = TEMPORAL.fecha_conocio) AS Victima_Allegado,
TYPE_CONTACT.type_id
FROM TEMPORAL
INNER JOIN TYPE_CONTACT ON TEMPORAL.contacto_fisico = TYPE_CONTACT.type_name
GROUP BY fecha_inicio_contacto, fecha_fin_contacto, TYPE_CONTACT.type_id, Victima_Allegado
ORDER BY Victima_Allegado;
