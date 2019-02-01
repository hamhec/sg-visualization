import { Injectable } from '@angular/core';


import {myRxStompConfig} from '../../my-rx-stomp.config';
import { RxStompService, InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

import {TokenStorageService} from '../security';
@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  constructor(private rxStompService: RxStompService,
              private tokenService:TokenStorageService) { }

  connect() {
    // Open Websocket connection
    const stompConfig: InjectableRxStompConfig = Object.assign({}, myRxStompConfig, {
         connectHeaders: {
             Authorization: 'Bearer ' + this.tokenService.getToken()
         },
         beforeConnect: () => {
             console.log('%c called before connect', 'color: blue');
         }
     });

     console.log("trying to configure service");
     console.log(this.rxStompService);
     this.rxStompService.configure(stompConfig);
     console.log("activating it");
     this.rxStompService.activate();
  }

  watch(url:string) {
    return this.rxStompService.watch(url);
  }

  publish(data:any) {
    return this.rxStompService.publish(data);
  }
}
