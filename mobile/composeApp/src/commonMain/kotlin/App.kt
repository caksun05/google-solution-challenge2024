import androidx.compose.runtime.Composable
import moe.tlaster.precompose.PreComposeApp
import moe.tlaster.precompose.navigation.NavHost
import moe.tlaster.precompose.navigation.Navigator
import moe.tlaster.precompose.navigation.rememberNavigator
import org.koin.compose.KoinContext
import screens.home.HomeScreen
import screens.splash.SplashScreen
import ui.UtterTheme

@Composable
fun App() {
    PreComposeApp {
        KoinContext {
            val navigator = rememberNavigator()
            UtterTheme {
                NavigationHost(navigator)
            }
        }
    }
}

@Composable
fun NavigationHost(navigator: Navigator) {
    NavHost(
        navigator = navigator,
        initialRoute = "/splash"
    ) {
        scene(route = "/splash") {
            SplashScreen(onNext = { navigator.navigate("/home") })
        }
        scene(route = "/home") {
            HomeScreen()
        }
    }
}