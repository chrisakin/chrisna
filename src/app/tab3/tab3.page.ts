import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera} from "@ionic-native/camera/ngx"
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myProfileImage;
  myStoredProfileImage: Observable<any>;


  constructor(private alertController: AlertController,
    private camera: Camera,
    private angularFireStore: AngularFirestore,
    private angularFireAuth: AngularFireAuth) {}

  async selectImageSource(){
    // select image from gallery and camera 
    const cameraOptions: CameraOptions = {
      // camera options on how the image should be
      quality: 100, // the image quality from 0 to 100
      destinationType: this.camera.DestinationType.DATA_URL, // destination type- if you wntit converted to URL
      encodingType: this.camera.EncodingType.JPEG, // encoding type- the format of the image
      mediaType: this.camera.MediaType.PICTURE,  // media type - choose weda picture or video
      targetHeight: 200, // height of the image in pexels
      correctOrientation: true, // should it be the same orientation as the image 
      sourceType: this.camera.PictureSourceType.CAMERA // souce type weda u want to take the image from the camera or gallery
    }


    const galleryOptions: CameraOptions = {
        // gallery options on how the image should be
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }


    const alert = await this.alertController.create({
      header: "Select source",
      message: "Pick a source for your image",
      buttons: [
        {
          text: "Camera",
          handler: ()=> {
            this.camera.getPicture(cameraOptions)
            .then((imageData) => {
             // this.myProfileImage = "data:image/jpeg;base64," + imageData;
             const image = "data:image/jpeg;base64," + imageData; 
             this.angularFireStore.collection("users")
             .doc(this.angularFireAuth.currentUser.uid)
              .set({
               image_src: image
             })
            })
          }
        },
        {
          text: "Gallery",
          handler: ()=> {
            this.camera.getPicture(galleryOptions)
            .then((imageData) => {
        // this.myProfileImage = "data:image/jpeg;base64," + imageData;
        const image = "data:image/jpeg;base64," + imageData; 
        this.angularFireStore.collection("users")
       //  .doc(this.angularFireAuth.currentUser)
        // .set({
        //   image_src: image
       //  })
            })
          }
        }
      ]
    });
    await alert.present()
  }
}
