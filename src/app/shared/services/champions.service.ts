import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ChampionsService {
    userData: any; // Save logged in user data

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { }

    listDoc() {

        let champions = this.afs.collection(`champions`).snapshotChanges().pipe(map(actions => {

            return actions.map(a => {

                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;

                return { data, id }
            });
        }));

        return champions;
    }

    setChampionData(team: any, count: number) {

        const championRef: AngularFirestoreDocument<any> = this.afs.doc('champions/' + team);

        let champion_trophy = count + 1;

        championRef.set({ count: champion_trophy, id: team });

    }

    updateTaxRule(id, data, cb) {
        this.afs.collection(`champions`).doc(id).update(data).then(()=>{
          cb(null, 'Regra atualizada com sucesso!');
        }).catch((err) => {
          cb('Desculpe, ocorreu um erro inesperado. Tente novamente!', null)
        });
      }

    //   updateTaxRule(doc, cb) {
    //     this.afs.doc(`champions/Brasil`).set(doc, { merge: true }).then(() => {
    //         cb(null, 'ok');
    //     }).catch((err) => {
    //         cb(err, null);
    //     });
    // }

}