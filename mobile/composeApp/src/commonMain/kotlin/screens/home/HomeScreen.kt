package screens.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.FabPosition
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import components.LoadingAnimation
import components.MessengerItemCard
import components.ReceiverMessageItemCard
import components.ToolbarMessageCakTakim
import components.ToolbarMessageCakTakim
import components.WriteMessageCard
import moe.tlaster.precompose.koin.koinViewModel

@Composable
fun HomeScreen(

) {
    val viewModel = koinViewModel(HomeViewModel::class)
    val messages by viewModel.messages.collectAsState()
    val loading by viewModel.loading.collectAsState()
    val (input, setInput) = remember { mutableStateOf("") }

    Scaffold(
        backgroundColor = Color.White,
        topBar = {
            ToolbarMessageCakTakim (
                onReset = {viewModel.deleteMessage()}
            )
        },
        floatingActionButton = {
            WriteMessageCard(
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 16.dp),
                value = input,
                onValueChange = { value ->
                    setInput(value)
                },
                onClickSend = {
                    if (input.isNotEmpty()) {
                        viewModel.askQuestion(question = input)
                        setInput("")
                    }
                },
            )
        },
        floatingActionButtonPosition = FabPosition.Center
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues = paddingValues)
                .fillMaxSize()
        ) {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 8.dp, bottom = 90.dp),
                verticalArrangement = Arrangement.spacedBy(space = 8.dp),
                horizontalAlignment = Alignment.End
            ) {
                items(messages.size) {
                    if (messages[it].role == "user") {
                        MessengerItemCard(
                            modifier = Modifier.align(Alignment.End),
                            message = messages[it].content
                        )
                    } else {
                        ReceiverMessageItemCard(message = messages[it].content)
                    }

                    if (it == (messages.size-1)  && loading) {
                        LoadingAnimation()
                    }
                }
            }
        }
    }
}