import { Component, OnInit } from '@angular/core';
import {  Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { LoadingController, NavController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

showSplash = false;
  user;
 public username: string;
 public password: string;
 public un: string;
 public pw: string;
 public mess;
 public mess1;
 public mess2;
 public m1;
 public m2;
 public message;

  constructor(public router: Router,
    // private initialized: OnInit,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private loadingController: LoadingController,
    private navController: NavController,
    private http: HttpClient) {

      this.ngOnInit();
     }

  ngOnInit() {
    console.log(this.demoTest());
    console.log(this.demoTestOne());
    console.log(this.demoTestTwo());
    console.log(this.demo());
    console.log(this.demoOne());
  }

  demo(){
    return this.http.get("https://my-json-server.typicode.com/jaypeegalang/demo/user");
  }
  
  demoTest(){
    this.demo().subscribe(data =>{
      console.log("Remote Data");
      console.log(data);
      this.user = data;
      this.username = this.user.email;
      this.password = this.user.password;
      console.log(this.username, this.password);   
    });
  }

  demoOne(){
    return this.http.get("https://my-json-server.typicode.com/jaypeegalang/demo/message/1");
  }



  demoTestOne(){
    this.demoOne().subscribe(data =>{
      console.log("Remote Data One");
      console.log(data);
      this.mess = data;
      this.mess1 = this.mess.dataOne;
      this.mess2 = this.mess1.message;  
      console.log(this.mess2);
      return this.mess2;
    });
  }

  demoTestTwo(){
    this.demoOne().subscribe(data =>{
      console.log("Remote Data Two");
      console.log(data);
      this.mess = data;
      this.m1 = this.mess.dataTwo;
      this.m2 = this.m1.token;   
      console.log(this.m2);
      return this.m2
    });
  }

  // Login 
  async login(){
    console.log(this.demoTest(), this.demoTestTwo(), this.demoTestOne());
    try{
      if(this.un == null && this.pw == null){
        this.presentAlert("Please put Username and Password!");
      }else if(this.un == null || this.un == ""){
        this.presentAlert("Please input username!");
      }else if(this.pw ==  null){
        this.presentAlert("Please input password!");
      }else{
        const loading =  await this.loadingController.create({
          message: 'Logging In..',
          duration: 15000
        });
          loading.present();

          if(this.username == this.un && this.password == this.pw){
            
              this.platform.ready().then(()=>{
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                timer(300).subscribe(()=> this.showSplash = false)
              })


            this.navController.navigateRoot('/home');
            this.presentAlert(this.m2);
            loading.dismiss();

          }else if(this.username == this.un && this.password != this.pw){ 
            this.presentAlert(this.mess2);
            loading.dismiss();
          }
      }
    }catch(e){
      this.presentAlert("Error! Please check your internet connection");
    }
  }

  presentAlert(msg) {
    this.alertController.create({
      header:'Alert',
      message:msg,
      buttons: ['OK']
    }).then(alert => alert.present());
   }
}
