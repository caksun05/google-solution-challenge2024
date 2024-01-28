package screens.home

import database.Message
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.IO
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import models.BaseModel
import moe.tlaster.precompose.viewmodel.ViewModel
import moe.tlaster.precompose.viewmodel.viewModelScope
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import repositories.MessageRepository

class HomeViewModel: ViewModel(), KoinComponent {
    private val repository: MessageRepository by inject()

    private val _messages: MutableStateFlow<List<Message>> = MutableStateFlow(emptyList())
    val messages = _messages.asStateFlow()

    private val _loading = MutableStateFlow(false)
    val loading = _loading.asStateFlow()

    private val _isNotAnswering: MutableStateFlow<Boolean> = MutableStateFlow(false)
    val isNotAnswering = _isNotAnswering.asStateFlow()

    init {
        getAllMessage()
    }

    private fun getAllMessage() {
        viewModelScope.launch {
            _messages.emit(
                repository.getAllMessage()
            )
            println("Jumlah: ${_messages.value.size}")
        }
    }

    fun askQuestion(question: String) {
        if (_isNotAnswering.value) {
            viewModelScope.launch {
                withContext(Dispatchers.IO) {
                    repository.report(question, _messages.value[_messages.value.size-2].content)
                    repository.addMessage(
                        Message(
                            id = 0,
                            role = "user",
                            content = question
                        )
                    )
                    repository.addMessage(
                        Message(
                            id = 0,
                            role = "assistant",
                            content = "Terima kasih 🙏🏻telah menghubungi kami, Cak Takim Crew akan segera membalas pertanyaan anda"
                        )
                    )
                    getAllMessage()

                }
                _isNotAnswering.emit(false)
            }
        } else {
            viewModelScope.launch {
                withContext(Dispatchers.IO) {
                    repository.addMessage(
                        Message(
                            id = 0,
                            role = "user",
                            content = question
                        )
                    )
                    getAllMessage()
                }
                _loading.update { true }
                repository.askQuestion(
                    question = question
                ).also { baseModel ->
                    _loading.update { false }
                    when (baseModel) {
                        is BaseModel.Success -> {
                            withContext(Dispatchers.IO) {
                                if (baseModel.data == "answer not available in context") {
                                    repository.addMessage(
                                        Message(
                                            id = 0,
                                            role = "assistant",
                                            content = "Mohon maaf kami tidak dapat menjawab, berikan email anda nanti Cak Takim bantu jawab!"
                                        )
                                    )
                                    _isNotAnswering.emit(true)
                                } else {
                                    repository.addMessage(
                                        Message(
                                            id = 0,
                                            role = "assistant",
                                            content = baseModel.data
                                        )
                                    )
                                }


                            }
                        }

                        is  BaseModel.Error -> {
                            println("Something wrong : ${baseModel.error}")
                        }

                        else -> {}
                    }
                }
                getAllMessage()
            }
        }

    }

    fun deleteMessage() {
        viewModelScope.launch {
            withContext(Dispatchers.IO) {
                repository.deleteMessage()
                getAllMessage()
            }
        }
    }
}