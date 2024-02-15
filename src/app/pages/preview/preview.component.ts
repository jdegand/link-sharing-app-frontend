import { Component, OnInit, inject } from '@angular/core';
import { JwtDecoderService } from '../../services/jwt/jwt-decoder.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent implements OnInit {
  // implements OnInit 
  // apiService = inject(ApiService);
  // authService = inject(AuthService);

  apiService = inject(ApiService);
  jwtService = inject(JwtDecoderService);

  ngOnInit() {
    const token = localStorage.getItem("token");
    if(token){
      const decodedToken = this.jwtService.decodeToken(token);

      console.log('decodedToken sub', decodedToken.sub);

      //this.apiService.getUser(decodedToken.sub).subscribe((res)=> console.log('preview', res));
    }
    
  }
}
