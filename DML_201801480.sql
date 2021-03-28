USE GrandVirusEpicenter;

/* HOSPITAL */

INSERT INTO HOSPITAL(hospital_name, location) 
SELECT DISTINCT(nombre_hospital), direccion_hospital FROM TEMPORAL
WHERE nombre_hospital IS NOT NULL;

/* ESTADO DE UNA VICTIMA */

INSERT INTO STATE(state_name) 
SELECT DISTINCT(estado_victima) FROM TEMPORAL
WHERE estado_victima IS NOT NULL;

/* TIPO DE CONTACTO */

INSERT INTO TYPE_CONTACT(type_name)
SELECT DISTINCT(contacto_fisico) FROM TEMPORAL
WHERE contacto_fisico IS NOT NULL;

/* TRATAMIENTOS */

INSERT INTO TREATMENT(tname, effect) 
SELECT DISTINCT(tratamiento), efectividad FROM TEMPORAL
WHERE tratamiento IS NOT NULL;

/* VICTIMA */
INSERT INTO VICTIM(victim_name, surname, location, registration_date, death_date, state_id)
SELECT nombre_victima, apellido_victima, direccion_victima,
fecha_llegada, fecha_muerte, STATE.state_id
FROM TEMPORAL 
INNER JOIN STATE ON TEMPORAL.estado_victima = STATE.state_name;
 
/* UBICACION DE LA VICTIMA */
INSERT INTO VICTIM_LOCATION(location, entrance_datetime, exit_datetime, victim_id) 




/* VICTIMA ESTUDIADA */

-- INSERT INTO VICTIM_STUDIED