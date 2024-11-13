import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    return this.gifsService.tagHistory
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
