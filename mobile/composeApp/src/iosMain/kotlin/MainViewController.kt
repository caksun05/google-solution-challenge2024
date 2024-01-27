import androidx.compose.ui.window.ComposeUIViewController
import di.AppModule
import di.platformModule
import org.koin.core.context.startKoin
import platform.UIKit.UIViewController

fun MainViewController(): UIViewController {
    startKoin {
        modules(platformModule(),  AppModule.appModule)
    }
    return ComposeUIViewController {

        App()
    }
}
