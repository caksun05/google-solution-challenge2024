package ui

import androidx.compose.material.MaterialTheme
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val BluePrimary = Color(0xFF3369FF)
val GrayColor = Color(0xFFEEEEEE)
val GreenColor = Color(0xFF349956)

val utterColors = lightColors(
    primary = GreenColor
)

@Composable
fun UtterTheme(content: @Composable () -> Unit) {
    MaterialTheme(colors = utterColors) {
        content()
    }
}