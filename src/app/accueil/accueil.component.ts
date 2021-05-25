import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Policy } from '../policy';
import { Culture } from '../culture';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,

} from '@kamiazya/ngx-speech-synthesis';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [
    SpeechSynthesisUtteranceFactoryService,
  ],
})
export class AccueilComponent implements OnInit {

 
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public show:boolean = true;
  public btnName:any = 'Acheteur potentiel';
  public id: number;
  public shows:boolean = false;
  public showss:boolean = true;
  public showsx:boolean = true;
  public plante:boolean = false;
  public  videos:boolean = false;

  public nom: string;
  public duree: string;
  public comparaison: string;
  public affichage: string;




  contents_1 = [
    'Vous venez d\'ajouter la culture de manioc à votre potager.',
    'Cliquer sur analyser, pour vérifié la compatibilité avec votre sol.',
  ];
  
  constructor(private apiService: ApiService,public dialog: MatDialog, public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService,private _formBuilder: FormBuilder) {

   }

   

   policies:  Policy[];
   selectedPolicy:  Policy  = { id :  null , number:null, amount:  null};


   culture:  Culture[];
   selectedCulture:  Culture  = { id :  null , nom:null, description:  null, duree: null, comparaison: null, affichage: null};

   speech() {
    
  }

  cancel() {
    this.svc.cancel();
  }
  pause() {
    this.svc.pause();
  }

  resume() {
    this.svc.resume();
  }
  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.apiService.readPolicies().subscribe((policies: Policy[])=>{
      this.policies = policies;
      console.log(this.policies);
    })

    this.apiService.readCulture().subscribe((culture: Culture[])=>{
      this.culture = culture;
      console.log(this.culture);
    })
  }

  createOrUpdatePolicy(form){
    if(this.selectedPolicy && this.selectedPolicy.id){
      form.value.id = this.selectedPolicy.id;
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy updated" , policy);
      });
    }
    else{

      this.apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy created, ", policy);
      });
    }

  }

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
  }

  deletePolicy(id){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
      console.log("Policy deleted, ", policy);
    });
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show) {    this.show = !this.show;
      this.btnName = "Acheteur potentiel";
    }
     
     
    else
      this.btnName = "Mon potager";
  }

  selectIdCulture(nom,duree,comparaison,affichage){
    console.log("-----------");
  
    this.shows = !this.shows;

    this.showss = !this.showss;
    this.showsx = !this.showsx;

    this.nom = nom;
    this.duree = duree;
    this.comparaison = comparaison;
    this.affichage = affichage;
    


    // CHANGE THE NAME OF THE BUTTON.
  }

  ajoutCulture(){

    this.plante = !this.plante;


    setTimeout( () => { /*Your Code*/
      for (const text of this.contents_1) {
        const v = this.f.text(text);
        this.svc.speak(this.f.text(text));
      }


      this.dialog.open(DialogDataExampleDialog1, {
        data: {
          animal: 'panda'
        }
      });

    }, 4000 );


   
  }

  video(){
    this.show = !this.show;
    this.videos = !this.videos;
  }
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });

    this.video();
  }
    
}



@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  providers: [
    SpeechSynthesisUtteranceFactoryService,
  ],
})
export class DialogDataExampleDialog implements OnInit {

  contents = [
    'Bienvenu sur la plateform mifié: pour vos conseils hebdomadaire.',
    'Veuillez choisir une langue pour continuer.',
  ];

  ngOnInit(){
    for (const text of this.contents) {
      const v = this.f.text(text);
      this.svc.speak(this.f.text(text));
    }
  }

 

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService,) {}


}


@Component({
  selector: 'dialog-data-example-dialog1',
  templateUrl: 'dialog-data-example-dialog1.html',
  providers: [
    SpeechSynthesisUtteranceFactoryService,
  ],
})
export class DialogDataExampleDialog1 implements OnInit {

  contents = [
    'Les caractéristique de votre sol, nous montre que vous sol est pauvre.',
    'Mais vous pouvez effectuer la culture de manioc, à condition que vous suivez nos conseils hebdomadaires.',
  ];



  ngOnInit(){
    
  }

  clique(){
    for (const text of this.contents) {
      const v = this.f.text(text);
      this.svc.speak(this.f.text(text));
    }
  }
 

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public f: SpeechSynthesisUtteranceFactoryService,
    public svc: SpeechSynthesisService,) {}


}