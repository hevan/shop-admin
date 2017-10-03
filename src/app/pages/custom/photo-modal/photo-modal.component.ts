import { Component, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploaderOptions,UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {Keys} from "../../../services/models/env";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'photo-modal',
  templateUrl: './photo-modal.component.html'
})
export class PhotoModalComponent {

  modalHeader: string;

  public userId:string;
  public entityName:string;
  public entityId:string = '';

  public imageUrl:string;

  public message:string;


  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private activeModal: NgbActiveModal, private authService:AuthService) {

    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }


  closeModal(){

    console.log('close result' + this.imageUrl);

    this.activeModal.close( this.imageUrl);
    //return this.imageUrl;
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      const event: UploadInput = {
        type: 'uploadAll',
        url: Keys.SERVER_UPLOAD_URL + '/open/file/upload',
        method: 'POST',
        data: { userId: this.authService.getUserId(),entityName:this.entityName,entityId:this.entityId}
      };

      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {

      let retData = output.file.response;

      console.log( output.file.response);
      console.log(output.file.response.data);
      if(retData.successed == '00'){
        if(retData.data){
          this.imageUrl = retData.data.imageUrl;
        }
      }else{
        this.message = retData.message;
      }
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: Keys.SERVER_UPLOAD_URL + '/open/file/upload',
      method: 'POST',
      data: { userId: this.authService.getUserId(),entityName:this.entityName,entityId:this.entityId}
    };

    this.uploadInput.emit(event);
  }


  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }



}
