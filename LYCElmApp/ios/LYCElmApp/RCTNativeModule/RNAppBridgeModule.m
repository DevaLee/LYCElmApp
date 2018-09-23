//
//  RNAppBridgeModule.m
//  LYCElmApp
//
//  Created by 李玉臣 on 2018/9/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNAppBridgeModule.h"
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

#define RGBColor(r, g, b) [UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue:(b)/255.0 alpha:1.0]

@implementation RNAppBridgeModule

RCT_EXPORT_MODULE(RNAppBridgeModule);

RCT_EXPORT_METHOD(setAppStatusBarBackgroundColor){
  RCTExecuteOnMainQueue(^{
    UIView *statusBar = [[[UIApplication sharedApplication] valueForKey:@"statusBarWindow"] valueForKey:@"statusBar"];
    if ([statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
      statusBar.backgroundColor = RGBColor(49, 144, 232);
    }
  });
}


@end
