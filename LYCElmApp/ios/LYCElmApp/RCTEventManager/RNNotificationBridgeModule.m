//
//  RNNotificationBridgeModule.m
//  LYCElmApp
//
//  Created by 李玉臣 on 2018/9/24.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNNotificationBridgeModule.h"
#import <UIKit/UIKit.h>

@interface RNNotificationBridgeModule ()

@end


@implementation RNNotificationBridgeModule

RCT_EXPORT_MODULE(RNNotificationBridgeModule);
- (instancetype)init{

  if (self = [super init]) {
    [self addOberserver];
  }
  return self;
}

@synthesize bridge = _bridge;
- (void)addOberserver{
  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(locationSuccess:) name:@"NotificationLocationSuccess" object:nil];
}

- (void)locationSuccess:(NSNotification *)notify{
  
  
  [self sendEventWithName:@"ReactLocationSuccess" body:notify.userInfo];
}

- (NSArray<NSString *> *)supportedEvents{
  return @[
           @"ReactLocationSuccess"
           ];
}

-(void)dealloc{

  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
