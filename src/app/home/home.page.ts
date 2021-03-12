import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {}

  ngOnInit() {
  }

  takequiz(catagory: any) {
    this.navCtrl.navigateForward('/quiz/' + catagory);
  }

  async comingsoon() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Coming Soon',
      message: 'We are working on It',
      buttons: ['OK']
    });
    await alert.present();
  }
}
