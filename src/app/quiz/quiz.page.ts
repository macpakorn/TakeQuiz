import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  catagory: string;
  AllQuiz: any = [];
  quiz: any = [];
  rdvalue = '';
  butext = 'Next';
  score = 0;
  constructor(
    public actroute: ActivatedRoute,
    private fs: AngularFirestore,
    private alertCtrl: AlertController,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
    this.catagory = this.actroute.snapshot.paramMap.get('catagory');
    this.readData().subscribe(data => {
      this.AllQuiz = data.map( e => {
        return{
          quizNo: e.payload.doc.data()['quizNo'.toString()],
          que: e.payload.doc.data()['que'.toString()],
          chA: e.payload.doc.data()['chA'.toString()],
          chB: e.payload.doc.data()['chB'.toString()],
          chC: e.payload.doc.data()['chC'.toString()],
          chD: e.payload.doc.data()['chD'.toString()],
          correct: e.payload.doc.data()['correct'.toString()],
        };
      });
      this.quiz = this.AllQuiz[0];
    });
  }
  readData() {
    return this.fs.collection(this.catagory, ref => ref.orderBy('quizNo')).snapshotChanges();
  }

  checkanswer(event: any) {
    this.rdvalue = event.target.value;
  }

  submit(list: any) {
    if (this.rdvalue == '') {
      this.Answercheck();
    } else {
      if (list.correct == this.rdvalue) {
        this.score += 1;
      }
      if (list.quizNo < 10) {
        this.quiz = this.AllQuiz[list.quizNo];
      }
      if (list.quizNo == 9) {
        this.butext = 'Finish';
      }
      if (list.quizNo == 10) {
        this.result();
      }
      this.rdvalue = '';
    }
  }

  async Answercheck() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Please select your answer before go to the next question',
      buttons: ['OK']
    });
    await alert.present();
  }

  result() {
    this.navCtrl.navigateForward('/result/' + this.score);
  }
}
