import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AppType } from './shared/enum';
import { AdmobService } from './shared/services/core/admob.service';
import { AppLocalStorageService } from './shared/services/core/app-local-storage.service';
import { AppToastService } from './shared/services/core/app-toast.service';

const darkThemeKey = 'dark-theme';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  dark = false;
  constructor(
    private appLocalStorageService: AppLocalStorageService,
    private platform: Platform,
    private admobService: AdmobService,
    private appToastService: AppToastService
  ) {
    this.platform.ready().then(() => {
      if (environment.appType === AppType.FREE) {
        this.admobService.ShowBanner();
        this.admobService.ShowInterstitial();
      }
      let a: number = 0;
      this.platform.backButton.subscribeWithPriority(10, () => {
        a++;
        if (Number(a) === 2) {
          // logic for double tap
          navigator['app'].exitApp();
        } else {
          this.appToastService.show('Press again to exit');
        }
      });
    });
  }

  async ngOnInit() {
    const defaultTheme = await this.appLocalStorageService.get(darkThemeKey);
    if (defaultTheme) {
      this.dark = defaultTheme;
    }
    this.updateDarkMode(this.dark);
  }

  onChangeMode(event: any) {
    this.dark = event.detail.checked;
    this.updateDarkMode(this.dark);
  }

  updateDarkMode(isDarkMode: boolean) {
    this.appLocalStorageService.set(darkThemeKey, isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
  }

  openUrl() {
    window.open(
      'https://linkedin.com/in/haris-rajput',
      '_system',
      'location=yes'
    );
  }
}
