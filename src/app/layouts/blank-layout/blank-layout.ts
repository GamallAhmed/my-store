import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../nav-bar/nav-bar';
import { Footer } from '../footer/footer';
@Component({
  imports: [RouterOutlet, NavBar, Footer],
  selector: 'app-blank-layout',
  styleUrl: './blank-layout.css',
  templateUrl: './blank-layout.html',
})
export class BlankLayout {}
