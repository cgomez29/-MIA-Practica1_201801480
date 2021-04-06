"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_config_1 = __importDefault(require("../config/database.config"));
class IndexController {
    index(req, res) {
        res.json({ Sever: "Running 3001" });
    }
    consulta1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT * FROM view_consulta1;`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT VICTIM.victim_name, VICTIM.surname 
                                            FROM VICTIM_TREATMENT
                                            INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
                                            INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
                                            INNER JOIN STATE ON VICTIM.state_id = STATE.state_id
                                            WHERE VICTIM_TREATMENT.effect > 5 AND TREATMENT.tname = 'Transfusiones de sangre'AND
                                            STATE.state_name = 'En cuarentena';`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta3(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.location, COUNT(associated_id) AS Allegados
                                            FROM ASSOCIATED_VICTIM 
                                            INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id 
                                            WHERE VICTIM.death_date IS NOT NULL
                                            GROUP BY VICTIM.victim_name, VICTIM.surname, VICTIM.location
                                            HAVING COUNT(associated_id) > 3; `);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta4(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT VICTIM.victim_name, VICTIM.surname
                                            FROM ASSOCIATED_DETAIL
                                            INNER JOIN ASSOCIATED_VICTIM ON ASSOCIATED_DETAIL.assvictim_id = ASSOCIATED_VICTIM.assvictim_id
                                            INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id 
                                            INNER JOIN STATE ON VICTIM.state_id = STATE.state_id
                                            INNER JOIN TYPE_CONTACT ON ASSOCIATED_DETAIL.type_id = TYPE_CONTACT.type_id
                                            WHERE TYPE_CONTACT.type_name = 'Beso' AND STATE.state_name = 'Sospecha' 
                                            GROUP BY VICTIM.victim_name, VICTIM.surname
                                            HAVING COUNT(ASSOCIATED_VICTIM.associated_id) > 2;`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta5(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT VICTIM.victim_name, VICTIM.surname, COUNT(TREATMENT.tname) AS record
                                            FROM VICTIM_TREATMENT
                                            INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
                                            INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
                                            WHERE tname = 'Oxigeno'
                                            GROUP BY VICTIM.victim_name, VICTIM.surname
                                            ORDER BY record DESC
                                            LIMIT 5;`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta6(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.death_date
                                            FROM VICTIM_TREATMENT
                                            INNER JOIN VICTIM ON VICTIM_TREATMENT.victim_id = VICTIM.victim_id
                                            INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
                                            WHERE VICTIM.victim_id IN (SELECT victim_id FROM VICTIM_LOCATION WHERE location = '1987 Delphine Well') 
                                            AND TREATMENT.tname = 'Manejo de la presion arterial';`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta7(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT VICTIM.victim_name, VICTIM.surname, VICTIM.location
                                            FROM ASSOCIATED_VICTIM 
                                            INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id 
                                            WHERE (SELECT COUNT(TREATMENT.treatment_id) 
                                            FROM VICTIM_TREATMENT
                                            INNER JOIN TREATMENT ON VICTIM_TREATMENT.treatment_id = TREATMENT.treatment_id
                                            WHERE victim_id = ASSOCIATED_VICTIM.victim_id
                                            GROUP BY victim_id) = 2
                                            GROUP BY VICTIM.victim_name, VICTIM.surname, VICTIM.location
                                            HAVING COUNT(associated_id) < 2; `);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta8(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT MONTH(VICTIM.sospecha_date) AS MES, VICTIM.victim_name, VICTIM.surname, COUNT(VICTIM_TREATMENT.treatment_id) AS record
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
                                            ORDER BY record DESC;`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta9(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`SELECT HOSPITAL.hospital_name, COUNT(victim_id) as Cantidad, CONCAT((COUNT(victim_id) /(SELECT COUNT(victim_id) FROM VICTIM_STUDIED)*100),'%') AS Porcentaje
                                            FROM VICTIM_STUDIED
                                            INNER JOIN HOSPITAL ON VICTIM_STUDIED.hospital_id = HOSPITAL.hospital_id
                                            GROUP BY HOSPITAL.hospital_name;`);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    consulta10(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query('');
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    eliminarTemporal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query('TRUNCATE TABLE TEMPORAL;');
                return res.json({ message: "Successful" });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    eliminarModelo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield database_config_1.default.query(`DROP TABLE ASSOCIATED_DETAIL;`);
                const posts2 = yield database_config_1.default.query(`DROP TABLE ASSOCIATED_VICTIM;`);
                const posts3 = yield database_config_1.default.query(`DROP TABLE VICTIM_TREATMENT;`);
                const posts4 = yield database_config_1.default.query(`DROP TABLE VICTIM_LOCATION;`);
                const posts5 = yield database_config_1.default.query(`DROP TABLE VICTIM_STUDIED;`);
                const posts6 = yield database_config_1.default.query(`DROP TABLE VICTIM;`);
                const posts7 = yield database_config_1.default.query(`DROP TABLE HOSPITAL;`);
                const posts8 = yield database_config_1.default.query(`DROP TABLE TREATMENT;`);
                const posts9 = yield database_config_1.default.query(`DROP TABLE STATE;`);
                const posts10 = yield database_config_1.default.query(`DROP TABLE TYPE_CONTACT;`);
                const posts11 = yield database_config_1.default.query(`DROP TABLE ASSOCIATED;`);
                return res.json({ message: "Successful" });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    cargarTemporal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `LOAD DATA LOCAL INFILE '/var/lib/mysql-files/virus.csv'
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
                            `;
                const posts = yield database_config_1.default.query(query);
                return res.json(posts[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    cargarModelo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts0 = yield database_config_1.default.query(`CREATE TABLE HOSPITAL (
                                                hospital_id INT NOT NULL AUTO_INCREMENT,
                                                hospital_name VARCHAR(255) NOT NULL,
                                                location VARCHAR(255) NOT NULL,
                                                PRIMARY KEY (hospital_id)
                                            );`);
                const posts02 = yield database_config_1.default.query(`CREATE TABLE TREATMENT (
                                                treatment_id INT NOT NULL AUTO_INCREMENT,
                                                tname VARCHAR(255) NOT NULL,
                                                effect INT NOT NULL,
                                                PRIMARY KEY (treatment_id)
                                            );`);
                const posts03 = yield database_config_1.default.query(`CREATE TABLE STATE (
                                                state_id INT NOT NULL AUTO_INCREMENT,
                                                state_name VARCHAR(255) NOT NULL,
                                                PRIMARY KEY (state_id)
                                            );`);
                const posts04 = yield database_config_1.default.query(`CREATE TABLE ASSOCIATED (
                                                associated_id INT NOT NULL AUTO_INCREMENT,
                                                associated_name VARCHAR(255) NOT NULL,
                                                surname VARCHAR(255) NOT NULL,
                                                -- datetime_associated DATETIME NOT NULL,
                                                PRIMARY KEY (associated_id)
                                            );`);
                const posts05 = yield database_config_1.default.query(`CREATE TABLE TYPE_CONTACT (
                                                type_id INT NOT NULL AUTO_INCREMENT,
                                                type_name VARCHAR(200) NOT NULL,
                                                PRIMARY KEY(type_id)
                                            );`);
                const posts06 = yield database_config_1.default.query(`CREATE TABLE VICTIM (
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
                                            );`);
                const posts07 = yield database_config_1.default.query(`CREATE TABLE VICTIM_LOCATION (
                                                victim_location_id INT NOT NULL AUTO_INCREMENT,
                                                location VARCHAR(255) NOT NULL,
                                                entrance_datetime DATETIME NOT NULL,
                                                exit_datetime DATETIME NOT NULL,
                                                victim_id INT NOT NULL,
                                                PRIMARY KEY (victim_location_id),
                                                FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id)
                                            );`);
                const posts08 = yield database_config_1.default.query(`CREATE TABLE VICTIM_STUDIED (
                                                studied_id INT NOT NULL AUTO_INCREMENT,
                                                hospital_id INT NULL,
                                                victim_id INT NOT NULL,
                                                PRIMARY KEY (studied_id),
                                                FOREIGN KEY (hospital_id) REFERENCES HOSPITAL(hospital_id) ON DELETE CASCADE ON UPDATE CASCADE,
                                                FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id) ON DELETE CASCADE ON UPDATE CASCADE
                                            );`);
                const posts09 = yield database_config_1.default.query(`CREATE TABLE VICTIM_TREATMENT (
                                                treatvictim_id INT NOT NULL AUTO_INCREMENT,
                                                effect INT NOT NULL,
                                                start_date DATETIME NOT NULL,
                                                fin_date DATETIME NOT NULL,
                                                treatment_id INT NOT NULL,
                                                victim_id INT NOT NULL,
                                                PRIMARY KEY (treatvictim_id),
                                                FOREIGN KEY (treatment_id) REFERENCES TREATMENT(treatment_id) ON DELETE CASCADE ON UPDATE CASCADE,
                                                FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id) ON DELETE CASCADE ON UPDATE CASCADE
                                            );`);
                const posts010 = yield database_config_1.default.query(`CREATE TABLE ASSOCIATED_VICTIM (
                                                assvictim_id INT NOT NULL AUTO_INCREMENT,
                                                datetime_associated DATETIME NOT NULL,
                                                victim_id INT NOT NULL,
                                                associated_id INT NOT NULL, 
                                                PRIMARY KEY (assvictim_id),
                                                FOREIGN KEY (victim_id) REFERENCES VICTIM(victim_id) ON DELETE CASCADE ON UPDATE CASCADE,
                                                FOREIGN KEY (associated_id) REFERENCES ASSOCIATED(associated_id) ON DELETE CASCADE ON UPDATE CASCADE
                                            ); `);
                const posts011 = yield database_config_1.default.query(`CREATE TABLE ASSOCIATED_DETAIL (
                                                associated_detail_id INT NOT NULL AUTO_INCREMENT,
                                                datetime_start_contact DATETIME NOT NULL,
                                                datetime_fin_contact DATETIME NOT NULL,
                                                assvictim_id INT NOT NULL,
                                                type_id INT NOT NULL,
                                                PRIMARY KEY (associated_detail_id),
                                                FOREIGN KEY (assvictim_id) REFERENCES ASSOCIATED_VICTIM(assvictim_id) ON DELETE CASCADE ON UPDATE CASCADE,
                                                FOREIGN KEY (type_id) REFERENCES TYPE_CONTACT(type_id) ON DELETE CASCADE ON UPDATE CASCADE
                                            ); `);
                /* HOSPITAL */
                const posts = yield database_config_1.default.query(`INSERT INTO HOSPITAL(hospital_name, location) 
                                            SELECT nombre_hospital, direccion_hospital FROM TEMPORAL
                                            WHERE nombre_hospital != ''
                                            GROUP BY nombre_hospital, direccion_hospital;`);
                /* ESTADO DE UNA VICTIMA */
                const posts2 = yield database_config_1.default.query(`INSERT INTO STATE(state_name) 
                                            SELECT DISTINCT(estado_victima) FROM TEMPORAL
                                            WHERE estado_victima != '';
                                            `);
                /* TIPO DE CONTACTO */
                const posts3 = yield database_config_1.default.query(`INSERT INTO TYPE_CONTACT(type_name)
                                            SELECT DISTINCT(contacto_fisico) FROM TEMPORAL
                                            WHERE contacto_fisico != '';`);
                /* TRATAMIENTOS */
                const posts4 = yield database_config_1.default.query(`INSERT INTO TREATMENT(tname, effect) 
                                            SELECT DISTINCT(tratamiento), (efectividad *1) AS efectividad FROM TEMPORAL 
                                            WHERE tratamiento != '' AND efectividad != '';`);
                /* VICTIMA */
                const posts5 = yield database_config_1.default.query(`INSERT INTO VICTIM(victim_name, surname, location, confirmacion_date, sospecha_date, death_date, state_id)
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
                                            STATE.state_id;`);
                /* UBICACION DE LA VICTIMA */
                const posts6 = yield database_config_1.default.query(`INSERT INTO VICTIM_LOCATION(location, entrance_datetime, exit_datetime, victim_id)
                                            SELECT ubicacion_victima, fecha_llegada, fecha_retiro, VICTIM.victim_id  
                                            FROM TEMPORAL
                                            INNER JOIN VICTIM ON (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname AND TEMPORAL.direccion_victima = VICTIM.location)
                                            WHERE ubicacion_victima != ''
                                            GROUP BY VICTIM.victim_name, VICTIM.surname, ubicacion_victima, fecha_llegada, fecha_retiro, VICTIM.victim_id;`);
                /* VICTIMA ESTUDIADA */
                const posts7 = yield database_config_1.default.query(`INSERT INTO VICTIM_STUDIED(hospital_id, victim_id)
                                            SELECT HOSPITAL.hospital_id, VICTIM.victim_id
                                            FROM TEMPORAL
                                            INNER JOIN HOSPITAL ON (TEMPORAL.nombre_hospital = HOSPITAL.hospital_name AND TEMPORAL.direccion_hospital = HOSPITAL.location)
                                            INNER JOIN VICTIM ON  (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname AND TEMPORAL.direccion_victima = VICTIM.location)
                                            GROUP BY HOSPITAL.hospital_id, VICTIM.victim_id;`);
                /* VICTIMA EN TRATAMIENTO */
                const posts8 = yield database_config_1.default.query(`INSERT INTO VICTIM_TREATMENT(effect, start_date, fin_date, treatment_id, victim_id)
                                            SELECT efectividad_en_victima, fecha_inicio_tratamiento,
                                            fecha_fin_tratamiento, TREATMENT.treatment_id, VICTIM.victim_id
                                            FROM TEMPORAL
                                            INNER JOIN TREATMENT ON TEMPORAL.tratamiento = TREATMENT.tname
                                            INNER JOIN VICTIM ON (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname AND TEMPORAL.direccion_victima = VICTIM.location)
                                            GROUP BY efectividad_en_victima, fecha_inicio_tratamiento,
                                            fecha_fin_tratamiento, TREATMENT.treatment_id, VICTIM.victim_id; `);
                /* ASSOCIATED, Personas allegadas */
                const posts9 = yield database_config_1.default.query(`INSERT INTO ASSOCIATED(associated_name, surname)
                                            SELECT nombre_asociado, apellido_asociado
                                            FROM TEMPORAL
                                            WHERE nombre_asociado != ''
                                            GROUP BY nombre_asociado, apellido_asociado;`);
                /* ASSOCIATED_VICTIM */
                const posts10 = yield database_config_1.default.query(`INSERT INTO ASSOCIATED_VICTIM(datetime_associated, victim_id, associated_id)
                                            SELECT fecha_conocio,  VICTIM.victim_id, ASSOCIATED.associated_id
                                            FROM TEMPORAL
                                            INNER JOIN ASSOCIATED ON (TEMPORAL.nombre_asociado = ASSOCIATED.associated_name AND TEMPORAL.apellido_asociado = ASSOCIATED.surname)
                                            INNER JOIN VICTIM ON (TEMPORAL.nombre_victima = VICTIM.victim_name AND TEMPORAL.apellido_victima = VICTIM.surname AND TEMPORAL.direccion_victima = VICTIM.location)
                                            GROUP BY VICTIM.victim_name, VICTIM.surname, VICTIM.location, fecha_conocio, ASSOCIATED.associated_id, VICTIM.victim_id;`);
                /* ASSOCIATED_DETAIL */
                const posts11 = yield database_config_1.default.query(`INSERT INTO ASSOCIATED_DETAIL(datetime_start_contact, datetime_fin_contact, assvictim_id, type_id)
                                            SELECT fecha_inicio_contacto, fecha_fin_contacto,
                                            (SELECT assvictim_id FROM ASSOCIATED_VICTIM
                                            INNER JOIN VICTIM ON ASSOCIATED_VICTIM.victim_id = VICTIM.victim_id
                                            INNER JOIN ASSOCIATED ON ASSOCIATED_VICTIM.associated_id = ASSOCIATED.associated_id
                                            WHERE VICTIM.victim_name = TEMPORAL.nombre_victima AND VICTIM.surname = TEMPORAL.apellido_victima AND
                                            ASSOCIATED.associated_name = nombre_asociado AND ASSOCIATED.surname = TEMPORAL.apellido_asociado AND 
                                            ASSOCIATED_VICTIM.datetime_associated = TEMPORAL.fecha_conocio) AS Victima_Allegado,
                                            TYPE_CONTACT.type_id
                                            FROM TEMPORAL
                                            INNER JOIN TYPE_CONTACT ON TEMPORAL.contacto_fisico = TYPE_CONTACT.type_name
                                            GROUP BY fecha_inicio_contacto, fecha_fin_contacto, TYPE_CONTACT.type_id, Victima_Allegado
                                            ORDER BY Victima_Allegado;`);
                return res.json({ message: "Successful" });
            }
            catch (e) {
                return res.json({ message: "F" });
                console.log(e);
            }
        });
    }
}
exports.indexController = new IndexController();
