package database

import sqldelight.Database

class LocalDatabase(driverFactory: DriverFactory) {
    private val database = Database(driverFactory.createDriver())
    private val dbQuery = database.messageQueries

    fun getAllMessages(): List<Message> {
        return dbQuery.getMessages().executeAsList()
    }

    fun insertMessage(message: Message) {
        dbQuery.insertMessage(role = message.role, content = message.content)
    }

    fun deleteMessage() {
        dbQuery.deleteMessage()
    }
}