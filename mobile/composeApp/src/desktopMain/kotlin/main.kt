import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.runtime.Composable
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import di.AppModule
import di.platformModule
import org.koin.core.context.startKoin

fun main() = application {
    startKoin {
        modules(platformModule(),  AppModule.appModule)
    }
    Window(onCloseRequest = ::exitApplication, title = "KotlinProject") {
        App()
    }
}

@Preview
@Composable
fun AppDesktopPreview() {
    App()
}