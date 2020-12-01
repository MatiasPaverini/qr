import { Injectable } from '@angular/core';

// import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner/ngx";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private scanner: BarcodeScanner) { }

  /**
   * scan
   */
  public scan() :Promise<BarcodeScanResult>{
    return this.scanner.scan();
  }

  // const options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  // public captureImage(){

  //   this.camera.getPicture(this.options).then((imageData) => {
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log("Error de cámara");
  //   });
  // }
}
