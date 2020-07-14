import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { NavController } from '@ionic/angular';
import { LoadingController, ToastController,AlertController  } from '@ionic/angular';
import {  MenuController } from '@ionic/angular';
import { timer } from 'rxjs';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pdfLink:any;
  
  constructor(
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,  private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController, 
    private showToast: ToastController,
    public menuCtrl: MenuController
  ) {
    this.ngOnInit();
  }

  showLogout(msg) {
    let alert = this.alertController.create({
        header: 'Confirm to Log Out',
        message: msg,
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: async () => {
                  console.log("Logout");
                 const loading = await this.loadingController.create({
                   message: 'Logging Out..',
                   duration: 5000
                 });
                 await loading.present();
                 this.navCtrl.navigateRoot('login');
                 loading.dismiss();
                }
            }
        ]
    }).then(alert => alert.present());
  }
 
  logout(){
    this.showLogout("Logout?")
  }

  ngOnInit() {
    this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl('http://docs.google.com/gview?embedded=true&url='+'https://assets.biomarking.com/images/sample.pdf');
    console.log(this.pdfLink);
  }
}
