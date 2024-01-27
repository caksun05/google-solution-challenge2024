package repositories

import database.LocalDatabase
import database.Message
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.statement.HttpResponse
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.BaseModel

class MessageRepository (
    private val client: HttpClient,
    private val database: LocalDatabase
) {
    suspend fun askQuestion(question: String): BaseModel<String> {
        return try {
            val response: HttpResponse = client.get("https://e7cb-54-179-21-148.ngrok-free.app/") {
                url {
                    parameters.append("question", question)
                }
            }
            val json = response.body<String>()
            val jsonObject = Json.parseToJsonElement(json).jsonObject

            val outputText = jsonObject["output_text"]?.jsonPrimitive?.contentOrNull


            if (outputText == null) {
                // Handle the case where "output_text" is not present or invalid
                return BaseModel.Error("Failed to parse response: output_text is missing or invalid")
            } else {
                // Return a BaseModel with the extracted output text
                return BaseModel.Success(outputText)
            }

        } catch (e: Exception) {
            BaseModel.Error(e.message.toString())
        }
    }

    fun addMessage(message: Message) {
        database.insertMessage(message)
    }

    fun getAllMessage(): List<Message> {
        return database.getAllMessages()
    }

    fun deleteMessage() {
        database.deleteMessage()
    }
}