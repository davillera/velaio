import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private messageService: MessageService,
  ){}
  title = 'velaio';


  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
