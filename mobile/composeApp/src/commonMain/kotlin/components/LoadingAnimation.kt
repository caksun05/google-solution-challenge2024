package components

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearOutSlowInEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.keyframes
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import org.jetbrains.compose.resources.ExperimentalResourceApi
import org.jetbrains.compose.resources.painterResource
import ui.GrayColor
import ui.GreenColor


@OptIn(ExperimentalResourceApi::class)
@Composable
fun LoadingAnimation(
    modifier: Modifier = Modifier,
    circleSize: Dp = 10.dp,
    circleColor: Color = Color.DarkGray,
    spaceBetween: Dp = 10.dp,
    travelDistance: Dp = 15.dp
) {
    val circles = listOf(
        remember { Animatable(initialValue = 0f) },
        remember { Animatable(initialValue = 0f) },
        remember { Animatable(initialValue = 0f) }
    )

    circles.forEachIndexed { index, animatable ->
        LaunchedEffect(key1 = animatable) {
            delay(index * 100L)
            animatable.animateTo(
                targetValue = 1f,
                animationSpec = infiniteRepeatable(
                    animation = keyframes {
                        durationMillis = 1200
                        0.0f at 0 with LinearOutSlowInEasing
                        1.0f at 300 with LinearOutSlowInEasing
                        0.0f at 600 with LinearOutSlowInEasing
                        0.0f at 1200 with LinearOutSlowInEasing
                    },
                    repeatMode = RepeatMode.Restart
                )
            )
        }
    }

    val circleValues = circles.map { it.value }
    val distance = with(LocalDensity.current) { travelDistance.toPx() }

    Row{
        Surface(
            modifier = Modifier
                .wrapContentSize()
                .padding(top = 20.dp)
                .align(Alignment.Bottom),
            shape = CircleShape,
            color = Color.White,
            elevation = 4.dp
        ) {
            Image(
                modifier = Modifier
                    .padding(horizontal = 8.dp, vertical = 6.dp)
                    .size(18.dp),
                painter = painterResource("logo2.png"),
                contentDescription = ""
            )
        }

        Spacer(modifier = Modifier.width(8.dp))

        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 24.dp),
            shape = RoundedCornerShape(topStart = 25.dp, topEnd = 25.dp, bottomEnd = 25.dp),
            color = GrayColor
        ) {
            Row(
                modifier = Modifier.padding(horizontal = 14.dp, vertical = 24.dp),
                horizontalArrangement = Arrangement.spacedBy(spaceBetween)
            ) {
                circleValues.forEach { value ->
                    Box(
                        modifier = Modifier
                            .size(circleSize)
                            .graphicsLayer {
                                translationY = -value * distance
                            }
                            .background(
                                color = circleColor,
                                shape = CircleShape
                            )
                    )
                }
            }
        }
    }

}