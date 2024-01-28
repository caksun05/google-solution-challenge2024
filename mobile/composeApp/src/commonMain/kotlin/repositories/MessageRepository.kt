package repositories

import database.LocalDatabase
import database.Message
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.forms.FormDataContent
import io.ktor.client.request.forms.formData
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.Parameters
import io.ktor.http.contentType
import kotlinx.datetime.Clock
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.BaseModel

class MessageRepository (
    private val client: HttpClient,
    private val database: LocalDatabase
) {
    private val baseUrl: String = "https://infinite-mutually-foal.ngrok-free.app"
    suspend fun askQuestion(question: String): BaseModel<String> {
        return try {
            val response: HttpResponse = client.get("${baseUrl}/chatbot") {
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

    suspend fun report(email: String, question: String) {
        val parameters = Parameters.build {
            append("email", email)
            append("question", question)
            append("timestamp", Clock.System.now().toString())
        }
        val response: HttpResponse = client.post("${baseUrl}/report") {
            contentType(ContentType.Application.FormUrlEncoded)
            setBody(FormDataContent(parameters))
        }
    }
}