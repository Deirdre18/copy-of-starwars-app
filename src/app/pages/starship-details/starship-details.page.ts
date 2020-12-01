import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.page.html',
  styleUrls: ['./starship-details.page.scss'],
})
export class StarshipDetailsPage implements OnInit {
    subject: string='Check out all your favorite Starships from Starwars!'
    text: string='Check out all your favorite Starships from Starwars!'
    imgurl:string='https://i.pinimg.com/564x/07/02/f9/0702f9c8beb32202d41c9796aa42b42a.jpg'
    link: string='https://www.starwars.com/search?q=starships'
    starship: any;
    isFavorite3 = false;
    starshipId = null;
  
    ShareGeneric(parameter){
      const url = this.link
      const text = parameter+'\n'
      this.socialSharing.share(this.subject, null, url,this.link)
    }
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private favoriteService: FavoriteService, private socialSharing: SocialSharing) { }
     
  ngOnInit() {
    this.starshipId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getStarship(this.starshipId).subscribe(res => {
      this.starship = res;
    });

    this.favoriteService.isFavorite3(this.starshipId).then(isFav => {
      this.isFavorite3 = isFav;
    });
  }

  favoriteStarship() {
    this.favoriteService.favoriteStarship(this.starshipId).then(() => {
      this.isFavorite3 = true;
    });
  }

  unfavoriteStarship() {
    this.favoriteService.unfavoriteStarship(this.starshipId).then(() => {
      this.isFavorite3 = false;
    });
  }

  SendEmail(){
    this.socialSharing.shareViaEmail(this.link, this.subject, ['email@address.com'])
  }

  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.link, null /* url */, 'Copy Paste!')
  }

  SendTwitter(){
    this.socialSharing.shareViaTwitter(this.link, null /* url */)
  }

  SendInstagram(){
    this.socialSharing.shareViaInstagram(this.text, this.imgurl)
  }

  ShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.link)
  }    

}