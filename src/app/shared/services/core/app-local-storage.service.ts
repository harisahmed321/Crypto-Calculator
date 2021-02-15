import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppLocalStorageService {
  constructor(private storage: Storage) {}

  set(key: string, value: any) {
    return this.storage.set(
      environment.storagePreName + key,
      JSON.stringify(value)
    );
  }

  get(key: string) {
    return this.storage.get(environment.storagePreName + key).then((res) => {
      if (res) {
        return JSON.parse(res);
      }
    });
  }

  remove(key: string) {
    return this.storage.remove(environment.storagePreName + key);
  }
}
