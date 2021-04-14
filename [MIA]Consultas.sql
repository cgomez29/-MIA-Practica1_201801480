USE GrandVirusEpicenter;


/* CONSULTA #01 */
/**
* Mostrar el nombre del hospital, su dirección y el número de fallecidos por
* cada hospital registrado.
*/

CREATE VIEW view_consulta1 
AS
SELECT HOSPITAL.hospital_name, HOSPITAL.location, COUNT(VICTIM.death_date) AS Numero_de_fallecidos
FROM VICTIM_STUDIED
INNER JOIN HOSPITAL ON VICTIM_STUDIED.hospital_id = HOSPITAL.hospital_id
INNER JOIN VICTIM ON VICTIM_STUDIED.victim_id = VICTIM.victim_id
GROUP BY HOSPITAL.hospital_name, HOSPITAL.location
ORDER BY HOSPITAL.hospital_name
;

/* CONSULTA #02 */
/**
* Mostrar el nombre, apellido de todas las víctimas en cuarentena que
* presentaron una efectividad mayor a 5 en el tratamiento “Transfusiones de
* sangre”.
*/
SELECT VICTIM.victim_name, VICTIM.surname 
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
INNER JOIN STATE ON VICTIM.state_id = STATE.state_id
WHERE VICTIM_TREATMENT.effect > 5 AND TREATMENT.tname = 'Transfusiones de sangre'AND
STATE.state_name = 'En cuarentena';

/* CONSULTA #03 */
/**
* Mostrar el nombre, apellido y dirección de las víctimas fallecidas con más de
* tres personas asociadas.	
*/
SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.location, COUNT(associated_id) AS Allegados
FROM ASSOCIATED_VICTIM 
INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id 
WHERE VICTIM.death_date IS NOT NULL
GROUP BY VICTIM.victim_name, VICTIM.surname, VICTIM.location
HAVING COUNT(associated_id) > 3; 

/* CONSULTA #04 */
/**
* Mostrar el nombre y apellido de todas las víctimas en estado “Suspendida”
* que tuvieron contacto físico de tipo “Beso” con más de 2 de sus asociados.
*/

SELECT VICTIM.victim_name, VICTIM.surname
FROM ASSOCIATED_DETAIL
INNER JOIN ASSOCIATED_VICTIM ON ASSOCIATED_DETAIL.assvictim_id = ASSOCIATED_VICTIM.assvictim_id
INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id 
INNER JOIN STATE ON VICTIM.state_id = STATE.state_id
INNER JOIN TYPE_CONTACT ON ASSOCIATED_DETAIL.type_id = TYPE_CONTACT.type_id
WHERE TYPE_CONTACT.type_name = 'Beso' AND STATE.state_name = 'Sospecha' 
GROUP BY VICTIM.victim_name, VICTIM.surname
HAVING COUNT(ASSOCIATED_VICTIM.associated_id) > 2;

/* CONSULTA #05 */ 
/**
* Top 5 de víctimas que más tratamientos se han aplicado del tratamiento
* “Oxígeno”.
*/
SELECT VICTIM.victim_name, VICTIM.surname, COUNT(TREATMENT.tname) AS record
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
WHERE tname = 'Oxigeno'
GROUP BY VICTIM.victim_name, VICTIM.surname
ORDER BY record DESC
LIMIT 5;

/* CONSULTA #06 */
/**
* Mostrar el nombre, el apellido y la fecha de fallecimiento de todas las
* víctimas que se movieron por la dirección “1987 Delphine Well” a los cuales
* se les aplicó "Manejo de la presión arterial" como tratamiento.
*/
SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.death_date
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
WHERE VICTIM.victim_id IN (SELECT victim_id FROM VICTIM_LOCATION WHERE location = '1987 Delphine Well') 
AND TREATMENT.tname = 'Manejo de la presion arterial';

/*SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.death_date
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
WHERE  TREATMENT.tname = 'Manejo de la presion arterial';


SELECT VICTIM.victim_id , VICTIM.victim_name, VICTIM.surname
FROM VICTIM_LOCATION
INNER JOIN VICTIM ON VICTIM_LOCATION.victim_id = VICTIM.victim_id
WHERE VICTIM_LOCATION.location = '1987 Delphine Well';*/

/* CONSULTA #07 */
/**
* Mostrar nombre, apellido y dirección de las víctimas que tienen menos de 2
* allegados los cuales hayan estado en un hospital y que se le hayan aplicado
* únicamente dos tratamientos.
*/
SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.location
FROM ASSOCIATED_VICTIM 
INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id 
WHERE (SELECT COUNT(TREATMENT.treatment_id) 
FROM VICTIM_TREATMENT
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
WHERE victim_id = ASSOCIATED_VICTIM.victim_id
GROUP BY victim_id) = 2
GROUP BY VICTIM.victim_name, VICTIM.surname, VICTIM.location
HAVING COUNT(associated_id) < 2; 

/*
SELECT COUNT(TREATMENT.treatment_id) 
FROM VICTIM_TREATMENT
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
GROUP BY victim_id;
*/

