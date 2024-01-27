package components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.Divider
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.jetbrains.compose.resources.ExperimentalResourceApi
import org.jetbrains.compose.resources.painterResource
import ui.GrayColor
import ui.GreenColor

@OptIn(ExperimentalResourceApi::class)
@Composable
fun ToolbarMessageUtter(
    modifier: Modifier = Modifier,
    onReset: () -> Unit
) {
    Column(
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .background(color = Color.White)
                .padding(horizontal = 16.dp, vertical = 8.dp),
        ) {
            Image(
                modifier = Modifier
                    .align(Alignment.CenterVertically)
                    .padding(start = 12.dp)
                    .fillMaxWidth()
                    .weight(1f),
                painter = painterResource("logo2.png"),
                contentDescription = ""
            )

            Text(
                text = "Utter",
                fontSize = 20.sp,
                color = GreenColor,
                textAlign = TextAlign.Center,
                modifier = Modifier.weight(9f),
                style = MaterialTheme.typography.h2.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            )

            Icon(
                painterResource("ic_reset.xml"),
                modifier = Modifier.weight(1f).clickable { onReset() },
                contentDescription = null
            )
        }

        Divider(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp), color = GrayColor
        )
    }
}