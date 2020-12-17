import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
})
export class PersonDetailsPage implements OnInit {
  enabled = this.analyticsService.analyticsEnabled;
  subject: string='Check out all your favorite Characters from Starwars!'
  text: string='Check out your favorite Characters from Starwars!'
  imgurl:string='https://i.pinimg.com/564x/3d/7c/11/3d7c118d7e4ea4a8c9bac277873c7e54.jpg'
  link: string='https://www.starwars.com/search?q=characters'
  person: any;
  isFavorite1 = false;
  personId = null;

  ShareGeneric(parameter){
    const url = this.link
    const text = parameter+'\n'
    this.socialSharing.share(this.subject, null, url,this.link)
  }
    
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private favoriteService: FavoriteService, private socialSharing: SocialSharing, private analyticsService: AnalyticsService) { }

    setUser() {
      this.analyticsService.setUser();
     }
    
     setProperty() {
       this.analyticsService.setProperty();
     }
    
     logEvent() {
       this.analyticsService.logEvent();
     }
    
     toggleDataCollection() {
       this.analyticsService.toggleAnalytics();
       this.enabled = this.analyticsService.analyticsEnabled;
     }
   
    ngOnInit() {
      this.personId = this.activatedRoute.snapshot.paramMap.get('id');
      this.api.getPerson(this.personId).subscribe(res => {
        this.person = res;
      });
  

    this.favoriteService.isFavorite1(this.personId).then(isFav => {
      this.isFavorite1 = isFav;
    });
  }

  favoritePerson() {
    this.favoriteService.favoritePerson(this.personId).then(() => {
      this.isFavorite1 = true;
    });
  }

  unfavoritePerson() {
    this.favoriteService.unfavoritePerson(this.personId).then(() => {
      this.isFavorite1 = false;
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