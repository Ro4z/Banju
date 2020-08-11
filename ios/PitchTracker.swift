//
//  PitchTracker.swift
//  Banju
//
//  Created by 김성환 on 2020/08/10.
//

import Foundation
import UIKit

@objc(PitchTracker)
class PitchTracker: RCTEventEmitter {
  
  private var count = 0
  
  // MARK: Objects Handling Core Functionality
  private var modelDataHandler: ModelDataHandler? =
    ModelDataHandler(modelFileInfo: ConvActions.modelInfo)
  private var audioInputManager: AudioInputManager?
  
  private var vc:UIViewController = UIViewController()
  
  // MARK: Instance Variables
  private var result: [Int]?
  private var prevKeys: [Int] = Array(repeating: 0, count: 88)
  private var bufferSize: Int = 0
  
  @objc
  func start() {
    prevKeys = Array(repeating: 0, count: 88)

    guard let workingAudioInputManager = audioInputManager else {
      return
    }
    print("Audio Manager Loaded")
    
    bufferSize = workingAudioInputManager.bufferSize

    workingAudioInputManager.startTappingMicrophone()
  }
  
  @objc
  func stop() {
    guard let workingAudioInputManager = audioInputManager else {
      return
    }
    workingAudioInputManager.stopTappingMicrophone()
  }
  
  @objc
  func prepare() {
    
    guard let handler = modelDataHandler else {
      return
    }
    if(audioInputManager != nil) {
      return
    }
    audioInputManager = AudioInputManager(sampleRate: handler.sampleRate)
    audioInputManager?.delegate = self
    
    guard let workingAudioInputManager = audioInputManager else {
      return
    }
    workingAudioInputManager.checkPermissions()
    workingAudioInputManager.prepareMicrophone()
  }
  
  @objc
  func printModel() {
    print(result)
  }
  
  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([count])
  }
  
  private func runModel(onBuffer buffer: [Int16]) {
    result = modelDataHandler?.runModel(onBuffer: buffer)
    guard var nowKeys = result else {
      return
    }
    for i in 0...87 {
      if(prevKeys[i]==0 && nowKeys[i]>0) {
        sendEvent(withName: "keyDown", body: ["midiNum": i+21])
      }
      if(prevKeys[i]>0 && nowKeys[i]==0) {
        sendEvent(withName: "keyUp", body: ["midiNum": i+21])
      }
      prevKeys[i] = nowKeys[i]
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["keyDown", "keyUp"]
  }
  
  override func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

extension PitchTracker: AudioInputManagerDelegate {
  func didOutput(channelData: [Int16]) {

    guard let handler = modelDataHandler else {
      return
    }

    self.runModel(onBuffer: Array(channelData[0..<handler.sampleRate]))
    self.runModel(onBuffer: Array(channelData[handler.sampleRate..<bufferSize]))
  }

  func showCameraPermissionsDeniedAlert() {

    let alertController = UIAlertController(title: "Microphone Permissions Denied", message: "Microphone permissions have been denied for this app. You can change this by going to Settings", preferredStyle: .alert)

    let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
    let settingsAction = UIAlertAction(title: "Settings", style: .default) { (action) in
      UIApplication.shared.open(URL(string: UIApplication.openSettingsURLString)!, options: [:], completionHandler: nil)
    }

    alertController.addAction(cancelAction)
    alertController.addAction(settingsAction)

    vc.present(alertController, animated: true, completion: nil)
  }
}

