package com.aziotmobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.reactnative.googlefit.GoogleFitPackage;
import com.sensors.RNSensorsPackage;
import com.cubicphuse.RCTTorch.RCTTorchPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.janeasystems.rn_nodejs_mobile.RNNodeJsMobilePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.microsoft.aad.adal.rn.RNAdalPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactSliderPackage(),
            new GoogleFitPackage(),
            new RNSensorsPackage(),
            new RCTTorchPackage(),
            new RNDeviceInfo(),
            new RNNodeJsMobilePackage(),
            new RNGestureHandlerPackage(),
            new RNAdalPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
