import { Component, ViewChild, OnInit, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { OverlayContainer} from '@angular/cdk/overlay';

import {SgService, KnowledgeBase, Project, Agent, AlertService, AuthenticationService, ProjectService} from './shared';

import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';


import {AgentDialogComponent, LoginComponent, RegisterComponent, AddProjectDialogComponent} from './dialog-boxes';


import { Examples } from './examples/examples';

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
    private rxStompService: RxStompService,
    private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    private cd:ChangeDetectorRef,
    public alertService: AlertService,
    public snackbar: MatSnackBar,
    public authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private router:Router,
    private projectService:ProjectService) {
      this.componentCssClass="light-theme";
  }

  ngOnInit() {
    this.agent = this.authenticationService.getLoggedUser();

    this.project = this.examples.getPenguinExample();

    console.log(this.project);

    this.routeSubscriptions.push(this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        if(event.url == "project") {
          this.route.params.subscribe(params => {
            this.getProject(params['id']);
          })
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
    if(this.collaborationSubscriptions) {
      this.collaborationSubscriptions.forEach((sub) => sub.unsubscribe());
    }
    if(this.routeSubscriptions) {
      this.routeSubscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  connect() {
    // ask for his name;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AgentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data && data.name) {
        // this.agent = data.name
        this.project.KBs = [];
        this.connected = true;

        let kb = new KnowledgeBase();
        // kb.source = this.agent.username;
        // kb.agent_id = this.agent;
        let broadcastWatch = this.rxStompService.watch('/project/1').subscribe((payload) => {
          console.log("got message from subsription: ");
          console.log(payload);
          this.updateKnowledgeBase(JSON.parse(payload.body));
        });
        this.collaborationSubscriptions.push(broadcastWatch);

        let meWatch = this.rxStompService.watch('/agent/reply/1').subscribe((payload) => {
          console.log("got message TO ME: ");
          console.log(payload);
          this.project.KBs = JSON.parse(payload.body);
        });
        this.collaborationSubscriptions.push(meWatch);

        this.rxStompService.publish({destination: '/app/sg.addUser', body: JSON.stringify(kb)});
      }
    });
  }

  updateKnowledgeBase(kbInput:KnowledgeBase) {
    let k = this.project.KBs.find((kb) => kb.source === kbInput.source);
    if(k) {
      k.dlgp = kbInput.dlgp;
    } else {
      this.project.KBs.push(kbInput);
    }
  }

  onSave($event:KnowledgeBase) {
    if(this.connected) {
      this.rxStompService.publish({destination: '/app/sg.sendKB', body: JSON.stringify($event)});
    }
  }





  build():void {
    let kb:string = "";
    this.project.KBs.forEach(k => {
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
    this.project.KBs.forEach(k => {
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
      this.project.KBs = json.KBs;
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
      if(data) {
        if(kb) {
          kb.source = data.name;
        } else {
          const addKB = new KnowledgeBase();
          addKB.source = data.name;
          this.project.KBs.push(addKB);
        }
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
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    this.projectService.getProject(id).subscribe(data => {
      this.project = data;
    },
    error => {

    });
  }



  openProjectDialog(update:boolean=false) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    if(update) {
      dialogConfig.data = {
        name: this.project.name,
        description: this.project.description,
        id: this.project.id
      }
    }
    const dialogRef = this.dialog.open(AddProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      data.creator_id = this.agent.id;
      this.projectService.saveProject(data).subscribe(data => {
        this.redirectTo(`project/${data.id}`);
      },
      error => {
        console.log(error);
      });
    });
  }

}
