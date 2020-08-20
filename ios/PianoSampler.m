//
//  PianoSampler.m
//  Banju
//
//  Created by 김성환 on 2020/08/18.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(PianoSampler, NSObject)

RCT_EXTERN_METHOD(playNote:(NSInteger *)midiNum
                  velocity:(NSInteger *)velocity
)

RCT_EXTERN_METHOD(stopNote:(NSInteger *)midiNum)

RCT_EXTERN_METHOD(prepare)

@end
