import connection from "../../config/db.config"

const setup_db = () => {

    const userTable = `
        CREATE TABLE IF NOT EXISTS user (
            user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            surname VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            passwordHash VARCHAR(191) NOT NULL
        )
    `;

    const reservationsTable = `
        CREATE TABLE IF NOT EXISTS reservations (
            res_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            user_id INT NOT NULL,
            date DATETIME NOT NULL,
            guests INT NOT NULL,
            notes VARCHAR(500),
            FOREIGN KEY (user_id) REFERENCES user (user_id)
        )
    `;


    connection.query(userTable, (err:any) => {
        if (err) {
            console.error('errore nella creazione della tabella user', err)
            return connection.end();
        }
        console.log('tabella users creata')

        connection.query(reservationsTable, (err:any) => {
            if(err){
                console.error('errore nella creazione della tabella reservations', err)
                return connection.end();
            }
        console.log('tabella reservations creata')
        connection.end()
        })
    })

}

setup_db()

export default setup_db;