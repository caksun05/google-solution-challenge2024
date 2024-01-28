package dev.farhanroy.caktakim

import android.app.Application
import di.AppModule
import di.platformModule
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin
import org.koin.core.context.stopKoin

class CakTakimApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        initKoin()
    }

    private fun initKoin() {
        stopKoin()
        startKoin {
            androidContext(this@CakTakimApplication)
            modules(platformModule(),  AppModule.appModule)
        }
    }
}