import { Component, ViewChild, OnInit, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { OverlayContainer} from '@angular/cdk/overlay';

import {SgService, KnowledgeBase, Project, Agent, AlertService, AuthenticationService, ProjectService, CollaborationService} from './shared';




import {AgentDialogComponent, LoginComponent, RegisterComponent, AddProjectDialogComponent, InviteUserComponent, HelpDialogComponent} from './dialog-boxes';


import { Examples } from './examples/examples';


// collaboration
// import {myRxStompConfig} from './my-rx-stomp.config';
// import { RxStompService, InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';



import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'DAMN! Defeasible Reasoning using SGs';
  connected:boolean = false;

  private collaborationSubscriptions: Subscription[] = [];
  private alertSubscription: Subscription;
  private routeSubscriptions: Subscription[] = [];

  @HostBinding('class') componentCssClass;

  @ViewChild('fileImportInput') fileImportInput:any;

  project: Project = new Project();
  agent:Agent;
  downloadJsonHref:SafeUrl;

  semantics = [
    {name:"Ambiguity Blocking without Team Defeat", value: "BDLwithoutTD"},
    {name:"Ambiguity Blocking with Team Defeat", value: "BDLwithTD"},
    {name:"Ambiguity Propagating without Team Defeat", value: "PDLwithoutTD"},
    {name:"Ambiguity Propagating with Team Defeat", value: "PDLwithTD"}
  ];

  themes = [
    {title: "Light Theme", value:"light-theme"},
    {title: "Dark Theme", value:"dark-theme"}
  ];

  examples:Examples = new Examples();

  constructor(private sgService:SgService,
    private collaborationService: CollaborationService,
    private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    private cd:ChangeDetectorRef,
    public alertService: AlertService,
    public snackbar: MatSnackBar,
    public authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private router:Router,
    private projectService:ProjectService,
    private sanitizer: DomSanitizer) {
      this.componentCssClass="light-theme";
  }

  ngOnInit() {
    this.agent = this.authenticationService.getLoggedUser();

    this.project = this.examples.getPenguinExample();

    this.routeSubscriptions.push(this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(event.url.substring(1,8) == "project") {

          this.route.firstChild.params.subscribe(params => {
            this.getProject(params['id']);
          });
        } else if(event.url.substring(1,8) == "example") {
          this.route.firstChild.params.subscribe(params => {
            this.project = this.examples.getProject(params['id']);
          });
        }
      }
    }));

    this.alertSubscription = this.alertService.getMessage().subscribe(message => {
      if(message && message.text) {
        this.snackbar.open(message.text, 'Ok', {duration: 2500});
      }
    });
  }

  ngOnDestroy() {
    if(this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    this.freeCollaborationSubscriptions();

    if(this.routeSubscriptions) {
      this.routeSubscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
  updateKnowledgeBase(kbInput:KnowledgeBase) {
    let k = this.project.kbs.find((kb) => kb.source === kbInput.source);
    if(k) {
      k.dlgp = kbInput.dlgp;
    } else {
      this.project.kbs.push(kbInput);
    }
  }

  onSave($event:KnowledgeBase) {
      console.log("saving KB");
      this.projectService.saveKB(this.project.id,$event).subscribe(data => {
        console.log("KB saved");
        console.log(data);
      }, error => {
        console.log(error);
      });//JSON.stringify($event)}
  }





  build():void {
    let kb:string = "";
    this.project.kbs.forEach(k => {
      if(k.selected) {
        kb += k.dlgp;
      }
    });
    this.sgService.build(kb).subscribe(res => {
      this.sgService.onGetData.emit(res);
    }, error => {
      console.log(error);
    })
  }

  answerQuery():void {
    let kb:string = "";
    this.project.kbs.forEach(k => {
      if(k.selected) {
        kb += k.dlgp;
      }
    });
    this.sgService.query(kb, this.project.query, this.project.semantic).subscribe(res => {
      this.sgService.onGetData.emit(res);
    }, error => {
      console.log(error);
    })
  }

  clearQuery():void {
    this.project.query = "";
  }

  onFileInput($event):void {
    let file = $event.srcElement.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (data) => {
      let json = JSON.parse(reader.result.toString());
      this.project.kbs = json.kbs;
      this.project.query = json.query;
    }
  }

  trackAgentsBy(index, kb) {
    return index;
  }

  openAgentDialog(kb:KnowledgeBase) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    if(kb) {
      dialogConfig.data = {
        name: kb.source
      }
    }
    const dialogRef = this.dialog.open(AgentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      let kbToSave = null;
      if(data) {
        if(kb) {
          kb.source = data.name;
          kbToSave = kb;
        } else {
          kbToSave = new KnowledgeBase();
          kbToSave.source = data.name;
          if(this.agent) {
            kbToSave.agent_id = this.agent.id
          }
        }
        console.log("this is the kb to save");
        console.log(kbToSave);
        this.onSave(kbToSave);
      }
    });
  }

  openInviteUserDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(InviteUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data && data.username) {
        this.projectService.inviteUser(data.username, this.project.id).subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
      }
    });
  }

  setTheme(theme:string) {
    this.componentCssClass = theme;
    this.themes.forEach((t) => {
      this.overlayContainer.getContainerElement().classList.remove(t.value);
    })
    this.overlayContainer.getContainerElement().classList.add(theme);

  }

  login() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.username && result.password) {
        this.authenticationService.attemptAuthentication(result).subscribe(data => {
          this.authenticationService.saveUser(data);
          this.agent = this.authenticationService.getLoggedUser();
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          this.router.navigateByUrl('/login');
        });
      }
    });
  }

  register() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.username && result.password) {
        this.authenticationService.attemptRegistration(result).subscribe(data => {
          this.authenticationService.saveUser(data);
          this.agent = this.authenticationService.getLoggedUser();
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          this.router.navigateByUrl('/signup');
        });
      }
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(res => {
      this.agent = null;
      this.router.navigate(['/home']);
      console.log("loggedout!!!");
    },
    error => {
      console.log("loggedout!!! errorororo");
    });
  }

  redirectTo(path:string) {
    this.router.navigate([path]);
  }


  getProject(id:string) {
    this.freeCollaborationSubscriptions();
    this.projectService.getProject(id).subscribe(data => {
      // Open Websocket connection
      this.collaborationService.connect();

      this.project = data;
      let broadcastWatch = this.collaborationService.watch(`/api/collaboration/project/${this.project.id}`).subscribe((payload) => {
        console.log("got message from subsription: ");
        console.log(payload);
        this.updateKnowledgeBase(JSON.parse(payload.body));
      });
      this.collaborationSubscriptions.push(broadcastWatch);
    },
    error => {

    });
  }

  openHelpDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(HelpDialogComponent, dialogConfig);
  }

  openProjectDialog(update:boolean=false) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    if(update) {
      dialogConfig.data = this.project;
    }
    const dialogRef = this.dialog.open(AddProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(!data) return;
      data.creator_id = this.agent.id;
      this.projectService.saveProject(data).subscribe(data => {
        this.redirectTo(`project/${data.id}`);
      },
      error => {
        console.log(error);
      });
    });
  }

  freeCollaborationSubscriptions() {
    if(this.collaborationSubscriptions) {
      this.collaborationSubscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  saveProjectToFile(a) {
    // Update the save to local file button
    let theJSON = JSON.stringify(this.project);
    let blob = new Blob([theJSON], { type: 'text/json' });
    importedSaveAs(blob, this.project.name);
  }
}
