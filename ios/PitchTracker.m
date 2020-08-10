//
//  PitchTracker.m
//  Banju
//
//  Created by 김성환 on 2020/08/10.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(PitchTracker, RCTEventEmitter)

RCT_EXTERN_METHOD(start)
RCT_EXTERN_METHOD(stop)
RCT_EXTERN_METHOD(printModel)
RCT_EXTERN_METHOD(getCount: (RCTResponseSenderBlock)callback)

@end
