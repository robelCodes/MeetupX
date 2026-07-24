import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  themeService = inject(ThemeService);

}
