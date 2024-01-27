package components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.material.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.ExperimentalResourceApi
import org.jetbrains.compose.resources.painterResource
import ui.GrayColor

@OptIn(ExperimentalResourceApi::class)
@Composable
fun WriteMessageCard(
    modifier: Modifier = Modifier,
    value: String,
    onValueChange: (String) -> Unit,
    onClickSend: () -> Unit
) {
    Surface(
        modifier = modifier.fillMaxWidth(),
        elevation = 6.dp,
        color = Color.White,
        shape = RoundedCornerShape(30.dp),
    ) {
        TextField(
            modifier = Modifier.background(color = Color.White),
            value = value,
            onValueChange = { value ->
                onValueChange(value)
            },
            placeholder = {
                Text(
                    "Write your message",
                    style = TextStyle(
                        color = Color.Gray
                    ),
                    fontWeight = FontWeight.Bold
                )
            },
            trailingIcon = {
                Image(
                    modifier = Modifier
                        .size(24.dp)
                        .clickable {
                            onClickSend()
                        },
                    painter = painterResource("ic_send_message.xml"),
                    contentDescription = ""
                )
            },
            colors = TextFieldDefaults.textFieldColors(
                placeholderColor = GrayColor,
                backgroundColor = Color.White,
                focusedIndicatorColor = Color.Transparent,
                unfocusedIndicatorColor = Color.Transparent,
                disabledIndicatorColor = Color.Transparent
            )
        )
    }
}