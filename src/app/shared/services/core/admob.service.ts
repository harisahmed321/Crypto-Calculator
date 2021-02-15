import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
  AdMobFreeRewardVideoConfig,
} from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root',
})
export class AdmobService {
  //BANNER CONFIG
  bannerConfig: AdMobFreeBannerConfig = {
    isTesting: false, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: true, //,
    id: 'ca-app-pub-9678064810181476/5739104153',
  };
  //INTERSTITIAL CONFIG
  interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: false, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: true,
    id: 'ca-app-pub-9678064810181476/1553830027',
  };
  //REWARD VIDEO CONFIG.
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: false, // KEEP DURING CODING, REMOVE AT PROD.
    autoShow: true, //,
    // id: 'ca-app-pub-9678064810181476~5371987231',
  };

  //ADD PLATFORM Y ADMOB AT CONSTRUCTOR.
  constructor(public platform: Platform, private admobFree: AdMobFree) {
    //LOAD ADS AT PLATFORM READY PROMISE.
    platform.ready().then(() => {
      //BANNER
      this.admobFree.banner.config(this.bannerConfig);
      //INTERSTITIAL
      this.admobFree.interstitial.config(this.interstitialConfig);
      // this.admobFree.interstitial
      //   .prepare()
      //   .then(() => {
      //     console.log('INTERSTIAL LOADED');
      //   })
      //   .catch((e) => console.log('PROBLEM LOADING INTERSTITIAL: ', e));
      // //REWARD VIDEO
      this.admobFree.rewardVideo.config(this.RewardVideoConfig);
      // this.admobFree.rewardVideo
      //   .prepare()
      //   .then(() => {
      //     console.log('REWARD VIDEO LOADED');
      //   })
      //   .catch((e) => console.log('PROBLEM LOADING REWARDVIDEO: ', e));
    });
  }

  ShowBanner() {
    //CHECK AND SHOW BANNER
    this.admobFree.banner
      .prepare()
      .then(() => {
        console.log('BANNER LOADED');
      })
      .catch((e) => console.log('PROBLEM LOADING BANNER: ', e));
  }

  ShowInterstitial() {
    //CHECK AND SHOW INTERSTITIAL
    this.admobFree.interstitial
      .isReady()
      .then(() => {
        //AT .ISREADY SHOW
        this.admobFree.interstitial
          .show()
          .then(() => {
            console.log('INTERSTITIAL LOADED');
          })
          .catch((e) => console.log('PROBLEM LOADING INTERSTITIAL: ', e));
      })
      .catch((e) => console.log('PROBLEM LOADING INTERSTITIAL: ', e));
  }

  ShowRewardVideo() {
    //CHECK AND SHOW REWARDVIDEO
    this.admobFree.rewardVideo
      .isReady()
      .then(() => {
        //AT .ISREADY SHOW
        this.admobFree.rewardVideo
          .show()
          .then(() => {
            console.log('BANNER LOADED');
          })
          .catch((e) => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
      })
      .catch((e) => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
  }
}
