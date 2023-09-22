import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() video!: string;
  @Input() youtube: boolean = false;
  url: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.youtube) {
      const newVideo = this.video.replace('https://www.youtube.com/v/', '');
      this.video = 'https://www.youtube.com/embed/' + newVideo;
    }
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
  }
}
