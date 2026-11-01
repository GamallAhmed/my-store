import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  scrollToTop(){
    window.scrollTo({top:0,behavior:'smooth'})
  }
}