/* CONSULTA #08 */
/**
* Mostrar el número de mes ,de la fecha de la primera sospecha, nombre y
* apellido de las víctimas que más tratamientos se han aplicado y las que
* menos. (Todo en una sola consulta).
*/
SELECT MONTH(VICTIM.sospecha_date) AS MES, VICTIM.victim_name, VICTIM.surname, COUNT(VICTIM_TREATMENT.treatment_id) AS record
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
GROUP BY VICTIM.sospecha_date, VICTIM.victim_name, VICTIM.surname
HAVING COUNT(VICTIM_TREATMENT.treatment_id) = 
(SELECT MAX(maximo) FROM (
SELECT COUNT(VICTIM_TREATMENT.treatment_id) as maximo
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
GROUP BY VICTIM.sospecha_date, VICTIM.victim_name, VICTIM.surname
) AS COUNTS2) OR 
COUNT(VICTIM_TREATMENT.treatment_id) = 
(SELECT MIN(minimo) FROM (
SELECT COUNT(VICTIM_TREATMENT.treatment_id) as minimo
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
GROUP BY VICTIM.sospecha_date, VICTIM.victim_name, VICTIM.surname
) AS COUNTS) 
ORDER BY record DESC;

/*SELECT MAX(maximo) FROM (
SELECT COUNT(VICTIM_TREATMENT.treatment_id) as maximo
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
GROUP BY VICTIM.sospecha_date, VICTIM.victim_name, VICTIM.surname
) AS COUNTS;

SELECT MIN(minimo) FROM (
SELECT COUNT(VICTIM_TREATMENT.treatment_id) as minimo
FROM VICTIM_TREATMENT
INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
GROUP BY VICTIM.sospecha_date, VICTIM.victim_name, VICTIM.surname
) AS COUNTS;*/

/* CONSULTA #09 */
/**
* Mostrar el porcentaje de víctimas que le corresponden a cada hospital.
*/
SELECT HOSPITAL.hospital_name, COUNT(victim_id) as Cantidad, CONCAT((COUNT(victim_id) /(SELECT COUNT(victim_id) FROM VICTIM_STUDIED)*100),'%') AS Porcentaje
FROM VICTIM_STUDIED
INNER JOIN HOSPITAL ON VICTIM_STUDIED.hospital_id = HOSPITAL.hospital_id
GROUP BY HOSPITAL.hospital_name;

/* CONSULTA #10 */
/**
* Mostrar el porcentaje del contacto físico más común de cada hospital de la
* siguiente manera: nombre de hospital, nombre del contacto físico, porcentaje
* de víctimas.
*/

-- SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
CREATE VIEW view_consulta10
AS 
SELECT Nombre, Tipo, MAX(Record), Porcentaje FROM 
(SELECT HOSPITAL.hospital_name AS Nombre, TYPE_CONTACT.type_name AS Tipo,  COUNT(TYPE_CONTACT.type_name) AS Record,
CONCAT((COUNT(TYPE_CONTACT.type_name)/
	(SELECT  SUM(Total) AS TotalH FROM
	(SELECT HOSPITAL.hospital_name AS Hospit, TYPE_CONTACT.type_name,  COUNT(TYPE_CONTACT.type_name) AS Total
	FROM VICTIM_STUDIED
	INNER JOIN HOSPITAL ON VICTIM_STUDIED.hospital_id = HOSPITAL.hospital_id
	INNER JOIN VICTIM ON VICTIM_STUDIED.victim_id = VICTIM.victim_id
	INNER JOIN ASSOCIATED_VICTIM ON VICTIM.victim_id = ASSOCIATED_VICTIM.victim_id
	INNER JOIN ASSOCIATED_DETAIL ON  ASSOCIATED_VICTIM.assvictim_id = ASSOCIATED_DETAIL.assvictim_id
	INNER JOIN TYPE_CONTACT ON ASSOCIATED_DETAIL.type_id = TYPE_CONTACT.type_id
	GROUP BY HOSPITAL.hospital_name, TYPE_CONTACT.type_name) as grupo
	WHERE Hospit = HOSPITAL.hospital_name
	GROUP BY Hospit) * 100

),'%')  AS Porcentaje
FROM VICTIM_STUDIED
INNER JOIN HOSPITAL ON VICTIM_STUDIED.hospital_id = HOSPITAL.hospital_id
INNER JOIN VICTIM ON VICTIM_STUDIED.victim_id = VICTIM.victim_id
INNER JOIN ASSOCIATED_VICTIM ON VICTIM.victim_id = ASSOCIATED_VICTIM.victim_id
INNER JOIN ASSOCIATED_DETAIL ON  ASSOCIATED_VICTIM.assvictim_id = ASSOCIATED_DETAIL.assvictim_id
INNER JOIN TYPE_CONTACT ON ASSOCIATED_DETAIL.type_id = TYPE_CONTACT.type_id
GROUP BY HOSPITAL.hospital_name, TYPE_CONTACT.type_name)
AS Resultado
GROUP BY Nombre
;


SELECT * FROM view_consulta10;

 SET global sql_mode='';

SHOW FULL TABLES FROM GrandVirusEpicenter;

SELECT * FROM VICTIM_TREATMENT ;
SELECT * FROM TREATMENT ;
SELECT * FROM VICTIM;
SELECT * FROM STATE;
SELECT * FROM TYPE_CONTACT;
SELECT * FROM HOSPITAL; 
SELECT * FROM ASSOCIATED;

SELECT * FROM TEMPORAL;

TRUNCATE TABLE TEMPORAL;


-- 6

/*SELECT HOSPITAL.hospital_name, HOSPITAL.location, VICTIM.death_date, VICTIM.victim_name, surname
FROM VICTIM_STUDIED
INNER JOIN HOSPITAL ON VICTIM_STUDIED.hospital_id = HOSPITAL.hospital_id
INNER JOIN VICTIM ON VICTIM_STUDIED.victim_id = VICTIM.victim_id
WHERE HOSPITAL.hospital_name = 'Archangel Clinic';*/

