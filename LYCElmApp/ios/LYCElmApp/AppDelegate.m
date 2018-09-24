/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <CoreLocation/CoreLocation.h>
@interface AppDelegate() <CLLocationManagerDelegate>
@property (nonatomic, strong) CLLocationManager *locationManager;

@end



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"LYCElmApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [self startLocation];
  return YES;
}


#pragma mark -- 定位
- (void)startLocation {
  self.locationManager = [[CLLocationManager alloc] init];
  self.locationManager.delegate = self;
  self.locationManager.desiredAccuracy = kCLLocationAccuracyBest;
  self.locationManager.distanceFilter = 100.0f;
  if ([[[UIDevice currentDevice]systemVersion]doubleValue] >8.0){
    [self.locationManager requestWhenInUseAuthorization];
  }
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    _locationManager.allowsBackgroundLocationUpdates =YES;
  }
  [self.locationManager startUpdatingLocation];
}


#pragma mark -- 定位代理
//这个方法用来获取用户是否开启可定位权限
- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {

  if (status == kCLAuthorizationStatusNotDetermined) {
    if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
      [self.locationManager requestWhenInUseAuthorization];
    }
  }
}
//获得的定位
- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
  CLLocation *newLocation = locations[0];
  [manager stopUpdatingLocation];

  CLGeocoder *geocoder = [[CLGeocoder alloc]init];

  [geocoder reverseGeocodeLocation:newLocation completionHandler:^(NSArray<CLPlacemark *> * _Nullable placemarks, NSError * _Nullable error) {

    CLPlacemark *mark = [placemarks firstObject];

    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
          [[NSNotificationCenter defaultCenter] postNotificationName:@"NotificationLocationSuccess" object:nil userInfo:mark.addressDictionary];
    });



    NSLog(@"======>>%@------%@=====>>>%@",mark.locality,mark.name,mark.addressDictionary[@"FormattedAddressLines"]);

  }];
}


@end
